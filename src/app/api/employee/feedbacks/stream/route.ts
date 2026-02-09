import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { feedbackEvents } from "@/lib/feedback-events";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "EMPLOYEE" && session.user.role !== "MANAGER") {
      return new Response("Forbidden", { status: 403 });
    }

    const encoder = new TextEncoder();
    let isClosed = false;
    
    const stream = new ReadableStream({
      async start(controller) {
        const sendUpdate = async () => {
          if (isClosed) return;
          
          try {
            const unreadCount = await prisma.feedback.count({
              where: {
                employeeId: session.user.id,
                read: false,
              },
            });

            const data = `data: ${JSON.stringify({ unreadCount })}\n\n`;
            controller.enqueue(encoder.encode(data));
          } catch (error) {
            console.error("Error fetching unread count:", error);
            if (!isClosed) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ unreadCount: 0 })}\n\n`));
            }
          }
        };

        await sendUpdate();

        const handleNewFeedback = () => {
          if (!isClosed) {
            sendUpdate();
          }
        };

        feedbackEvents.onNewFeedback(session.user.id, handleNewFeedback);

        const keepAlive = setInterval(() => {
          if (!isClosed) {
            try {
              controller.enqueue(encoder.encode(": keepalive\n\n"));
            } catch (error) {
              clearInterval(keepAlive);
            }
          }
        }, 30000);

        return () => {
          isClosed = true;
          feedbackEvents.offNewFeedback(session.user.id, handleNewFeedback);
          clearInterval(keepAlive);
          try {
            controller.close();
          } catch (error) {
            // Stream already closed
          }
        };
      },
      cancel() {
        isClosed = true;
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Error in SSE stream:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
