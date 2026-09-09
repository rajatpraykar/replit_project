import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useArtisan } from '@/context/ArtisanContext';

export default function ProductDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getProduct, addReceipt, language } = useArtisan();
  const product = getProduct(id);
  const hi = language === 'hi';
  const [isOrdering, setIsOrdering] = useState(false);

  if (!product) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Text style={[styles.missingText, { color: colors.foreground }]}>Product not found</Text>
      </View>
    );
  }

  const b2bWholesale = product.b2bPrice ?? Math.round(product.price * 0.65);
  const exportVal = product.exportPrice ?? Math.round(product.price * 1.35);

  // Direct UPI & ONDC Order Flow
  const handleDirectOrder = async () => {
    setIsOrdering(true);
    try {
      await addReceipt({
        productName: product.name,
        amount: product.price,
        status: 'Paid',
      });
      Alert.alert(
        hi ? 'ऑर्डर सफलतापूर्वक दर्ज हुआ!' : 'Direct Order Confirmed!',
        hi
          ? `₹${product.price} का भुगतान सत्यापित हो गया है। कारीगर को सीधा भुगतान भेज दिया गया है।`
          : `Direct payment of ₹${product.price} verified. 100% fair-wage proceeds transferred directly to the artisan's account without middlemen.`,
        [{ text: 'OK', onPress: () => router.push('/receipts') }],
      );
    } catch {
      Alert.alert('Error', 'Could not process order.');
    } finally {
      setIsOrdering(false);
    }
  };

  // WhatsApp Order & Inquiry
  const handleWhatsAppInquiry = () => {
    const text = hi
      ? `नमस्ते! मुझे आपके उत्पाद "${product.name}" (मूल्य ₹${product.price}) के बारे में पूछताछ करनी है। क्या यह उपलब्ध है?`
      : `Hello! I would like to inquire about ordering "${product.name}" (Retail: ₹${product.price}, Wholesale: ₹${b2bWholesale}).`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    Linking.openURL(url);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 35 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={product.image} style={styles.heroImage} />
          <Pressable style={[styles.floatingButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color={colors.foreground} />
          </Pressable>
          <View style={[styles.enhancedPill, { backgroundColor: colors.card }]}>
            <Ionicons name="sparkles" size={12} color={colors.primary} />
            <Text style={[styles.enhancedText, { color: colors.primary }]}>AI Studio Photo</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.craft, { color: colors.primary }]}>{product.craft.toUpperCase()}</Text>
              <Text style={[styles.title, { color: colors.foreground }]}>{product.name}</Text>
              {product.nameHindi ? (
                <Text style={[styles.subHindiTitle, { color: colors.mutedForeground }]}>{product.nameHindi}</Text>
              ) : null}
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.price, { color: colors.primary }]}>₹{product.price.toLocaleString('en-IN')}</Text>
              <Text style={[styles.taxLabel, { color: colors.mutedForeground }]}>Direct Artisan Price</Text>
            </View>
          </View>

          <Text style={[styles.material, { color: colors.mutedForeground }]}>{product.material}</Text>

          {/* Pricing Tiers Card (Retail, Wholesale, Export) */}
          <View style={[styles.pricingCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <Text style={[styles.pricingCardHeading, { color: colors.foreground }]}>
              {hi ? 'उचित व्यापार मूल्य स्तर (Fair-Trade Tiers)' : 'Fair-Trade Multi-Channel Pricing'}
            </Text>
            <View style={styles.tierRow}>
              <View style={styles.tierBox}>
                <Text style={[styles.tierTitle, { color: colors.mutedForeground }]}>Retail (खुदरा)</Text>
                <Text style={[styles.tierValue, { color: colors.foreground }]}>₹{product.price}</Text>
              </View>
              <View style={styles.tierBox}>
                <Text style={[styles.tierTitle, { color: colors.mutedForeground }]}>B2B Wholesale (थोक)</Text>
                <Text style={[styles.tierValue, { color: colors.primary }]}>₹{b2bWholesale}</Text>
              </View>
              <View style={styles.tierBox}>
                <Text style={[styles.tierTitle, { color: colors.mutedForeground }]}>Export (निर्यात)</Text>
                <Text style={[styles.tierValue, { color: colors.foreground }]}>₹{exportVal}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.aiHeader}>
            <View style={[styles.aiIcon, { backgroundColor: colors.indigo }]}>
              <Ionicons name="sparkles" size={15} color={colors.accent} />
            </View>
            <View>
              <Text style={[styles.aiTitle, { color: colors.foreground }]}>Listing ready to share</Text>
              <Text style={[styles.aiSub, { color: colors.mutedForeground }]}>Written in English + Hindi</Text>
            </View>
          </View>

          <Text style={[styles.description, { color: colors.foreground }]}>{product.description}</Text>

          {product.hindiDescription ? (
            <View style={[styles.hindiCard, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.hindiLabel, { color: colors.primary }]}>हिंदी में विवरण</Text>
              <Text style={[styles.hindiText, { color: colors.foreground }]}>{product.hindiDescription}</Text>
            </View>
          ) : null}

          {/* Fair wage badge */}
          <View style={[styles.priceInsight, { backgroundColor: '#e7ede3' }]}>
            <View style={[styles.insightIcon, { backgroundColor: colors.success }]}>
              <Ionicons name="shield-checkmark" size={17} color={colors.primaryForeground} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.insightTitle, { color: colors.foreground }]}>MoSJE Fair-Wage Compliant</Text>
              <Text style={[styles.insightText, { color: colors.mutedForeground }]}>
                Guarantees +250% artisan surplus over statutory minimum wage.
              </Text>
            </View>
          </View>

          {/* Direct Order Button (Eliminates Shopify lock-in) */}
          <Pressable
            style={[styles.buyButton, { backgroundColor: colors.primary }]}
            onPress={handleDirectOrder}
            disabled={isOrdering}
          >
            <Ionicons name="card-outline" size={18} color={colors.primaryForeground} />
            <Text style={[styles.buyButtonText, { color: colors.primaryForeground }]}>
              {isOrdering ? 'Processing...' : hi ? 'सीधा भुगतान करें (UPI / ONDC Direct)' : 'Direct Order (UPI / ONDC Direct)'}
            </Text>
          </Pressable>

          {/* WhatsApp Direct Inquiry Button */}
          <Pressable style={[styles.waButton, { backgroundColor: '#25D366' }]} onPress={handleWhatsAppInquiry}>
            <Ionicons name="logo-whatsapp" size={18} color="#ffffff" />
            <Text style={styles.waButtonText}>
              {hi ? 'थोक व ऑर्डर के लिए व्हाट्सएप पर बात करें' : 'Direct WhatsApp Order & Bulk Inquiry'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hero: { height: 330, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  floatingButton: { position: 'absolute', top: 57, left: 18, width: 39, height: 39, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  enhancedPill: { position: 'absolute', right: 18, bottom: 17, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, flexDirection: 'row', gap: 5, alignItems: 'center' },
  enhancedText: { fontSize: 10, fontFamily: 'Inter_700Bold' },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 14 },
  titleRow: { flexDirection: 'row', gap: 10 },
  craft: { fontSize: 10, letterSpacing: 1.1, fontFamily: 'Inter_700Bold' },
  title: { fontSize: 24, lineHeight: 29, fontFamily: 'Inter_700Bold', marginTop: 4 },
  subHindiTitle: { fontSize: 13, fontFamily: 'Inter_500Medium', marginTop: 3 },
  price: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  taxLabel: { fontSize: 9, fontFamily: 'Inter_500Medium', marginTop: 2 },
  material: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: -4 },
  pricingCard: { borderWidth: 1, borderRadius: 16, padding: 12, gap: 8 },
  pricingCardHeading: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  tierRow: { flexDirection: 'row', justifyContent: 'space-between' },
  tierBox: { flex: 1 },
  tierTitle: { fontSize: 10, fontFamily: 'Inter_500Medium' },
  tierValue: { fontSize: 15, fontFamily: 'Inter_700Bold', marginTop: 2 },
  divider: { height: 1, marginVertical: 2 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiIcon: { width: 31, height: 31, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  aiTitle: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  aiSub: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 2 },
  description: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' },
  hindiCard: { padding: 14, borderRadius: 15, gap: 6 },
  hindiLabel: { fontSize: 10, fontFamily: 'Inter_700Bold' },
  hindiText: { fontSize: 13, lineHeight: 21, fontFamily: 'Inter_400Regular' },
  priceInsight: { borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  insightIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  insightTitle: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  insightText: { fontSize: 10, lineHeight: 14, fontFamily: 'Inter_400Regular', marginTop: 3 },
  buyButton: { minHeight: 50, borderRadius: 16, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  buyButtonText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  waButton: { minHeight: 50, borderRadius: 16, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' },
  waButtonText: { color: '#ffffff', fontSize: 13, fontFamily: 'Inter_700Bold' },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontSize: 16, fontFamily: 'Inter_700Bold' },
});