// app/[locale]/layout.tsx

interface RootLayoutProps {
  children: React.ReactNode;
  // ПРОМЯНА: Правим locale незадължителен с '?'
  params: Promise<{ locale?: string }>; 
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  // ПРОМЯНА: Даваме стойност по подразбиране 'bg', ако locale липсва
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'bg';

  return (
    <html lang={locale}>
      <body className="...">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}