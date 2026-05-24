export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
}

export interface BookFilter {
  id: string;
  book_title: string;
  author: string;
}

export interface ApiFilter {
  key: string;
  values: string[];
}

export const BOOK_FILTERS: BookFilter[] = [
  {
    id: "default",
    book_title: "Медицинская микробиология, вирусология, иммунология",
    author: "Borisov Leonid Borisovich",
  },
];

export function toApiFilters(book: BookFilter): ApiFilter[] {
  return [
    { key: "book_title", values: [book.book_title] },
    { key: "author", values: [book.author] },
  ];
}
