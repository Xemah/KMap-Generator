import { writable } from 'svelte/store';

export const variablesCount = writable(2);
export const form = writable('SOP');
export const hoveredKey = writable(null);

export const kMap = writable(null);
export const terms = writable([]);