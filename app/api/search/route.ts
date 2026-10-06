import { NextRequest, NextResponse } from 'next/server';
import { DOUBTS_DATA, getDoubtSearchText } from '@/lib/data/doubts';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');

  let results = DOUBTS_DATA;

  if (category && category !== 'all') {
    results = results.filter((d) => d.category === category);
  }

  if (difficulty && difficulty !== 'all') {
    results = results.filter((d) => d.difficulty === difficulty);
  }

  if (q.trim()) {
    results = results.filter((d) => getDoubtSearchText(d).includes(q));
  }

  return NextResponse.json({
    total: results.length,
    results,
  });
}
