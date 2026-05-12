/**
 * Validates a Chilean RUT/RUN.
 * Format: numeric base + "-" + check digit (0-9 or K).
 * Check digit uses mod 11 with weights [2-7] cycling right-to-left.
 * @param {string} value - e.g. "12345678-9" or "7654321-K"
 * @returns {boolean}
 */
export function validateRUT(value) {
  if (!value.includes('-')) return false;

  const split = value.split("-");

  const rut = split[0];
  const dv = split[1]

  const weights = [2, 3, 4, 5, 6, 7];
  let sum = 0;
  const digits = [...rut].reverse();
  digits.forEach((char, index) => {
    const n = parseInt(char, 10);
    const multi = n * weights[index % weights.length];
    sum += multi;
  })

  const mod = sum % 11;

  let modv;

  const result = 11 - mod;
  if (result === 11) modv = "0";
  else if (result === 10) modv = "K";
  else modv = result;

  if (String(modv).toLowerCase() === dv.toLowerCase()) {
    return true;
  } else {
    return false;
  }
};

/** Alias of {@link validateRUT} — RUN and RUT share the same format and algorithm. */
export const validateRUN = validateRUT;
