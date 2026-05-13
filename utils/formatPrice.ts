// ============================================
// Price Formatting Utilities
// ============================================

export const formatPrice = (amount: number, currency: string = 'SAR', locale: string = 'en'): string => {
  if (locale === 'ar') {
    // Arabic format: "٢٥٫٠٠ ر.س"
    const formatter = new Intl.NumberFormat('ar-SA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedNumber = formatter.format(amount);
    return `${formattedNumber} ر.س`;
  }

  // English format: "SAR 25.00"
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedNumber = formatter.format(amount);
  return `${currency} ${formattedNumber}`;
};

export const formatDuration = (hours: number): string => {
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes}m`;
  }

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 0) {
    return `${wholeHours}h`;
  }

  return `${wholeHours}h ${minutes}m`;
};

export const formatPriceWithDuration = (amount: number, hours: number, locale: string = 'en'): string => {
  const price = formatPrice(amount, 'SAR', locale);
  const duration = formatDuration(hours);
  return `${price} / ${duration}`;
};
