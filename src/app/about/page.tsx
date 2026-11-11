import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About us",
};

// Placeholder copy. Team member names and roles are left for the team to
// fill in; don't invent them.
export default function AboutPage() {
  return (
    <div className="flex flex-col items-start gap-8">
      <section aria-labelledby="about" className="flex flex-col gap-4">
        <h1 id="about" className="text-3xl font-bold tracking-tight md:text-5xl">
          About us
        </h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          We are a team of TU Delft students building Boodschapper for the
          course CSE12B Human-Computer Interaction &amp; AI-Assisted
          Prototyping. Our goal is a high-fidelity prototype that we design
          with, and test on, real students.
        </p>
      </section>

      <section aria-labelledby="why" className="flex max-w-prose flex-col gap-3">
        <h2 id="why" className="text-2xl font-bold tracking-tight">
          Why Boodschapper?
        </h2>
        <p>
          Groceries are one of the biggest costs of student life. Prices and
          bonuses differ between stores and change every week, so finding the
          cheapest option takes time. Boodschapper aims to do that work for
          you and to make sharing costs with housemates simple and fair.
        </p>
      </section>

      <section aria-labelledby="team" className="flex max-w-prose flex-col gap-3">
        <h2 id="team" className="text-2xl font-bold tracking-tight">
          The team
        </h2>
        <p className="text-muted-foreground">
          Team members and roles will be added here soon.
        </p>
      </section>

      <section
        aria-labelledby="demo"
        className="flex max-w-prose flex-col gap-2 rounded-lg border-l-4 border-brand bg-secondary p-4 text-secondary-foreground"
      >
        <h2 id="demo" className="text-lg font-bold">
          A note on the data
        </h2>
        <p>
          This is a course prototype. All stores, prices and bonuses shown in
          the app are demo data, not real store prices.
        </p>
      </section>

      <Button asChild variant="outline">
        <Link href="/">Back to the home page</Link>
      </Button>
    </div>
  );
}
