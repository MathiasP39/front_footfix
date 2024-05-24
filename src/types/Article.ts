import { ArticleFields } from "./ArticleFields";

export interface ArticleType extends ArticleFields {
  handler: ({ title, content }: { title: string; content: string }) => void;
}