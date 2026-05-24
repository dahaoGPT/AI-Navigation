import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const notionKey = process.env.NOTION_KEY;
  const databaseId = process.env.NOTION_PAGE_ID;

  if (!notionKey || !databaseId) {
    return NextResponse.json(
      { error: 'Notion integration is not configured' },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
