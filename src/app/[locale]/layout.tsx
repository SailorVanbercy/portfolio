import '../globals.css';

export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: 'fr' }, { locale: 'en' }];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
