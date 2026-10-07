import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Page introuvable</h1>
      <p className="mt-2 text-lg text-muted" lang="en">Page not found</p>
      <ul className="mt-8 flex gap-6">
        <li><Link className="underline underline-offset-4" href="/fr/">Retour à l’accueil</Link></li>
        <li><Link className="underline underline-offset-4" href="/en/" hrefLang="en">Back to home</Link></li>
      </ul>
    </section>
  );
}
