import { LanguageBar } from "@/components/LanguageBar";
import { getRecentCommits } from "@/lib/github";
import { Activity, ExternalLink, LoaderCircle } from "lucide-react";
import { Suspense } from "react";

export function RecentCommitsSkeleton() {
  return (
    <div
      role='status'
      aria-label='Carregando commits'
      className='border-surface0 bg-base flex items-center justify-center rounded-xl border p-4 shadow-lg lg:col-span-2'
    >
      <LoaderCircle
        size={24}
        className='text-primary animate-spin'
        aria-hidden
      />
    </div>
  );
}

export async function RecentCommits() {
  const commits = await getRecentCommits(3);
  const username = process.env.GITHUB_USERNAME ?? "";

  return (
    <div className='border-surface0 bg-base rounded-xl flex flex-col border p-4 shadow-lg lg:col-span-2'>
      <div className='text-text mb-3 flex items-center justify-between gap-2 text-sm'>
        <h3 className='flex items-center gap-2 font-semibold'>
          <Activity size={16} className='text-primary' aria-hidden='true' />
          <span>Commits Recentes</span>
        </h3>

        <a
          href='https://docs.github.com/en/rest/activity/events'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Ver a documentação da API usada'
          className='text-primary/80 hover:text-primary text-xs font-medium transition-colors'
        >
          [info]
        </a>
      </div>

      {commits.length === 0 ? (
        <p className='text-subtext0 text-sm'>
          Não foi possível carregar os commits agora.
        </p>
      ) : (
        <ul className='space-y-1.5 text-sm'>
          {commits.map((commit) => (
            <li key={commit.sha}>
              <a
                href={commit.url}
                target='_blank'
                rel='noopener noreferrer'
                title={`${commit.fullRepo}: ${commit.message}`}
                className='text-subtext0 hover:text-primary flex min-w-0 items-center gap-2 transition-colors'
              >
                <span className='text-text shrink-0 font-medium'>
                  {commit.repo}:
                </span>

                <span className='min-w-0 flex-1 truncate'>
                  {commit.message}
                </span>

                {commit.additions !== null && commit.deletions !== null && (
                  <span className='shrink-0 text-xs whitespace-nowrap'>
                    <span className='text-green'>+{commit.additions}</span>
                    <span className='text-surface1'> / </span>
                    <span className='text-red'>-{commit.deletions}</span>
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className='mt-auto flex items-center gap-3 pt-3'>
        <a
          href={`https://github.com/${username}`}
          target='_blank'
          rel='noopener noreferrer'
          className='group text-primary inline-flex shrink-0 items-center gap-1 text-sm hover:underline'
        >
          <span>Ver no GitHub</span>
          <ExternalLink
            size={14}
            className='transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            aria-hidden='true'
          />
        </a>

        <Suspense fallback={null}>
          <LanguageBar />
        </Suspense>
      </div>
    </div>
  );
}
