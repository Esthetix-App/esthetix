import Image from "next/image";

import { SignInForm } from "@/components/sign-in/sign-in-form";

export default function SignIn() {
  return (
    <div className="h-screen w-full overflow-hidden lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex flex-col items-center justify-center gap-6 py-12">
        <Image
          width={60}
          height={60}
          quality={100}
          priority
          alt="Logo"
          src="/logo.svg"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Esthetix</h1>
          </div>
          <SignInForm />
        </div>
      </div>
      <div className="relative hidden h-full overflow-hidden bg-muted lg:block">
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
