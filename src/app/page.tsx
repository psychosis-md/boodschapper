import Link from "next/link";
import { Button } from "@/components/ui/button";

// Demo copy describing the planned features. Nothing here is a working
// feature yet; the cards say so.
const features = [
  {
    title: "Compare prices",
    body: "See what your groceries cost at each store, including your personal bonuses, and find the cheapest cart.",
  },
  {
    title: "Recipes on a budget",
    body: "Set a weekly budget and get recipe ideas that fit it, with a clear explanation of why each one was suggested.",
  },
  {
    title: "Shop with housemates",
    body: "Split a shared list, decide who buys what with whose discounts, and keep track of who owes whom.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="intro" className="flex flex-col items-start gap-4">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          Student grocery planner
        </p>
        <h1
          id="intro"
          className="text-3xl font-bold tracking-tight md:text-5xl"
        >
          Groceries for less, without the spreadsheet
        </h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          Boodschapper helps students on a tight budget compare supermarket
          prices, plan meals that fit their budget and share the shopping with
          housemates.
        </p>
        <Button asChild size="lg">
          <Link href="/about">About us</Link>
        </Button>
      </section>

      <section aria-labelledby="features" className="flex flex-col gap-4">
        <h2 id="features" className="text-2xl font-bold tracking-tight">
          What we&apos;re building
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col gap-2 rounded-lg border border-t-4 border-t-brand bg-card p-5 text-card-foreground"
            >
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.body}</p>
              <p className="mt-auto pt-2 text-sm font-semibold text-muted-foreground">
                Coming soon
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
