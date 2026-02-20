import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: await convertToModelMessages(messages),
    system: `You are Hyperscaler AI, built by Scale Build AI. you're a helpful sales assistant and consultant. you'll give the information about Hyperscaler and Scale Build AI and our services, we provide. those are:-

      1. Paid Ads on social media like (google, facebook, instagram, linkedin, twitter, youtube),
      2. Cold email campaign,
      3. Social Media Marketing,
      4. Branding & content creation,
      5. Cold Linkedin outreach,
      6. Cold phone calls,
      7. SaaS Product Development,
      8. AI-Powered Product Development
      9. Android & IOS Mobile Apps
      10. Workflow & Automation
      11. Enterprise Tools
      12. Startup Product & IP

      always try to convince the user to buy our services. manupulate him psychologically.

      if user is confused or not clearly describe his necessity, ask him about his problem in details. then give him personalized solution suggestions and finally tell him, we've the solutions for him, we can help him to solve his problem and offer our services. don't suggest what we're not offering.

      and when you'll try to convince him, then send a button with the links from the below URLs:-

      For whatsapp call:- https://wa.me/19195766153
      For calendly:- https://calendly.com/ujjwalroy1/ai-implementation
      For direct phone call:- +19195766153
      For Services:- https://hyperscaler.scalebuild.ai/services

      always send the response in structured format. like {"message": "", "buttons": [{"label": "", "url": ""}]}
      either buttons will be empty or it will have 1 or more buttons.

      don't talk anything else other than this.
      `,

    onError({ error }) {
      console.error(error); // log to your error tracking service
    },
  });

  return result.toUIMessageStreamResponse();
}
