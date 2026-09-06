import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useArtisan } from '@/context/ArtisanContext';

export default function ReceiptsScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { receipts } = useArtisan();

  const downloadReceipt = async (receipt: typeof receipts[number]) => {
    try {
      const file = await Print.printToFileAsync({
        html: `<html><body style="font-family:Arial;padding:32px;color:#1c1c1a"><h1>Artisan Market</h1><p>Payment receipt</p><hr/><h2>${receipt.productName}</h2><p>Amount paid: ₹${receipt.amount.toLocaleString('en-IN')}</p><p>Status: ${receipt.status}</p><p>Created: ${receipt.createdAt}</p><p>Thank you for supporting independent artisans.</p></body></html>`,
      });
      if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(file.uri, { dialogTitle: 'Download receipt PDF' });
      else Alert.alert('Receipt ready', file.uri);
    } catch {
      Alert.alert('Could not create receipt', 'Please try again.');
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 28 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}><Pressable onPress={() => router.back()}><Feather name="arrow-left" size={21} color={colors.foreground} /></Pressable><Text style={[styles.title, { color: colors.foreground }]}>Receipts & downloads</Text><View style={{ width: 21 }} /></View>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Your Shopify checkout receipts stay here for easy sharing and download.</Text>
        {receipts.length === 0 ? <View style={[styles.empty, { borderColor: colors.border }]}><Ionicons name="document-text-outline" size={28} color={colors.mutedForeground} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>No receipts yet</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Complete a checkout and your receipt will appear here.</Text></View> : receipts.map((receipt) => <View key={receipt.id} style={[styles.receipt, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.receiptIcon, { backgroundColor: colors.secondary }]}><Ionicons name="receipt-outline" size={19} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.productName, { color: colors.foreground }]} numberOfLines={2}>{receipt.productName}</Text><Text style={[styles.meta, { color: colors.mutedForeground }]}>₹{receipt.amount.toLocaleString('en-IN')} · {receipt.status}</Text><Text style={[styles.date, { color: colors.mutedForeground }]}>{receipt.createdAt}</Text></View><Pressable style={[styles.download, { backgroundColor: colors.indigo }]} onPress={() => { void downloadReceipt(receipt); }}><Feather name="download" size={16} color={colors.primaryForeground} /></Pressable></View>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 20, gap: 16 }, topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, title: { fontSize: 20, fontFamily: 'Inter_700Bold' }, subtitle: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' }, empty: { borderWidth: 1, borderStyle: 'dashed', borderRadius: 18, padding: 30, alignItems: 'center', gap: 8, marginTop: 20 }, emptyTitle: { fontSize: 15, fontFamily: 'Inter_700Bold' }, emptyText: { fontSize: 12, lineHeight: 17, textAlign: 'center', fontFamily: 'Inter_400Regular' }, receipt: { borderWidth: 1, borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 }, receiptIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, productName: { fontSize: 12, fontFamily: 'Inter_700Bold' }, meta: { fontSize: 10, fontFamily: 'Inter_600SemiBold', marginTop: 5 }, date: { fontSize: 9, fontFamily: 'Inter_400Regular', marginTop: 3 }, download: { width: 35, height: 35, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
});