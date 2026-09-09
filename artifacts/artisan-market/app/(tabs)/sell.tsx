import React, { useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useArtisan } from '@/context/ArtisanContext';
import { getApiBaseUrl } from '@/constants/api';

export default function SellScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { products, language } = useArtisan();
  const hi = language === 'hi';
  const [showBecknModal, setShowBecknModal] = useState(false);
  const [downloadingGeM, setDownloadingGeM] = useState(false);

  const totalCatalogValue = products.reduce((acc, p) => acc + p.price, 0);

  // WhatsApp Business Share
  const shareCatalogOnWhatsApp = () => {
    const baseUrl = process.env.EXPO_PUBLIC_DOMAIN ? `https://${process.env.EXPO_PUBLIC_DOMAIN}` : 'https://artisan-market.mosje.gov.in';
    const topProducts = products.slice(0, 3).map((p, i) => `${i + 1}. *${p.name}* - ₹${p.price} (B2B: ₹${p.b2bPrice ?? Math.round(p.price * 0.65)})`).join('\n');
    
    const message = hi
      ? `🙏 नमस्ते! मैं राजस्थान/उत्तर प्रदेश का प्रमाणित हस्तशिल्प कारीगर हूँ।\n\nमेरी सीधी कारीगर दुकान से प्रामाणिक हस्तनिर्मित उत्पाद देखें:\n${topProducts}\n\n📦 सरकारी ONDC और GeM पर उपलब्ध\n🔗 डिजिटल कैटलॉग: ${baseUrl}/inventory\n\nसीधे ऑर्डर या थोक पूछताछ के लिए संपर्क करें!`
      : `🙏 Namaste! I am a certified Indian traditional artisan supported by MoSJE.\n\nExplore direct authentic handcrafted products:\n${topProducts}\n\n📦 Available on ONDC & GeM\n🔗 Digital Catalog: ${baseUrl}/inventory\n\nReply directly for bulk or festive orders!`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Share Catalog', 'Could not open WhatsApp. Link copied to clipboard.');
    });
  };

  // Download GeM CSV
  const handleDownloadGeM = async () => {
    setDownloadingGeM(true);
    try {
      const baseUrl = getApiBaseUrl();
      const csvUrl = `${baseUrl}/api/gem-export`;
      if (typeof window !== 'undefined') {
        window.open(csvUrl, '_blank');
      } else {
        await Linking.openURL(csvUrl);
      }
      Alert.alert(
        hi ? 'GeM कैटलॉग डाउनलोड हो गया' : 'GeM Catalogue Downloaded',
        hi
          ? 'सरकारी ई-मार्केटप्लेस (GeM) के लिए तैयार CSV फ़ाइल डाउनलोड हो गई है। इसे GeM विक्रेता पोर्टल पर सीधे अपलोड किया जा सकता है।'
          : 'The Government e-Marketplace CSV is downloaded and ready for direct bulk upload to the GeM seller portal.',
      );
    } catch {
      Alert.alert('Download Failed', 'Please try again.');
    } finally {
      setDownloadingGeM(false);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>
            {hi ? 'सरकारी एवं खुला बाज़ार' : 'GOVERNMENT & OPEN COMMERCE'}
          </Text>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {hi ? 'बाज़ार लिंकेज केंद्र' : 'Market Linkage Hub'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {hi
              ? 'साल भर डिजिटल बिक्री: ONDC, GeM और व्हाट्सएप से सीधे खरीदारों तक पहुंचें।'
              : 'Year-round sales channels connecting you directly to national buyers and public procurement.'}
          </Text>
        </View>

        {/* ONDC Beckn Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconPill, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="git-network-outline" size={20} color="#2e7d32" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.badgeRow}>
                <Text style={[styles.cardTitle, { color: colors.foreground }]}>ONDC Digital Commerce</Text>
                <View style={styles.activeBadge}>
                  <View style={styles.activeDot} />
                  <Text style={styles.activeText}>LIVE (RET-10)</Text>
                </View>
              </View>
              <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>
                {hi ? 'ओपन नेटवर्क फॉर डिजिटल कॉमर्स पर सूचीबद्ध' : 'Listed on national open network for digital commerce'}
              </Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.statGrid}>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: colors.foreground }]}>{products.length}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{hi ? 'सक्रिय उत्पाद' : 'Products Live'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: colors.primary }]}>₹{totalCatalogValue.toLocaleString('en-IN')}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{hi ? 'कैटलॉग मूल्य' : 'Catalog Value'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: colors.success }]}>0%</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{hi ? 'कमीशन (शून्य)' : 'Commission'}</Text>
            </View>
          </View>
          <Pressable
            style={[styles.outlineBtn, { borderColor: colors.border, backgroundColor: colors.secondary }]}
            onPress={() => setShowBecknModal(!showBecknModal)}
          >
            <Ionicons name="code-slash-outline" size={16} color={colors.foreground} />
            <Text style={[styles.outlineBtnText, { color: colors.foreground }]}>
              {showBecknModal ? (hi ? 'प्रोटोकॉल छुपाएं' : 'Hide Beckn Payload') : (hi ? 'Beckn ONDC पेलोड देखें' : 'Inspect Beckn Payload')}
            </Text>
          </Pressable>

          {showBecknModal && (
            <View style={[styles.codeBox, { backgroundColor: '#1e1e24' }]}>
              <Text style={styles.codeText}>
                {JSON.stringify(
                  {
                    context: { domain: 'nic2004:52110', core_version: '1.1.0', action: 'on_search', country: 'IND' },
                    provider: { id: 'artisan-mosje-jaipur', verified: true, socialCategory: 'SC/ST Beneficiary' },
                    itemsCount: products.length,
                    standardsCompliance: 'Beckn Retail 1.1.0 (ONDC Certified)',
                  },
                  null,
                  2,
                )}
              </Text>
            </View>
          )}
        </View>

        {/* GeM Government e-Marketplace Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconPill, { backgroundColor: '#fff3e0' }]}>
              <Ionicons name="business-outline" size={20} color="#e65100" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>GeM Government e-Marketplace</Text>
              <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>
                {hi
                  ? 'सरकारी कार्यालयों और मंत्रालयों के लिए थोक खरीद कैटलॉग'
                  : 'Bulk procurement catalog for government departments & PSUs'}
              </Text>
            </View>
          </View>
          <View style={[styles.featureList]}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={[styles.featureText, { color: colors.foreground }]}>
                {hi ? 'HSN 6304 / 6912 कोड स्वतः वर्गीकृत' : 'HSN 6304 / 6912 auto-classified with Make-In-India tags'}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={[styles.featureText, { color: colors.foreground }]}>
                {hi ? 'सूक्ष्म एवं लघु उद्योग (MSE) वरीयता प्राप्त' : 'MoSJE & MSE reserved procurement preference'}
              </Text>
            </View>
          </View>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={handleDownloadGeM}
            disabled={downloadingGeM}
          >
            <Feather name="download" size={17} color={colors.primaryForeground} />
            <Text style={[styles.primaryBtnText, { color: colors.primaryForeground }]}>
              {downloadingGeM ? (hi ? 'डाउनलोड हो रहा है…' : 'Generating CSV…') : (hi ? 'GeM कैटलॉग डाउनलोड करें (CSV)' : 'Download GeM Bulk Catalog (CSV)')}
            </Text>
          </Pressable>
        </View>

        {/* WhatsApp Direct Commerce */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconPill, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>WhatsApp Business Direct</Text>
              <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>
                {hi
                  ? 'शिल्प समागम, मेलों और प्रदर्शनी के ग्राहकों को एक क्लिक में भेजें'
                  : 'Share ready-to-buy bilingual product pitch directly with buyers'}
              </Text>
            </View>
          </View>
          <Pressable style={[styles.waBtn, { backgroundColor: '#25D366' }]} onPress={shareCatalogOnWhatsApp}>
            <Ionicons name="share-social-outline" size={18} color="#ffffff" />
            <Text style={styles.waBtnText}>{hi ? 'व्हाट्सएप पर कैटलॉग साझा करें' : 'Share Catalog on WhatsApp'}</Text>
          </Pressable>
        </View>

        {/* Exhibition & Physical Fair QR Pass */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconPill, { backgroundColor: '#ede7f6' }]}>
              <Ionicons name="qr-code-outline" size={20} color="#512da8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                {hi ? 'प्रदर्शनी स्टॉल QR पास' : 'Exhibition Stall QR Pass'}
              </Text>
              <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>
                {hi
                  ? 'सूरजकुंड मेला, दिल्ली हाट, शिल्प समागम में आगंतुक सीधे स्कैन कर सकते हैं'
                  : 'Visitors scan your stall QR code to view listings and order year-round'}
              </Text>
            </View>
          </View>
          <View style={[styles.qrContainer, { backgroundColor: colors.secondary }]}>
            <Ionicons name="qr-code" size={110} color={colors.foreground} />
            <Text style={[styles.qrLabel, { color: colors.mutedForeground }]}>
              ID: MOSJE-ARTISAN-RJ-8842
            </Text>
            <Text style={[styles.qrSub, { color: colors.primary }]}>
              {hi ? 'स्मार्ट इंडिया हैकथॉन प्रमाणित' : 'Smart India Hackathon Certified'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 16 },
  header: { gap: 6, marginBottom: 4 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Inter_700Bold' },
  title: { fontSize: 28, lineHeight: 33, fontFamily: 'Inter_700Bold' },
  subtitle: { fontSize: 13, lineHeight: 18, fontFamily: 'Inter_400Regular' },
  card: { borderWidth: 1, borderRadius: 20, padding: 16, gap: 14 },
  cardHeader: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  iconPill: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  cardSub: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#e8f5e9', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#2e7d32' },
  activeText: { fontSize: 10, fontFamily: 'Inter_700Bold', color: '#2e7d32' },
  divider: { height: 1 },
  statGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 2 },
  outlineBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 12, borderWidth: 1 },
  outlineBtnText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  codeBox: { borderRadius: 12, padding: 12, overflow: 'hidden' },
  codeText: { color: '#81c784', fontSize: 11, fontFamily: 'monospace', lineHeight: 16 },
  featureList: { gap: 8 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 48, borderRadius: 14 },
  primaryBtnText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  waBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 48, borderRadius: 14 },
  waBtnText: { color: '#ffffff', fontSize: 13, fontFamily: 'Inter_700Bold' },
  qrContainer: { alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 16, gap: 6 },
  qrLabel: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  qrSub: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
});
