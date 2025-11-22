/**
 * Typography System
 * Based on circle_screen_designs.md specifications
 */

import {Platform} from 'react-native';

export const Typography = {
  // Font Families
  fontFamily: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),

  // Type Scale
  display: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 40,
  },
  title1: {
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 34,
  },
  title2: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 28,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
  },
  headline: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
  },
  callout: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21,
  },
  subhead: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};

export default Typography;

