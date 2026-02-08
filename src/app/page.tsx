import { redirect } from "next/navigation";
import { auth } from "@/backend/config/auth";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    switch (session.user.role) {
      case "ADMIN":
        redirect("/s-admin");
      case "MANAGER":
      case "EMPLOYEE":
        redirect("/employee");
      case "CLIENT":
        redirect("/client");
      default:
        redirect("/login");
    }
  }

  redirect("/login");
}
