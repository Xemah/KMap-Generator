import { writable } from 'svelte/store';

export const variablesCount = writable(2);
export const form = writable('SOP');
export const terms = writable([]);
export const hoveredTerm = writable(null);