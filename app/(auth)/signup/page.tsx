import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#020617] px-4">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
