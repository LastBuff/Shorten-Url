const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(ALPHABET.length); // 62

export function encodeBase62(num: bigint | number): string {
  let n = BigInt(num);
  if (n === 0n) return ALPHABET[0];

  let result = '';
  while (n > 0n) {
    const remainder = Number(n % BASE);
    result = ALPHABET[remainder] + result;
    n = n / BASE;
  }
  return result;
}

export function decodeBase62(str: string): bigint {
  let result = 0n;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const index = ALPHABET.indexOf(char);
    if (index === -1) {
      throw new Error(`Invalid Base62 character: ${char}`);
    }
    result = result * BASE + BigInt(index);
  }
  return result;
}