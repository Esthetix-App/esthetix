import Image from "next/image";

import { SignUpForm } from "@/components/sign-up/sign-up-form";

export default function SignUp() {
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="relative mx-auto flex w-full max-w-[460px] flex-col items-center justify-center gap-6 py-12">
        <SignUpForm />
      </div>
      <div className="relative hidden h-screen bg-muted lg:block">
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-rose-600/50 to-transparent" />
        <Image
          fill
          alt="Image"
          src="https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover object-top dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
