import { writable } from 'svelte/store';
import cookies from 'js-cookie';

let initialWordsPerDay = cookies.get('initialWordsPerDay') || 200;
let initialDocumentTargetLength =
  cookies.get('initialDocumentTargetLength') || 1000;

export const selectedDateStr = writable(null);
export const selectedDate = writable(null);
export const wordsPerDay = writable(initialWordsPerDay);
export const documentTargetLength = writable(initialDocumentTargetLength);
