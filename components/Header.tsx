"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
    }

    load();

    // Subscribe ke perubahan auth
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setProfile(data));
      } else {
        setProfile(null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  async function logout() {
    await supabase.auth.signOut();
    setOpen(false);
    window.location.href = "/";
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span>TAMA</span>Forge
        </Link>

        <nav className="desktop-nav">
          <Link href="/">Explore</Link>
          <Link href="/categories">Kategori</Link>
          {user && <Link href="/dashboard">Dashboard</Link>}
          {profile?.role === "admin" && <Link href="/admin">Admin</Link>}
        </nav>

        <div className="header-actions">
          {!user ? (
            <>
              <Link href="/auth?mode=login" className="login-btn">
                Masuk
              </Link>
              <Link href="/auth?mode=register" className="primary-btn">
                Daftar
              </Link>
            </>
          ) : (
            <div className="account">
              <button className="account-btn" onClick={() => setOpen(!open)}>
                {profile?.display_name || profile?.username || "Akun"}
                <span>⌄</span>
              </button>
              {open && (
                <div className="account-menu">
                  <Link href={`/u/${profile?.username}`}>Profil Saya</Link>
                  <Link href="/dashboard">Dashboard</Link>
                  <Link href="/settings">Pengaturan</Link>
                  {profile?.role === "admin" && <Link href="/admin">Panel Admin</Link>}
                  <button onClick={logout}>Keluar</button>
                </div>
              )}
            </div>
          )}
          <button className="mobile-menu" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
