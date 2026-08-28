"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<any>(null);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
      setDisplayName(data.display_name || "");
      setBio(data.bio || "");
    }
  }

  async function saveProfile() {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        bio,
      })
      .eq("id", user.id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profil berhasil disimpan.");
      await loadProfile();
    }

    setLoading(false);
  }

  async function changePassword() {
    setMessage("");

    if (password.length < 8) {
      setMessage("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Konfirmasi password tidak sama.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setPassword("");
    setConfirmPassword("");

    setMessage("Password berhasil diubah.");
  }

  if (!profile) {
    return <div className="loading">Memuat...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>Pengaturan</h1>
        <p>Kelola profil dan keamanan akun kamu.</p>
      </div>

      <section className="settings-card">
        <h2>Profil</h2>

        <label>Nama Tampilan</label>

        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={32}
        />

        <label>Username</label>

        <input
          value={profile.username}
          disabled
          className="disabled-input"
        />

        <small>
          Username bersifat permanen dan tidak dapat diubah.
        </small>

        <label>Email</label>

        <input
          value={profile.email || ""}
          disabled
          className="disabled-input"
        />

        <small>
          Email akun digunakan untuk autentikasi.
        </small>

        <label>Bio</label>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={500}
          rows={6}
        />

        <button
          className="primary-btn"
          onClick={saveProfile}
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </section>

      <section className="settings-card">
        <h2>Ubah Password</h2>

        <label>Password Baru</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimal 8 karakter"
        />

        <label>Konfirmasi Password</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Ulangi password"
        />

        <button
          className="primary-btn"
          onClick={changePassword}
        >
          Ubah Password
        </button>
      </section>

      {message && (
        <div className="notice">
          {message}
        </div>
      )}
    </div>
  );
}
