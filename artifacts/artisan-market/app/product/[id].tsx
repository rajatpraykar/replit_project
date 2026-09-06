import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useArtisan } from '@/context/ArtisanContext';

export default function ProductDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = useArtisan().getProduct(id);
  if (!product) return <View style={[styles.missing, { backgroundColor: colors.background }]}><Text style={[styles.missingText, { color: colors.foreground }]}>Product not found</Text></View>;
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 25 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}><Image source={product.image} style={styles.heroImage} /><Pressable style={[styles.floatingButton, { backgroundColor: colors.card }]} onPress={() => router.back()}><Feather name="arrow-left" size={20} color={colors.foreground} /></Pressable><View style={[styles.enhancedPill, { backgroundColor: colors.card }]}><Ionicons name="sparkles" size={12} color={colors.primary} /><Text style={[styles.enhancedText, { color: colors.primary }]}>AI enhanced</Text></View></View>
        <View style={styles.body}><View style={styles.titleRow}><View style={{ flex: 1 }}><Text style={[styles.craft, { color: colors.primary }]}>{product.craft.toUpperCase()}</Text><Text style={[styles.title, { color: colors.foreground }]}>{product.name}</Text></View><Text style={[styles.price, { color: colors.primary }]}>₹{product.price.toLocaleString('en-IN')}</Text></View><Text style={[styles.material, { color: colors.mutedForeground }]}>{product.material}</Text><View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.aiHeader}><View style={[styles.aiIcon, { backgroundColor: colors.indigo }]}><Ionicons name="sparkles" size={15} color={colors.accent} /></View><View><Text style={[styles.aiTitle, { color: colors.foreground }]}>Listing ready to share</Text><Text style={[styles.aiSub, { color: colors.mutedForeground }]}>Written in English + Hindi</Text></View></View>
          <Text style={[styles.description, { color: colors.foreground }]}>{product.description}</Text><View style={[styles.hindiCard, { backgroundColor: colors.secondary }]}><Text style={[styles.hindiLabel, { color: colors.primary }]}>हिंदी में</Text><Text style={[styles.hindiText, { color: colors.foreground }]}>{product.hindiDescription}</Text></View>
          <View style={[styles.priceInsight, { backgroundColor: '#e7ede3' }]}><View style={[styles.insightIcon, { backgroundColor: colors.success }]}><Ionicons name="trending-up" size={17} color={colors.primaryForeground} /></View><View style={{ flex: 1 }}><Text style={[styles.insightTitle, { color: colors.foreground }]}>Competitive price</Text><Text style={[styles.insightText, { color: colors.mutedForeground }]}>Your price is in the sweet spot for similar handloom products.</Text></View><Feather name="check" size={18} color={colors.success} /></View>
          <Pressable style={[styles.shareButton, { backgroundColor: colors.primary }]}><Feather name="share-2" size={17} color={colors.primaryForeground} /><Text style={[styles.shareText, { color: colors.primaryForeground }]}>Share listing</Text></Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, hero: { height: 335, position: 'relative' }, heroImage: { width: '100%', height: '100%' }, floatingButton: { position: 'absolute', top: 57, left: 18, width: 39, height: 39, borderRadius: 14, justifyContent: 'center', alignItems: 'center' }, enhancedPill: { position: 'absolute', right: 18, bottom: 17, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, flexDirection: 'row', gap: 5, alignItems: 'center' }, enhancedText: { fontSize: 10, fontFamily: 'Inter_700Bold' }, body: { paddingHorizontal: 20, paddingTop: 23, gap: 14 }, titleRow: { flexDirection: 'row', gap: 10 }, craft: { fontSize: 10, letterSpacing: 1.1, fontFamily: 'Inter_700Bold' }, title: { fontSize: 25, lineHeight: 30, fontFamily: 'Inter_700Bold', marginTop: 7 }, price: { fontSize: 20, fontFamily: 'Inter_700Bold', paddingTop: 17 }, material: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: -4 }, divider: { height: 1, marginVertical: 4 }, aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 }, aiIcon: { width: 31, height: 31, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }, aiTitle: { fontSize: 13, fontFamily: 'Inter_700Bold' }, aiSub: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 3 }, description: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' }, hindiCard: { padding: 14, borderRadius: 15, gap: 6 }, hindiLabel: { fontSize: 10, fontFamily: 'Inter_700Bold' }, hindiText: { fontSize: 13, lineHeight: 21, fontFamily: 'Inter_400Regular' }, priceInsight: { borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 }, insightIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' }, insightTitle: { fontSize: 12, fontFamily: 'Inter_700Bold' }, insightText: { fontSize: 10, lineHeight: 14, fontFamily: 'Inter_400Regular', marginTop: 3 }, shareButton: { minHeight: 51, borderRadius: 16, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 3 }, shareText: { fontSize: 13, fontFamily: 'Inter_700Bold' }, missing: { flex: 1, alignItems: 'center', justifyContent: 'center' }, missingText: { fontSize: 16, fontFamily: 'Inter_700Bold' },
});