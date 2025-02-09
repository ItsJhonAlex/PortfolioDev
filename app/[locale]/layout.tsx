import {useMessages} from 'next-intl';
import {notFound} from 'next/navigation';
import { Metadata } from 'next';
import Providers from './components/Providers';
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}];
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = useMessages();

  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
