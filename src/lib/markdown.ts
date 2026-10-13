import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypePrettyCode, {
    theme: {
      latte: "catppuccin-latte",
      frappe: "catppuccin-frappe",
      macchiato: "catppuccin-macchiato",
      mocha: "catppuccin-mocha",
    },
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function markdownToHtml(markdown: string) {
  return String(await processor.process(markdown));
}