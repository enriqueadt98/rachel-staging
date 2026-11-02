import { getCollection } from 'astro:content';

const MAX_ACTIVE_GOALS = 3;

export async function getGoals() {
  const goals = (await getCollection('goals')).map((g) => g.data);
  const active = goals.filter((g) => g.status === 'active');
  if (active.length > MAX_ACTIVE_GOALS) {
    throw new Error(
      `You have ${active.length} active goals in src/data/goals.yaml, but the max is ${MAX_ACTIVE_GOALS}. Mark one as "achieved" or "let go".`,
    );
  }
  const past = goals
    .filter((g) => g.status !== 'active')
    .sort((a, b) => (b.ended ?? b.started).getTime() - (a.ended ?? a.started).getTime());
  return { active, past };
}

export async function getBooks() {
  const books = (await getCollection('books')).map((b) => b.data);
  const reading = books.filter((b) => b.status === 'reading');
  const done = books
    .filter((b) => b.status !== 'reading')
    .sort((a, b) => (b.finished ?? b.started ?? 0).valueOf() - (a.finished ?? a.started ?? 0).valueOf());
  return { reading, done };
}

export async function getBrainNotes() {
  return (await getCollection('brain')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export type FeedItem = {
  kind: 'instagram' | 'tiktok' | 'youtube' | 'pinterest' | 'brain';
  title: string;
  date: Date;
  url: string;
  external: boolean;
};

// Social posts plus new Brain pages, newest first.
export async function getFeed(limit = 8): Promise<FeedItem[]> {
  const social = (await getCollection('feed')).map(({ data }) => ({
    kind: data.platform,
    title: data.title,
    date: data.date,
    url: data.url,
    external: true,
  }));
  const notes = (await getBrainNotes()).map((n) => ({
    kind: 'brain' as const,
    title: n.data.title,
    date: n.data.date,
    url: `/brain/${n.id}`,
    external: false,
  }));
  return [...social, ...notes].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, limit);
}
