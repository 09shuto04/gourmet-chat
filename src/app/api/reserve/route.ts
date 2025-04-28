import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  console.log('受け取った予約データ:', body);

  // 仮でOKを返す
  return NextResponse.json({ message: '予約を受け付けたよ！' });
}

