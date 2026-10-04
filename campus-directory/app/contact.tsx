import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, type IconName } from '../theme';

const categories: { id: string; label: string; icon: IconName }[] = [
  { id: 'out-of-date', label: 'Information is out of date', icon: 'time-outline' },
  { id: 'inaccessible', label: 'Access problem', icon: 'accessibility-outline' },
  { id: 'closed', label: 'Room is closed', icon: 'lock-closed-outline' },
  { id: 'other', label: 'Something else', icon: 'help-circle-outline' },
];

export default function ContactScreen() {
  const router = useRouter();

  const [selected, setSelected] = useState(categories[0].id);
  const [sent, setSent] = useState(false);

  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={close} accessibilityRole="button" hitSlop={8}>
              <Text style={styles.headerAction}>Close</Text>
            </Pressable>
          ),
        }}
      />

      {sent ? (
        <View style={styles.sent}>
          <View style={styles.sentIcon}>
            <Ionicons name="checkmark" size={40} color={colors.surface} />
          </View>
          <Text style={styles.sentTitle}>Thanks, that is logged</Text>
          <Text style={styles.sentText}>
            Facilities will pick this up during opening hours.
          </Text>
          <Pressable
            onPress={close}
            style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>Close</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.label}>What is the problem?</Text>

          {categories.map((category) => {
            const isSelected = selected === category.id;
            return (
              <Pressable
                key={category.id}
                onPress={() => setSelected(category.id)}
                style={[styles.option, isSelected && styles.optionSelected]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <Ionicons
                  name={category.icon}
                  size={20}
                  color={isSelected ? colors.accent : colors.muted}
                />
                <Text style={styles.optionText}>{category.label}</Text>
                <Ionicons
                  name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={isSelected ? colors.accent : colors.muted}
                />
              </Pressable>
            );
          })}

          <Pressable
            onPress={() => setSent(true)}
            style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>Send report</Text>
          </Pressable>

          <Text style={styles.footnote}>
            Reports are held locally for this demo and are not sent anywhere.
          </Text>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerAction: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    gap: 10,
    paddingBottom: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  optionSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  primaryButton: {
    marginTop: 14,
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 16,
  },
  footnote: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 12,
    marginTop: 10,
  },
  sent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  sentIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  sentText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
});