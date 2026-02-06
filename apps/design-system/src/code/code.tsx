import { useEffect, useMemo, useState } from 'react';
import { HighlighterCore, createHighlighter } from 'shiki';

export type CodeLang =
  | 'dotenv'
  | 'javascript'
  | 'json'
  | 'python'
  | 'go'
  | 'prisma'
  | 'shell'
  | 'text'
  | 'yaml';

type Theme = 'light' | 'dark';

type CodeProps = {
  lang: CodeLang;
  theme: Theme;
  value: string;
  className?: string;
};

export function Code({ lang, theme, value, className }: CodeProps) {
  const highlighter = useHighlighter();

  const html = useMemo(() => {
    return highlighter?.codeToHtml(value, {
      lang,
      theme: `github-${theme}`,
      colorReplacements: theme === 'light' ? { '#fff': 'transparent' } : { '#24292e': 'transparent' },
    });
  }, [highlighter, lang, theme, value]);

  return <div dangerouslySetInnerHTML={{ __html: html ?? '' }} className={className} />;
}

function useHighlighter() {
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  useEffect(() => {
    createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['dotenv', 'javascript', 'json', 'python', 'go', 'prisma', 'shell', 'yaml'],
    }).then(setHighlighter, console.error);
  }, []);

  return highlighter;
}

export function Json({ theme, value, className }: { theme: Theme; value?: unknown; className?: string }) {
  return <Code lang="json" theme={theme} value={JSON.stringify(value, null, 2)} className={className} />;
}
