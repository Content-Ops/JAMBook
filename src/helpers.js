import { format, parseISO } from 'date-fns';

export const formatDate = (isoString, dateFormat = 'MMMM do, yyyy') => {
  return format(parseISO(isoString), dateFormat);
};
