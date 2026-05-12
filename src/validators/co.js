/**
 * Validates a Colombian Cédula de Ciudadanía (CC).
 * Format: 6 to 10 numeric digits, no check digit.
 * @param {string} value
 * @returns {boolean}
 */
export function validateCC(value) {
  const CCFormat = /^\d{6,10}$/;

  return CCFormat.test(value);
}

/**
 * Validates a Colombian Cédula de Extranjería (CE).
 * Format: 4 to 12 alphanumeric characters, case-insensitive.
 * @param {string} value
 * @returns {boolean}
 */
export function validateCE(value) {
  const CEFormat = /^[a-z0-9]{4,12}$/i;

  return CEFormat.test(value);
}

/**
 * Validates a Colombian NIT (Número de Identificación Tributaria).
 * Format: numeric base + "-" + check digit.
 * Check digit uses DIAN weights (prime series) right-to-left, mod 11.
 * @param {string} value - e.g. "900123456-7"
 * @returns {boolean}
 */
export function validateNIT(value) {
  if (!value.includes('-')) return false;

  const split = value.split("-");

  const nit = split[0];
  const dv = parseInt(split[1], 10);

  const weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  let sum = 0;

  [...nit].forEach((char, index) => {
    const n = parseInt(char, 10);
    const multi = n * weights[nit.length - 1 - index];
    sum += multi;
  })

  const mod = sum % 11;
  let modv;
  if (mod === 0 || mod === 1) {
    modv = mod;
  } else {
    modv = 11 - mod;
  }

  if (modv === dv) {
    return true;
  } else {
    return false;
  }
}
