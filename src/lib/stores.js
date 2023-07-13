import { writable } from 'svelte/store';

export const variablesCount = writable(2);
export const form = writable('SOP');
export const termsType = writable('MIN');
export const terms = writable([]);
export const kMap = writable(null);
export const hoveredKey = writable(null);