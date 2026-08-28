"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [register, setRegister] = useState(params.get("mode") === "register");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!email.includes("@")) {
      setMessage("Email tidak valid.");
      return;
    }

    setLoading(true);

    if (register) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            username: username,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Buat profile manual jika trigger tidak berjalan
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          username,
          display_name: name,
          email,
          role: "user",
        });

        if (profileError) {
          setMessage("Akun dibuat, tetapi gagal menyimpan profil. Hubungi admin.");
          setLoading(false);
          return;
        }

        setMessage("Akun berhasil dibuat! Silakan verifikasi email (jika diaktifkan).");
        setRegister(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-logo">TF</div>
          <b>TAMAForge</b>
        </div>

        <h1>{register ? "Buat Akun" : "Masuk"}</h1>
        <p className="muted">
          {register
            ? "Daftar untuk upload dan membagikan resource."
            : "Masuk ke akun TAMAForge kamu."}
        </p>

        {message && <div className="notice">{message}</div>}

        <form onSubmit={submit}>
          {register && (
            <>
              <label>Nama</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama tampilan"
              />

              <label>Username</label>
              <input
                required
                minLength={3}
                maxLength={24}
                pattern="[A-Za-z0-9_]+"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
              <small>Username tidak dapat diubah setelah akun dibuat.</small>
            </>
          )}

          <label>Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
          />

          <label>Password</label>
          <input
            required
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 6 karakter"
          />

          <button className="primary" disabled={loading}>
            {loading ? "Memproses..." : register ? "Daftar" : "Masuk"}
          </button>
        </form>

        <button
          className="text-button"
          onClick={() => {
            setRegister(!register);
            setMessage("");
          }}
        >
          {register
            ? "Sudah punya akun? Masuk"
            : "Belum punya akun? Daftar"}
        </button>
      </div>
    </main>
  );
}
