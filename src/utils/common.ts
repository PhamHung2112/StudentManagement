export const getFirstLetter = (str: string | any) => {
  if (!str) return '';

  return str.split('')[0];
};
