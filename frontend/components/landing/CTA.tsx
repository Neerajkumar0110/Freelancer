import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-indigo-600 py-20 text-center">
      <h2 className="text-4xl font-bold text-white">
        Ready to start your journey?
      </h2>
      <Link
        href="/signup"
        className="mt-8 inline-block rounded-xl bg-black px-8 py-4 font-semibold text-white"
      >
        Join Now
      </Link>
    </section>
  );
}
