import { NextResponse,NextRequest } from 'next/server';
import { Client } from '@notionhq/client';

// 初始化 Notion 客户端
const notion = new Client({ auth: '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' });

export async function POST(req: NextRequest) {
  try {
    // console.log('Received POST request wow');
    // const requestBody = await req.json();
    //12c9f6274293800fb5f1c44a22943bb7
    //1259f6274293801397c9ca6a67876146
    const databaseId = '1259f6274293801397c9ca6a67876146';

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
