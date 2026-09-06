import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [hindi, setHindi] = useState(true);
  const [tips, setTips] = useState(true);
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 30 }]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>YOUR SPACE</Text><Text style={[styles.title, { color: colors.foreground }]}>Profile & preferences</Text>
        <View style={[styles.profileCard, { backgroundColor: colors.indigo }]}><View style={[styles.bigAvatar, { backgroundColor: colors.accent }]}><Text style={[styles.bigAvatarText, { color: colors.indigo }]}>K</Text></View><View style={{ flex: 1 }}><Text style={styles.profileName}>Kavita Devi</Text><Text style={styles.profileSub}>Textile artisan · Jaipur</Text></View><Pressable style={styles.editButton}><Feather name="edit-2" size={15} color={colors.primaryForeground} /></Pressable></View>
        <Text style={[styles.groupLabel, { color: colors.mutedForeground }]}>LANGUAGE</Text>
        <View style={[styles.preferenceCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.prefIcon, { backgroundColor: colors.secondary }]}><Ionicons name="language-outline" size={18} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.prefTitle, { color: colors.foreground }]}>Hindi assistance</Text><Text style={[styles.prefText, { color: colors.mutedForeground }]}>Use Hindi for AI suggestions and tips</Text></View><Switch value={hindi} onValueChange={setHindi} trackColor={{ false: colors.muted, true: colors.primary }} thumbColor={colors.card} /></View>
        <Text style={[styles.groupLabel, { color: colors.mutedForeground }]}>PREFERENCES</Text>
        <View style={[styles.preferenceCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.prefIcon, { backgroundColor: '#e9efe6' }]}><Ionicons name="bulb-outline" size={18} color={colors.sage} /></View><View style={{ flex: 1 }}><Text style={[styles.prefTitle, { color: colors.foreground }]}>Helpful tips</Text><Text style={[styles.prefText, { color: colors.mutedForeground }]}>Small ideas to grow your online business</Text></View><Switch value={tips} onValueChange={setTips} trackColor={{ false: colors.muted, true: colors.sage }} thumbColor={colors.card} /></View>
        <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>{[{ icon: 'help-circle', label: 'How Artisan Market works' }, { icon: 'shield', label: 'Privacy & your data' }, { icon: 'message-circle', label: 'Get help' }].map((item, index) => <Pressable key={item.label} style={[styles.menuRow, index < 2 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}><Feather name={item.icon as 'help-circle'} size={17} color={colors.mutedForeground} /><Text style={[styles.menuLabel, { color: colors.foreground }]}>{item.label}</Text><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></Pressable>)}</View>
        <Text style={[styles.version, { color: colors.mutedForeground }]}>Artisan Market · Built for makers, with care</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 20, gap: 16 }, eyebrow: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Inter_700Bold' }, title: { fontSize: 28, fontFamily: 'Inter_700Bold', marginTop: -5, marginBottom: 7 }, profileCard: { borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }, bigAvatar: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' }, bigAvatarText: { fontSize: 22, fontFamily: 'Inter_700Bold' }, profileName: { color: '#fffaf4', fontSize: 16, fontFamily: 'Inter_700Bold' }, profileSub: { color: 'rgba(255,250,244,0.68)', fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 4 }, editButton: { width: 32, height: 32, borderRadius: 11, borderWidth: 1, borderColor: 'rgba(255,250,244,0.28)', alignItems: 'center', justifyContent: 'center' }, groupLabel: { fontSize: 10, letterSpacing: 1.2, fontFamily: 'Inter_700Bold', marginTop: 7 }, preferenceCard: { borderWidth: 1, borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12 }, prefIcon: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }, prefTitle: { fontSize: 13, fontFamily: 'Inter_700Bold' }, prefText: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 4, lineHeight: 14 }, menuCard: { borderWidth: 1, borderRadius: 18, overflow: 'hidden', marginTop: 2 }, menuRow: { minHeight: 53, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }, menuLabel: { flex: 1, fontSize: 12, fontFamily: 'Inter_600SemiBold' }, version: { textAlign: 'center', fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 12 },
});