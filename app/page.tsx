import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page">
      <h1>Selamat datang di TAMAForge</h1>
      <p className="muted">Tempat berbagi resource SA:MP & open.mp.</p>
      <Link href="/auth?mode=login" className="primary-btn">Mulai</Link>
    </main>
  );
}
