/**
 * It takes an array and a chunk size, and returns an array of arrays of the given chunk size.
 * @param {any[]} arr - The array to chunk
 * @param {number} chunkSize - The size of each chunk.
 * @returns A function that returns the sum of two numbers.
 */
export const chunk = <T>(arr: T[], chunkSize: number): T[][] => {
  if (chunkSize <= 0) throw "Invalid chunk size";
  const R = [];
  for (let i = 0, len = arr.length; i < len; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
};
