import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (locale !== 'en' && locale !== 'es') {
    return {
      messages: {},
      timeZone: 'America/Havana'
    };
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'America/Havana'
  };
});
