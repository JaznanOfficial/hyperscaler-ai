import { redirect } from "next/navigation";

export default function SignupPage() {
  redirect("/onboarding/book-a-demo");

  // Legacy signup UI retained for reference:
  // return (
  //   <div className="grid min-h-svh w-full lg:grid-cols-2">
  //     <div className="relative mt-5 mr-5 hidden lg:block">
  //       <Image
  //         alt="Team collaborating"
  //         className="object-fit"
  //         fill
  //         priority
  //         sizes="50vw"
  //         src="/signup.png"
  //       />
  //     </div>
  //     <div className="flex flex-col gap-4 p-6 md:p-10">
  //       <div className="flex justify-center md:justify-start">
  //         <Link
  //           aria-label="Hyperscaler home"
  //           className="flex items-center"
  //           href="/"
  //         >
  //           <Image
  //             alt="Hyperscaler logo"
  //             className="h-8 w-auto"
  //             height={32}
  //             priority
  //             src="/logo.png"
  //             width={140}
  //           />
  //           <span className="sr-only">Hyperscaler</span>
  //         </Link>
  //       </div>
  //       <div className="flex flex-1 items-center justify-center">
  //         <div className="w-full max-w-lg">
  //           <Suspense fallback={<div>Loading...</div>}>
  //             <SignupForm />
  //           </Suspense>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
