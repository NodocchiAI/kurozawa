export interface Author {
  id: string;
  name: string;
  pseudonym?: string;
  birthYear?: number;
  deathYear?: number;
  biography: string;
  profileImage?: string;
  era: string;
  genre: string[];
  mysteriousBackground?: string;
}

export interface Work {
  id: string;
  title: string;
  authorId: string;
  publishedYear?: number;
  description: string;
  coverImage?: string;
  genre: string[];
  chapters: Chapter[];
  status: 'completed' | 'in_progress' | 'abandoned';
  totalCharacterCount: number;
  forbiddenKnowledge?: string;
}

export interface Chapter {
  id: string;
  workId: string;
  title: string;
  content: string;
  chapterNumber: number;
  publishedAt: Date;
  characterCount: number;
}

export interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  backgroundColor: string;
  textColor: string;
  pageWidth: number;
}