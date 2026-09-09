import { Container } from "@/components/ui/container";

/** Skeleton while the chosen fare is re-checked with the airline system. */
export default function Loading() {
  return (
    <Container width="default" className="pt-10 pb-28 lg:pt-14 lg:pb-32" aria-busy="true">
      <p className="sr-only">Re-checking the fare…</p>
      <div aria-hidden="true">
        <div className="h-4 w-28 rounded bg-sand" />
        <div className="mt-8 h-3 w-24 rounded bg-sand" />
        <div className="mt-5 h-10 w-80 max-w-full rounded bg-sand" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="h-52 animate-rise rounded-2xl bg-sand" />
            <div className="h-44 rounded-2xl bg-bone ring-1 ring-line" />
          </div>
          <div className="lg:col-span-5">
            <div className="h-80 rounded-2xl bg-bone ring-1 ring-line" />
          </div>
        </div>
      </div>
    </Container>
  );
}
