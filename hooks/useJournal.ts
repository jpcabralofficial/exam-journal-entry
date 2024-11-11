/** @format */

// src/hooks/useJournal.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getAllEntries,
  createEntry,
  deleteEntry,
  JournalEntry,
} from '../api/journalEntries';

export const useJournal = () => {
  const queryClient = useQueryClient();

  // Query to fetch all journal entries
  const {
    data: journalEntries,
    isLoading,
    isError,
    error,
  } = useQuery<JournalEntry[]>('journalEntries', getAllEntries);

  // Mutation to create a journal entry
  const createMutation = useMutation(createEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('journalEntries');
    },
  });

  // Mutation to delete a journal entry
  const deleteMutation = useMutation(deleteEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('journalEntries');
    },
  });

  return {
    journalEntries,
    isLoading,
    isError,
    error,
    createMutation,
    deleteMutation,
  };
};
