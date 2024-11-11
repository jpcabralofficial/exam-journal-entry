/** @format */

import {
  View,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  Image,
} from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { filter, size } from 'lodash';
import { Colors } from '@/constants/Colors';
export interface CarouselType {
  name: string;
  source: ImageSourcePropType;
  description: string;
  duration: number;
  display_start: string;
  display_end: string;
}
type props = {
  height?: ViewStyle['height'];
  width?: ViewStyle['width'];
  data: CarouselType[];
  showIndicator?: boolean;
};
const isInDisplayRange = (start: string, end: string): boolean => {
  const now = new Date();
  const displayStart = new Date(start);
  const displayEnd = new Date(end);
  return now >= displayStart && now <= displayEnd;
};
const Carousel: React.FC<props> = ({
  width,
  data,
  showIndicator = true,
  height,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const translateX = useSharedValue(0);
  const screenWidth = (width as number) || Dimensions.get('window').width;
  const filteredData: CarouselType[] = useMemo(
    () =>
      filter(data, (item) =>
        isInDisplayRange(item.display_start, item.display_end)
      ),
    [data]
  );

  const duration = useMemo(() => {
    return filteredData[currentIndex]?.duration * 1000 || 2000;
  }, [filteredData, currentIndex]);
  useEffect(() => {
    if (filteredData.length > 1) {
      const intervalId = setInterval(() => {
        const nextIndex = currentIndex + 1;

        translateX.value = withTiming(
          -nextIndex * screenWidth,
          { duration: 2000 },
          () => {
            if (nextIndex >= filteredData.length) {
              translateX.value = 0;
              runOnJS(setCurrentIndex)(0);
            } else {
              runOnJS(setCurrentIndex)(nextIndex);
            }
          }
        );
      }, duration);

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, filteredData, screenWidth, translateX, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const Indicator = useCallback(() => {
    return showIndicator && filteredData.length > 1 ? (
      <View style={styles.indicatorContainer}>
        {filteredData.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: index === currentIndex ? 28 : 22,
              height: index === currentIndex ? 28 : 22,
              borderRadius: 100,
              backgroundColor:
                index === currentIndex ? Colors.primary : Colors.white,
              borderWidth: index === currentIndex ? 3 : 0,
              borderColor: Colors.white,
            }}
          />
        ))}
      </View>
    ) : null;
  }, [showIndicator, filteredData, currentIndex]);
  const newStyle = {
    width: width || styles.image.width,
    height: height || styles.image.height,
  } as any;
  if (size(filteredData) > 0) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.carouselContainer, animatedStyle]}>
          {filteredData.concat(filteredData[0]).map((item, index) => (
            <View
              key={index}
              style={styles.itemContainer}>
              <Image
                source={item.source}
                style={[styles.image, newStyle]}
                resizeMode={'cover'}
              />
            </View>
          ))}
        </Animated.View>

        <Indicator />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%', position: 'relative' },
  carouselContainer: { flexDirection: 'row', width: '100%', height: '100%' },
  itemContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    zIndex: 1,
  },
});

export default memo(Carousel);
