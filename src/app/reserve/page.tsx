'use client';

import Link from 'next/link';

export default function Reserve() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>お店の予約ページ🍽️</h1>
      <p style={{ marginTop: "1rem" }}>ここからお店の予約ができます！</p>

      {/* 新しい投稿を作るボタン */}
      <div style={{ marginTop: "2rem" }}>
        <Link href="/post">
          <button style={{
            backgroundColor: "#ff7043",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer"
          }}>
            ＋ 新しい投稿を作る
          </button>
        </Link>
      </div>

      {/* お店の予約ページへ移動するボタン */}
      <div style={{ marginTop: "1rem" }}>
        <Link href="/reserve">
          <button style={{
            backgroundColor: "#29b6f6",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer"
          }}>
            📅 お店の予約はこちら
          </button>
        </Link>
      </div>
    </main>
  );
}
