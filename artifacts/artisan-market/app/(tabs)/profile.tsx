import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { AppLanguage, useArtisan } from '@/context/ArtisanContext';

const languageLabels: Record<AppLanguage, string> = { en: 'English', hi: 'हिन्दी', mr: 'मराठी', bn: 'বাংলা' };

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, setLanguage } = useArtisan();
  const hi = language === 'hi';
  const [hindi, setHindi] = useState(true);
  const [tips, setTips] = useState(true);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.eyebrow, { color: colors.primary }]}>{hi ? 'आपकी प्रोफ़ाइल' : 'DIGITAL ARTISAN IDENTITY'}</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>{hi ? 'पहचान एवं सेटिंग्स' : 'Artisan Identity & Settings'}</Text>

        {/* Official Government Artisan Digital Identity Card */}
        <View style={[styles.idCard, { backgroundColor: colors.indigo }]}>
          <View style={styles.idCardTop}>
            <View style={styles.idEmblemBox}>
              <Ionicons name="ribbon" size={24} color="#ffd54f" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.idCardGovText}>MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT</Text>
              <Text style={styles.idCardSchemeText}>Verified Digital Artisan Identity (पहचान पत्र)</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#2e7d32" />
              <Text style={styles.verifiedText}>Aadhaar Verified</Text>
            </View>
          </View>

          <View style={styles.idCardBody}>
            <View style={[styles.bigAvatar, { backgroundColor: colors.accent }]}>
              <Text style={[styles.bigAvatarText, { color: colors.indigo }]}>K</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>Kavita Devi (कविता देवी)</Text>
              <Text style={styles.profileSub}>Master Weaver · Sanganer Handloom Cluster, Jaipur</Text>
              <View style={styles.idMetaRow}>
                <Text style={styles.idMetaTag}>Category: SC/ST Artisan</Text>
                <Text style={styles.idMetaTag}>Udyam: RJ-14-0028911</Text>
              </View>
            </View>
          </View>

          <View style={styles.idCardBottom}>
            <View>
              <Text style={styles.idLabel}>PEHCHAN ARTISAN CARD ID</Text>
              <Text style={styles.idValue}>PEHCHAN-TEX-2024-8842</Text>
            </View>
            <View style={styles.qrMini}>
              <Ionicons name="qr-code" size={28} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Language Selection */}
        <Text style={[styles.groupLabel, { color: colors.mutedForeground }]}>{hi ? 'भाषा चयन' : 'LANGUAGE'}</Text>
        <View style={[styles.languageCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.prefIcon, { backgroundColor: colors.secondary }]}>
            <Ionicons name="globe-outline" size={18} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.prefTitle, { color: colors.foreground }]}>{hi ? 'ऐप भाषा' : 'App language'}</Text>
            <Text style={[styles.prefText, { color: colors.mutedForeground }]}>
              {hi ? 'सभी लेबल और सहायक टेक्स्ट बदलें' : 'Switch Hindi, English, Marathi, or Bengali'}
            </Text>
          </View>
          <Pressable style={[styles.languageSelect, { backgroundColor: colors.secondary }]} onPress={() => setShowLanguageMenu((open) => !open)}>
            <Text style={[styles.languageSelectText, { color: colors.foreground }]}>{languageLabels[language]}</Text>
            <Feather name="chevron-down" size={14} color={colors.mutedForeground} />
          </Pressable>
        </View>

        {showLanguageMenu && (
          <View style={[styles.languageMenu, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {(Object.keys(languageLabels) as AppLanguage[]).map((option) => (
              <Pressable
                key={option}
                style={styles.languageOption}
                onPress={() => {
                  void setLanguage(option);
                  setShowLanguageMenu(false);
                }}
              >
                <Text style={[styles.languageOptionText, { color: option === language ? colors.primary : colors.foreground }]}>
                  {languageLabels[option]}
                </Text>
                {option === language && <Ionicons name="checkmark" size={16} color={colors.primary} />}
              </Pressable>
            ))}
          </View>
        )}

        <View style={[styles.preferenceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.prefIcon, { backgroundColor: colors.secondary }]}>
            <Ionicons name="mic-outline" size={18} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.prefTitle, { color: colors.foreground }]}>{hi ? 'भाषिणी एवं आवाज़ सहायता' : 'Bhashini Voice Assist'}</Text>
            <Text style={[styles.prefText, { color: colors.mutedForeground }]}>
              {hi ? 'बोलकर कैटलॉग बनाने और सुनने के लिए' : 'Voice-first cataloging in Indian languages'}
            </Text>
          </View>
          <Switch value={hindi} onValueChange={setHindi} trackColor={{ false: colors.muted, true: colors.primary }} thumbColor={colors.card} />
        </View>

        <Text style={[styles.groupLabel, { color: colors.mutedForeground }]}>{hi ? 'सुविधाएं व सहायता' : 'QUICK LINKS'}</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { icon: 'file-text', label: hi ? 'रसीदें और इनवॉइस (Receipts)' : 'Receipts & invoices', action: () => router.push('/receipts') },
            { icon: 'shopping-bag', label: hi ? 'ONDC व GeM बाज़ार लिंकेज' : 'ONDC & GeM Market Linkage', action: () => router.push('/sell' as any) },
            { icon: 'award', label: hi ? 'पीएम विश्वकर्मा योजना स्थिति' : 'PM Vishwakarma Scheme Status', action: () => router.push('/analytics' as any) },
            { icon: 'shield', label: hi ? 'सुरक्षा और डेटा गोपनीयता' : 'Privacy & artisan data rights' },
          ].map((item, index) => (
            <Pressable
              key={item.label}
              onPress={item.action}
              style={[styles.menuRow, index < 3 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
            >
              <Feather name={item.icon as any} size={17} color={colors.mutedForeground} />
              <Text style={[styles.menuLabel, { color: colors.foreground }]}>{item.label}</Text>
              <Feather name="chevron-right" size={17} color={colors.mutedForeground} />
            </Pressable>
          ))}
        </View>

        <Text style={[styles.version, { color: colors.mutedForeground }]}>
          Artisan Market v2.0 • Smart India Hackathon Grand Finale • MoSJE PS 26090
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 15 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Inter_700Bold' },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', marginTop: -5, marginBottom: 5 },
  idCard: { borderRadius: 22, padding: 18, gap: 14 },
  idCardTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  idEmblemBox: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  idCardGovText: { color: 'rgba(255,250,244,0.75)', fontSize: 9, fontFamily: 'Inter_700Bold', letterSpacing: 0.8 },
  idCardSchemeText: { color: '#ffffff', fontSize: 11, fontFamily: 'Inter_600SemiBold', marginTop: 1 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#ffffff', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  verifiedText: { fontSize: 9, fontFamily: 'Inter_700Bold', color: '#2e7d32' },
  idCardBody: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bigAvatar: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  bigAvatarText: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  profileName: { color: '#fffaf4', fontSize: 16, fontFamily: 'Inter_700Bold' },
  profileSub: { color: 'rgba(255,250,244,0.72)', fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 3 },
  idMetaRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  idMetaTag: { color: '#ffd54f', fontSize: 10, fontFamily: 'Inter_600SemiBold', backgroundColor: 'rgba(0,0,0,0.2)', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6 },
  idCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.18)', paddingTop: 10 },
  idLabel: { color: 'rgba(255,250,244,0.65)', fontSize: 9, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  idValue: { color: '#ffffff', fontSize: 12, fontFamily: 'Inter_700Bold', marginTop: 2 },
  qrMini: { opacity: 0.9 },
  groupLabel: { fontSize: 10, letterSpacing: 1.2, fontFamily: 'Inter_700Bold', marginTop: 5 },
  languageCard: { borderWidth: 1, borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12 },
  languageSelect: { borderRadius: 11, paddingVertical: 8, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  languageSelectText: { fontSize: 10, fontFamily: 'Inter_700Bold' },
  languageMenu: { borderWidth: 1, borderRadius: 16, overflow: 'hidden', marginTop: -8 },
  languageOption: { minHeight: 42, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee5d9' },
  languageOptionText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  preferenceCard: { borderWidth: 1, borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12 },
  prefIcon: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  prefTitle: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  prefText: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 3, lineHeight: 14 },
  menuCard: { borderWidth: 1, borderRadius: 18, overflow: 'hidden', marginTop: 2 },
  menuRow: { minHeight: 52, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuLabel: { flex: 1, fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  version: { textAlign: 'center', fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 12 },
});