import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      getStarted: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    getStarted: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    getStarted: boolean;
  }
}
