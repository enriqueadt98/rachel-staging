import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { parse } from 'yaml';

// Lets the YAML files in src/data be plain lists without needing an `id` on every entry.
const yamlList = (path: string) =>
  file(path, {
    parser: (text) => (parse(text) ?? []).map((entry: object, i: number) => ({ id: String(i), ...entry })),
  });

const brain = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/brain' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: yamlList('src/data/books.yaml'),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'finished', 'abandoned']),
    started: z.coerce.date().optional(),
    finished: z.coerce.date().optional(),
    rating: z.number().min(1).max(5).optional(),
    note: z.string().optional(),
  }),
});

const goals = defineCollection({
  loader: yamlList('src/data/goals.yaml'),
  schema: z.object({
    title: z.string(),
    why: z.string().optional(),
    status: z.enum(['active', 'achieved', 'let go']),
    started: z.coerce.date(),
    ended: z.coerce.date().optional(),
  }),
});

const travels = defineCollection({
  loader: yamlList('src/data/travels.yaml'),
  schema: z.object({
    title: z.string(),
    places: z.string(),
    emoji: z.string().default('✈️'),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    polarsteps: z.string().url(),
  }),
});

const feed = defineCollection({
  loader: yamlList('src/data/feed.yaml'),
  schema: z.object({
    platform: z.enum(['instagram', 'tiktok', 'youtube', 'pinterest']),
    title: z.string(),
    date: z.coerce.date(),
    url: z.string().url(),
  }),
});

const meditation = defineCollection({
  loader: file('src/data/meditation.yaml', {
    parser: (text) => (parse(text)?.days ?? []).map((d: Date | string) => {
      const day = d instanceof Date ? d.toISOString().slice(0, 10) : String(d);
      return { id: day };
    }),
  }),
  schema: z.object({}),
});

export const collections = { brain, books, goals, travels, feed, meditation };
