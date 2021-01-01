import { writable } from 'svelte/store';

export const fileCounts = writable(null);
export const selectedDateStr = writable(null);
export const selectedDate = writable(null);
export const wordsPerDay = writable(1);
export const documentTargetLength = writable(200);
