import {useMessages} from 'next-intl';
import {notFound} from 'next/navigation';
import {Metadata} from 'next';
import Providers from './components/Providers';
import {Inter} from "next/font/google"
import {locales} from '@/config';
import {setRequestLocale} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] })

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
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

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await import(`@/messages/${locale}.json`);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} animated-gradient min-h-screen`} suppressHydrationWarning>
        <Providers locale={locale} messages={messages.default}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
