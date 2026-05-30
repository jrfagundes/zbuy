import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';

export default function Screen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.base, paddingBottom: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.border },
  title: { fontSize: FontSize['2xl'], fontWeight: FontWeight.extrabold, color: Colors.text, letterSpacing: -0.5 },
});
