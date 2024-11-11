/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  body: string;
}

const JOURNAL_STORAGE_KEY = 'journal_entries';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllEntries = async (): Promise<JournalEntry[]> => {
  await delay(1000); // simulate network delay
  const entries = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
  return entries ? JSON.parse(entries) : [];
};

export const getEntry = async (
  id: string
): Promise<JournalEntry | undefined> => {
  await delay(1000); // simulate network delay
  const entries = await getAllEntries();
  return entries.find((entry) => entry.id === id);
};

export const createEntry = async (entry: JournalEntry): Promise<void> => {
  await delay(1000); // simulate network delay
  const entries = await getAllEntries();
  entries.push(entry);
  await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
};

export const deleteEntry = async (id: string): Promise<void> => {
  await delay(1000); // simulate network delay
  const entries = await getAllEntries();
  const updatedEntries = entries.filter((entry) => entry.id !== id);
  await AsyncStorage.setItem(
    JOURNAL_STORAGE_KEY,
    JSON.stringify(updatedEntries)
  );
};
