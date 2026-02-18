import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage } from "@/components/chat/types";
import { cn } from "@/lib/utils";

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

export function GeneralAgentMessageItem({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const proseClassName = cn(
    "prose prose-sm dark:prose-invert max-w-none",
    isUser ? "prose-invert" : "prose-slate"
  );

  return (
    <article className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%]",
          isUser
            ? "rounded-br-sm bg-linear-to-r from-violet-900 to-fuchsia-600 text-white"
            : "rounded-bl-sm bg-slate-100 text-slate-900"
        )}
      >
        <div className={proseClassName}>
          <ReactMarkdown
            components={markdownComponents}
            remarkPlugins={[remarkGfm]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
