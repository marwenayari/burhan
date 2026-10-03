import { NextRequest, NextResponse } from 'next/server';
import { DOUBTS_DATA } from '@/lib/data/doubts';

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
    results = results.filter((d) => {
      const matchAr =
        d.titleAr.toLowerCase().includes(q) ||
        d.summaryAr.toLowerCase().includes(q) ||
        d.fullRebuttalAr.toLowerCase().includes(q) ||
        d.categoryNameAr.toLowerCase().includes(q);

      const matchEn =
        d.titleEn.toLowerCase().includes(q) ||
        d.summaryEn.toLowerCase().includes(q) ||
        d.fullRebuttalEn.toLowerCase().includes(q) ||
        d.categoryNameEn.toLowerCase().includes(q);

      return matchAr || matchEn;
    });
  }

  return NextResponse.json({
    total: results.length,
    results,
  });
}
