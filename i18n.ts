import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (locale !== 'en' && locale !== 'es') {
    return {
      messages: {}
    };
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
