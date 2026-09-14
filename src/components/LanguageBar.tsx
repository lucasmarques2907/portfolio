// src/components/dashboard/LanguageBar.tsx
import { getLanguages } from "@/lib/github";

export async function LanguageBar() {
  let languages: Awaited<ReturnType<typeof getLanguages>> = [];

  try {
    languages = await getLanguages();
  } catch (error) {
    console.error("[LanguageBar]", error);
  }

  if (languages.length === 0) return null;

  return (
    <div
      className='ml-auto max-w-xs flex-1 sm:max-w-sm'
      aria-label='Distribuição de linguagens'
    >
      <div className='bg-surface2 h-2 w-full rounded-[3px]'>
        <div className='flex h-full w-full'>
          {languages.map((language) => (
            <div
              key={language.name}
              className='group relative h-full first:rounded-l-[3px] last:rounded-r-[3px]'
              style={{
                width: `clamp(8px, ${language.percent}%, ${language.percent}%)`,
                backgroundColor: language.color,
              }}
            >
              <div className='border-surface1 bg-base pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 rounded border px-2 py-0.5 text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100'>
                <span className='inline-flex items-center gap-2'>
                  <span
                    className='inline-block size-2 rounded'
                    style={{ backgroundColor: language.color }}
                  />
                  <span className='text-subtext0'>{language.name}</span>
                  <span className='text-surface1'>•</span>
                  <span className='text-subtext1'>
                    {Math.round(language.percent)}%
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
