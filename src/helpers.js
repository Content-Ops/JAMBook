import { format, parseISO } from 'date-fns';

export const formatDate = (isoString, dateFormat = 'MMMM do, yyyy') => {
  return format(parseISO(isoString), dateFormat);
};

export const mergeDays = (data) => {
  const result = {};

  data.forEach((basket) => {
    for (let [key, value] of Object.entries(basket)) {
      if (result[key]) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    }
  });
  return result;
};
