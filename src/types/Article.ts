export interface ArticleType {
  id: number
  title:string,
  description:string,
  content:string,
  handler: ({ title, content }: { title: string; content: string }) => void;
}