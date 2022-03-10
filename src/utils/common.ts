export const getFirstLetter = (str: string | any) => {
  if (!str) return '';

  return str.split('')[0].toUpperCase();
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';

  return `${str.split('')[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number) => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};
