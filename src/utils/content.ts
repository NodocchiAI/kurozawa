import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Author, Work, Chapter } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAuthors(): Author[] {
  const authorsDirectory = path.join(contentDirectory, 'authors');
  
  if (!fs.existsSync(authorsDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(authorsDirectory);
  const authors = filenames
    .filter(name => name.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(authorsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id: data.id,
        name: data.name,
        pseudonym: data.pseudonym,
        birthYear: data.birthYear,
        deathYear: data.deathYear,
        biography: content.trim(),
        era: data.era,
        genre: data.genre || [],
        mysteriousBackground: data.mysteriousBackground,
      } as Author;
    });
    
  return authors;
}

export function getAuthor(id: string): Author | null {
  const authors = getAuthors();
  return authors.find(author => author.id === id) || null;
}

export function getWorks(): Work[] {
  const worksDirectory = path.join(contentDirectory, 'works');
  
  if (!fs.existsSync(worksDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(worksDirectory);
  const works = filenames
    .filter(name => name.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(worksDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const chapters = getChaptersByWorkId(data.id);
      const totalCharacterCount = chapters.reduce((sum, chapter) => sum + chapter.characterCount, 0);
      
      return {
        id: data.id,
        title: data.title,
        authorId: data.authorId,
        publishedYear: data.publishedYear,
        description: content.trim(),
        genre: data.genre || [],
        chapters,
        status: data.status || 'completed',
        totalCharacterCount,
        forbiddenKnowledge: data.forbiddenKnowledge,
      } as Work;
    });
    
  return works;
}

export function getWork(id: string): Work | null {
  const works = getWorks();
  return works.find(work => work.id === id) || null;
}

export function getChapters(): Chapter[] {
  const chaptersDirectory = path.join(contentDirectory, 'chapters');
  
  if (!fs.existsSync(chaptersDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(chaptersDirectory);
  const chapters = filenames
    .filter(name => name.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(chaptersDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id: data.id,
        workId: data.workId,
        title: data.title,
        content: content.trim(),
        chapterNumber: data.chapterNumber,
        publishedAt: new Date(data.publishedAt),
        characterCount: content.trim().length,
      } as Chapter;
    });
    
  return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getChapter(id: string): Chapter | null {
  const chapters = getChapters();
  return chapters.find(chapter => chapter.id === id) || null;
}

export function getChaptersByWorkId(workId: string): Chapter[] {
  const chapters = getChapters();
  return chapters.filter(chapter => chapter.workId === workId);
}