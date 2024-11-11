/** @format */

import { Pressable } from 'react-native';
import React, { memo } from 'react';
import Carousel from '@/components/Carousel';
import { IMAGES } from '@/constants/images';
import { router } from 'expo-router';

const Onboarding = () => {
  return (
    <Pressable
      className='flex-1'
      onPress={() => {
        router.navigate('/JournalEntry');
      }}>
      <Carousel
        data={[
          {
            name: 'test',
            source: IMAGES.onboarding1,
            description: 'test',
            display_start: '2024-08-01 01:00:00',
            display_end: '2024-12-30',
            duration: 4,
          },
          {
            name: 'test',
            source: IMAGES.onboarding2,
            description: 'test',
            display_start: '2024-08-01 01:00:00',
            display_end: '2024-12-30',
            duration: 4,
          },
          {
            name: 'test',
            source: IMAGES.onboarding3,
            description: 'test',
            display_start: '2024-08-01 01:00:00',
            display_end: '2024-12-30',
            duration: 4,
          },
          {
            name: 'test',
            source: IMAGES.onboarding4,
            description: 'test',
            display_start: '2024-08-01 01:00:00',
            display_end: '2024-12-30',
            duration: 4,
          },
        ]}
      />
    </Pressable>
  );
};

export default memo(Onboarding);
