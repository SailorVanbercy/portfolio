const PREFERRED_LOCALE_SCRIPT =
  "try{var l=(navigator.language||'fr').slice(0,2);location.replace(l==='en'?'/en/':'/fr/')}catch(e){location.replace('/fr/')}";

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/fr/" />
      <script dangerouslySetInnerHTML={{ __html: PREFERRED_LOCALE_SCRIPT }} />
      <p>
        <a href="/fr/">Sailor Vanbercy, portfolio</a>
      </p>
    </>
  );
}
