import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Colors, FontSize, FontWeight } from '@/constants/theme';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>{emoji}</Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Compras',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🛒" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Listas',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📋" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📦" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🕐" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Conta',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.sidebar,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 68,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  icon: {
    fontSize: 22,
    opacity: 0.5,
  },
  iconFocused: {
    opacity: 1,
  },
});
