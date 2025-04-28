'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  comment: string;
  image?: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);

      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      setPosts(storedPosts);
    } else {
      router.push('/login');
    }
  }, [isMounted, router]);

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  if (!user) {
    return null;
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>グルメチャット 🍽️</h1>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>{user}さん、こんにちは！😄</p>

      {/* 投稿一覧 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {posts.map((post) => (
          <div key={post.id} style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            overflow: "hidden",
            textAlign: "left"
          }}>
            {post.image && (
              <img 
                src={post.image}
                alt="投稿画像"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            )}
            <div style={{ padding: "1rem" }}>
              <h2 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h2>
              <p style={{ marginBottom: "1rem" }}>{post.comment}</p>
              <button
                onClick={() => handleDelete(post.id)}
                style={{
                  backgroundColor: "#ef5350",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                🗑️ 削除する
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 新しい投稿ページへ */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link href="/new-post">
          <button
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            ✏️ 新しい投稿
          </button>
        </Link>
      </div>

      {/* ログアウトボタン */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          style={{
            backgroundColor: "#ef5350",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer"
          }}
          onClick={() => {
            localStorage.removeItem('user');
            router.push('/login');
          }}
        >
          ログアウトする
        </button>
      </div>
    </main>
  );
}
