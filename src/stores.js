import { writable } from 'svelte/store';

export const fileCounts = writable(null);
export const selectedDateStr = writable(null);
export const selectedDate = writable(new Date().toISOString());
