export const calculateFireProductPremiumBase = (
  insuredPrice: number,
  premiumRate: number,
  isPermille: boolean,
  period: number
) => {
  let calculatedPremiumBase = 0;
  if (isPermille) {
    calculatedPremiumBase = insuredPrice * (premiumRate / 1000) * period;
  } else {
    calculatedPremiumBase = insuredPrice * (premiumRate / 100) * period;
  }

  // Bulatkan ke 2 desimal untuk konsistensi dengan backend
  return Math.round(calculatedPremiumBase * 100) / 100;
};
