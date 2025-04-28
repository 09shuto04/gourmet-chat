'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {  // ← 関数名もLoginに直したよ！
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem('user', email);
      router.push('/');
    } else {
      alert('メールアドレスとパスワードを入力してください');
    }
  }

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>ログインページ 🔐</h1>
      <form onSubmit={handleLogin} style={{ marginTop: "2rem" }}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.8rem", marginBottom: "1rem", width: "80%" }}
          required
        /><br />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.8rem", marginBottom: "1rem", width: "80%" }}
          required
        /><br />
        <button type="submit" style={{
          backgroundColor: "#29b6f6",
          color: "white",
          border: "none",
          padding: "0.8rem 1.5rem",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer"
        }}>
          ログインする
        </button>
      </form>
    </main>
  );
}
