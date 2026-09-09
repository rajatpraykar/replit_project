import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useArtisan } from '@/context/ArtisanContext';
import { getApiBaseUrl } from '@/constants/api';

interface AnalyticsData {
  metrics: {
    totalProducts: number;
    totalInventoryValue: number;
    totalViews: number;
    totalInquiries: number;
    b2bPipelineValue: number;
    averageFairWagePerHour: number;
    statutoryMinimumWage: number;
    fairWagePremiumPercent: number;
    ondcReadinessScore: number;
    digitalLiteracyAssistLevel: string;
  };
  governmentSchemeEligibility: Array<{
    schemeCode: string;
    schemeName: string;
    ministry: string;
    status: string;
    benefit: string;
    actionRequired: string;
  }>;
  socialImpactStatement: string;
}

export default function AnalyticsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { products, language } = useArtisan();
  const hi = language === 'hi';
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/analytics`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // offline fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAnalytics();
  }, [products.length]);

  const totalValue = products.reduce((acc, p) => acc + p.price, 0);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>
            {hi ? 'सामाजिक एवं आर्थिक प्रभाव' : 'SOCIO-ECONOMIC IMPACT & SCHEMES'}
          </Text>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {hi ? 'प्रभाव एवं सरकारी योजनाएं' : 'Impact & Scheme Hub'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {hi
              ? 'सामाजिक न्याय और अधिकारिता मंत्रालय (MoSJE) प्रभाव रिपोर्ट और पात्रता'
              : 'Ministry of Social Justice & Empowerment impact telemetry and welfare scheme linkage'}
          </Text>
        </View>

        {/* Top Metric Cards */}
        <View style={styles.metricRow}>
          <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.metricIconBox, { backgroundColor: '#e3f2fd' }]}>
              <Ionicons name="trending-up" size={18} color="#1565c0" />
            </View>
            <Text style={[styles.metricNumber, { color: colors.foreground }]}>
              +{(data?.metrics.fairWagePremiumPercent ?? 250)}%
            </Text>
            <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
              {hi ? 'उचित मजदूरी प्रीमियम' : 'Fair Wage Premium'}
            </Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.metricIconBox, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="shield-checkmark" size={18} color="#2e7d32" />
            </View>
            <Text style={[styles.metricNumber, { color: colors.success }]}>
              {(data?.metrics.ondcReadinessScore ?? 98)}%
            </Text>
            <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
              {hi ? 'डिजिटल तैयारी स्कोर' : 'ONDC Readiness'}
            </Text>
          </View>
        </View>

        {/* Wage Comparison Chart Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardTitleRow}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>
              {hi ? 'मजदूरी सशक्तिकरण तुलना' : 'Artisan Fair-Wage Realization'}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>MoSJE Standard</Text>
            </View>
          </View>
          <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>
            {hi
              ? 'बिचौलियों के बिना प्रत्यक्ष डिजिटल बिक्री से प्राप्त प्रति घंटा आय:'
              : 'Hourly income realized through direct digital listings vs statutory baseline:'}
          </Text>

          {/* Bar 1: State Minimum Wage */}
          <View style={styles.barGroup}>
            <View style={styles.barHeader}>
              <Text style={[styles.barLabel, { color: colors.mutedForeground }]}>
                {hi ? 'वैधानिक न्यूनतम मजदूरी (State Minimum)' : 'Statutory Minimum Wage'}
              </Text>
              <Text style={[styles.barValue, { color: colors.mutedForeground }]}>₹32 / hr</Text>
            </View>
            <View style={[styles.barTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.barFill, { width: '28%', backgroundColor: colors.mutedForeground }]} />
            </View>
          </View>

          {/* Bar 2: Fair-Trade App Rate */}
          <View style={styles.barGroup}>
            <View style={styles.barHeader}>
              <Text style={[styles.barLabel, { color: colors.primary, fontFamily: 'Inter_700Bold' }]}>
                {hi ? 'ऐप द्वारा सुरक्षित उचित पारिश्रमिक' : 'App-Secured Fair-Trade Wage'}
              </Text>
              <Text style={[styles.barValue, { color: colors.primary, fontFamily: 'Inter_700Bold' }]}>₹112 / hr</Text>
            </View>
            <View style={[styles.barTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.barFill, { width: '92%', backgroundColor: colors.primary }]} />
            </View>
          </View>
        </View>

        {/* Government Welfare & Credit Scheme Eligibility */}
        <View style={styles.sectionHeading}>
          <Ionicons name="ribbon-outline" size={18} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            {hi ? 'सरकारी योजना पात्रता (MoSJE & MSME)' : 'Government Schemes Eligibility'}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginVertical: 20 }} />
        ) : (
          (data?.governmentSchemeEligibility ?? []).map((scheme) => (
            <View key={scheme.schemeCode} style={[styles.schemeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.schemeHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.schemeName, { color: colors.foreground }]}>{scheme.schemeName}</Text>
                  <Text style={[styles.schemeMinistry, { color: colors.mutedForeground }]}>{scheme.ministry}</Text>
                </View>
                <View style={[styles.eligibleBadge, { backgroundColor: scheme.status === 'ACTIVE' ? '#e8f5e9' : '#e3f2fd' }]}>
                  <Text style={[styles.eligibleText, { color: scheme.status === 'ACTIVE' ? '#2e7d32' : '#1565c0' }]}>
                    {scheme.status}
                  </Text>
                </View>
              </View>
              <Text style={[styles.schemeBenefit, { color: colors.foreground }]}>{scheme.benefit}</Text>
              <View style={[styles.schemeFooter, { borderTopColor: colors.border }]}>
                <Feather name="arrow-right-circle" size={14} color={colors.primary} />
                <Text style={[styles.schemeAction, { color: colors.primary }]}>{scheme.actionRequired}</Text>
              </View>
            </View>
          ))
        )}

        {/* Social Impact Quote Card */}
        <View style={[styles.impactCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <Ionicons name="sparkles" size={20} color={colors.primary} />
          <Text style={[styles.impactQuote, { color: colors.foreground }]}>
            "{data?.socialImpactStatement ?? 'Giving 70 lakh traditional artisans a voice, a digital identity, and fair wages.'}"
          </Text>
          <Text style={[styles.impactSub, { color: colors.mutedForeground }]}>
            Smart India Hackathon 2024–2026 • MoSJE Problem Statement 26090
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 15 },
  header: { gap: 6, marginBottom: 4 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Inter_700Bold' },
  title: { fontSize: 28, lineHeight: 33, fontFamily: 'Inter_700Bold' },
  subtitle: { fontSize: 13, lineHeight: 18, fontFamily: 'Inter_400Regular' },
  metricRow: { flexDirection: 'row', gap: 12 },
  metricCard: { flex: 1, borderWidth: 1, borderRadius: 18, padding: 14, gap: 6 },
  metricIconBox: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  metricNumber: { fontSize: 24, fontFamily: 'Inter_700Bold' },
  metricLabel: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  card: { borderWidth: 1, borderRadius: 20, padding: 16, gap: 12 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  cardDesc: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  statusBadge: { backgroundColor: '#e8f5e9', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  statusBadgeText: { fontSize: 10, fontFamily: 'Inter_700Bold', color: '#2e7d32' },
  barGroup: { gap: 6, marginTop: 4 },
  barHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  barLabel: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  barValue: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  barTrack: { height: 10, borderRadius: 5, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 5 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  schemeCard: { borderWidth: 1, borderRadius: 18, padding: 14, gap: 10 },
  schemeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  schemeName: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  schemeMinistry: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 2 },
  eligibleBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  eligibleText: { fontSize: 10, fontFamily: 'Inter_700Bold' },
  schemeBenefit: { fontSize: 12, lineHeight: 17, fontFamily: 'Inter_500Medium' },
  schemeFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 8, borderTopWidth: 1 },
  schemeAction: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  impactCard: { borderWidth: 1, borderRadius: 20, padding: 16, gap: 10, alignItems: 'center', textAlign: 'center' },
  impactQuote: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  impactSub: { fontSize: 10, fontFamily: 'Inter_500Medium' },
});
