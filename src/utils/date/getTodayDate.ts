export const getTodayDate = (
    locale: string = 'en-GB',
    options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  ): string => {
    const today: Date = new Date();
    return today.toLocaleDateString(locale, options);
  };

