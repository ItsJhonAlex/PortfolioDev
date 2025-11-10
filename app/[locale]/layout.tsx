import {useMessages} from 'next-intl';
import {notFound} from 'next/navigation';
import {Metadata} from 'next';
import Providers from './components/Providers';
import GoogleAnalytics from './components/GoogleAnalytics';
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
  params
}: Props): Promise<Metadata> {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const baseUrl = 'https://itsjhonalex.is-a.dev';
  const currentUrl = `${baseUrl}/${locale}`;
  
  return {
    title: {
      default: messages.metadata.title,
      template: `%s | ${messages.metadata.title}`
    },
    description: messages.metadata.description,
    keywords: [
      'Jonathan Rodríguez López',
      'Full Stack Developer',
      'Desarrollador Full Stack',
      'React',
      'Next.js',
      'Node.js',
      'JavaScript',
      'TypeScript',
      'Python',
      'MongoDB',
      'Web Development',
      'Desarrollo Web',
      'Portfolio',
      'Cuba',
      'Havana',
      'Freelancer',
      'Web3',
      'Blockchain',
      'Solidity',
      'Ethereum',
      'DeFi',
      'IA',
      'Automatización',
      'API Development',
      'Frontend',
      'Backend',
      'Full Stack'
    ],
    authors: [{ name: 'Jonathan Rodríguez López', url: baseUrl }],
    creator: 'Jonathan Rodríguez López',
    publisher: 'Jonathan Rodríguez López',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'es': `${baseUrl}/es`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/en`
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: currentUrl,
      title: messages.metadata.title,
      description: messages.metadata.description,
      siteName: 'Jonathan Rodríguez López - Portfolio',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: messages.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata.title,
      description: messages.metadata.description,
      creator: '@itsjhonalex',
      images: [`${baseUrl}/og-image.jpg`],
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },
    category: 'Technology',
    classification: 'Portfolio Website',
    other: {
      'application-name': 'Jonathan Rodríguez López Portfolio',
      'apple-mobile-web-app-title': 'Jonathan Portfolio',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
    }
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await import(`@/messages/${locale}.json`);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Jonathan Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} animated-gradient min-h-screen`} suppressHydrationWarning>
        <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        <Providers locale={locale} messages={messages.default} timeZone="America/Havana">
          {children}
        </Providers>
      </body>
    </html>
  );
}
