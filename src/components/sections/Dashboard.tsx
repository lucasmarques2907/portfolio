import { Suspense } from "react";
import { ClickMeButton } from "./dashboard/ClickMeButton";
import {
  RecentCommits,
  RecentCommitsSkeleton,
} from "./dashboard/RecentCommits";

export default function Dashboard() {
  return (
    <section className='px-4 md:px-0'>
      <h2 className='sr-only'>Dashboard</h2>

      <div className='grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3'>
        <ClickMeButton />

        <Suspense fallback={<RecentCommitsSkeleton />}>
          <RecentCommits />
        </Suspense>
      </div>
    </section>
  );
}
