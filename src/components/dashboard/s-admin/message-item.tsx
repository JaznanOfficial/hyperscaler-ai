import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage } from "@/components/chat/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StructuredButton {
  label: string;
  url: string;
}

interface StructuredEntry {
  message: string;
  buttons: StructuredButton[];
}

interface RawStructuredEntry {
  message?: unknown;
  buttons?: unknown;
}

const isStructuredButton = (value: unknown): value is StructuredButton => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<StructuredButton>;
  return (
    typeof candidate.label === "string" && typeof candidate.url === "string"
  );
};

const toStructuredButtons = (value: unknown): StructuredButton[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((button: unknown) => (isStructuredButton(button) ? button : null))
    .filter((button): button is StructuredButton => Boolean(button));
};

type CodeProps = React.ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
};

const CodeBlock = ({ inline, className, children, ...props }: CodeProps) =>
  inline ? (
    <code
      className={cn("rounded bg-black/10 px-1 py-0.5 text-[0.85em]", className)}
      {...props}
    >
      {children}
    </code>
  ) : (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl bg-black/80 px-4 py-3 text-white text-xs",
        className
      )}
      {...props}
    >
      <code>{children}</code>
    </pre>
  );

const markdownComponents: Components = {
  ul: (props) => <ul className="list-disc space-y-1 pl-5" {...props} />,
  ol: (props) => <ol className="list-decimal space-y-1 pl-5" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  code: CodeBlock,
};

const parseStructuredEntries = (raw: string): StructuredEntry[] => {
  const text = raw.trim();
  if (!text.startsWith("{")) {
    return [];
  }

  const tryParse = (input: string) => {
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  };

  let parsed = tryParse(text);

  if (!parsed && text.includes("},{")) {
    parsed = tryParse(`[${text}]`);
  }

  let normalizedEntries: RawStructuredEntry[] = [];

  if (Array.isArray(parsed)) {
    normalizedEntries = parsed as RawStructuredEntry[];
  } else if (parsed && typeof parsed === "object") {
    normalizedEntries = [parsed as RawStructuredEntry];
  }

  return normalizedEntries
    .map((entry: RawStructuredEntry) => {
      const messageText =
        typeof entry.message === "string" ? entry.message : "";

      if (!messageText) {
        return null;
      }

      const buttons = toStructuredButtons(entry.buttons);

      return {
        message: messageText,
        buttons,
      };
    })
    .filter((entry): entry is StructuredEntry => Boolean(entry));
};

export function SuperAdminAgentMessageItem({
  message,
}: {
  message: ChatMessage;
}) {
  const isUser = message.role === "user";
  const proseClassName = cn(
    "prose prose-sm dark:prose-invert max-w-none",
    isUser ? "prose-invert" : "prose-slate"
  );
  const structuredEntries = isUser
    ? []
    : parseStructuredEntries(message.content);
  const bubbleClassName = cn(
    "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%]",
    isUser
      ? "rounded-br-sm bg-linear-to-r from-violet-900 to-fuchsia-600 text-white"
      : "rounded-bl-sm bg-slate-100 text-slate-900"
  );

  return (
    <article className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      {structuredEntries.length > 0 ? (
        <div className="flex w-full max-w-[88%] flex-col gap-4 sm:max-w-[70%]">
          {structuredEntries.map((entry, index) => (
            <div className={bubbleClassName} key={`${message.id}-${index}`}>
              <div className={proseClassName}>
                <ReactMarkdown
                  components={markdownComponents}
                  remarkPlugins={[remarkGfm]}
                >
                  {entry.message}
                </ReactMarkdown>
              </div>
              {entry.buttons.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.buttons.map((button) => (
                    <Button
                      asChild
                      key={`${button.label}-${button.url}`}
                      size="sm"
                      variant="gradient"
                    >
                      <a href={button.url} rel="noreferrer" target="_blank">
                        {button.label}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={bubbleClassName}>
          <div className={proseClassName}>
            <ReactMarkdown
              components={markdownComponents}
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </article>
  );
}
