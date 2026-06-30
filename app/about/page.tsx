import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tav McGregor — independent eCommerce analytics consultant and the person behind Add to Cart. 14 years turning store data into decisions that grow revenue.",
};

export default async function AboutPage() {
  // Content comes from Tina's data layer (content/pages/about.json). The query
  // result is handed to a client component so useTina can bind it for in-context
  // visual editing; public visitors render the static data with no Tina runtime.
  const res = await client.queries.aboutPage({ relativePath: "about.json" });
  return (
    <AboutClient data={res.data} query={res.query} variables={res.variables} />
  );
}
