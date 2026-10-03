// Per-user GLO prices: N per GB keyed by plan validity (days), plus fixed MB prices.
// Must match GLO_SPECIAL_PRICES in wisper-reseller-api/src/controllers/sendData.controller.js
export const GLO_SPECIAL_PRICES = {
  director: { 3: 328, 7: 342, 30: 383, fixed: { 200: 77, 500: 192 } },
  uzobest: { 3: 329, 7: 344, 30: 387, fixed: { 200: 77.4, 500: 193.5 } },
};

// Returns plans with GLO prices replaced by the user's special prices (if any)
export function applySpecialPrices(plans = [], username) {
  const special = GLO_SPECIAL_PRICES[username?.toLowerCase()];
  if (!special) return plans;

  return plans.map((plan) => {
    if (plan.network !== "glo") return plan;
    const volumeInMB = plan.unit === "gb" ? plan.volume * 1024 : plan.volume;
    if (special.fixed?.[volumeInMB])
      return { ...plan, price: special.fixed[volumeInMB] };
    if (volumeInMB >= 1024) {
      const perGB = special[parseInt(plan.validity, 10)] || special[30];
      return { ...plan, price: Math.round((volumeInMB / 1024) * perGB) };
    }
    return plan;
  });
}
