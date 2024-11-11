/** @format */
import React, { memo } from 'react';

import BaseScreen from '@/components/BaseScreen';

import JournalEntries from '@/Screens/JournalEntries';

const JournalEntry = () => {
  return (
    <BaseScreen>
      <JournalEntries />
    </BaseScreen>
  );
};

export default memo(JournalEntry);
