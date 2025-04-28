'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newPost = {
      id: Date.now(),
      title,
      comment,
      image,
    };

    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    storedPosts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(storedPosts));

    router.push('/');
  };

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>✏️ 新しい投稿</h1>

      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "0.8rem", marginBottom: "1rem" }}
        />
        <br />

        <textarea
          placeholder="コメント"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", padding: "0.8rem", height: "100px", marginBottom: "1rem" }}
        />
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "1rem" }}
        />
        <br />

        {image && (
          <img src={image} alt="プレビュー" style={{ width: "200px", marginBottom: "1rem" }} />
        )}
        <br />

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#29b6f6",
            color: "white",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
        >
          投稿する！
        </button>
      </div>
    </main>
  );
}
