export interface CreatePostDto {
  title: string;
  content: string;
  summary: string;
  author: string;
}

export interface UpdatePostDto {
  title: string;
  content: string;
  summary: string;
  id: string;
}
