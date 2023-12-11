/**
 * The function calculates the age based on a given date string, number, or Date object.
 * @param {string | number | Date} date - The `date` parameter can be a string, number, or a Date
 * object. It represents the birth date of a person.
 * @returns the current age based on the provided date.
 */
export const getAgeByDateString = (date: string | number | Date) => {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const currentAge = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    return currentAge - 1;
  }
  return currentAge;
};
