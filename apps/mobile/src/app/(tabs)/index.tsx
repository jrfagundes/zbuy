import { Redirect } from 'expo-router';

import { FEATURES } from '@/constants/features';

export default function IndexRedirect() {
  return <Redirect href={FEATURES.journeys ? '/journeys' : '/lists'} />;
}
