import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useArtisan } from '@/context/ArtisanContext';

export default function InventoryScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { products } = useArtisan();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All items');
  const filtered = useMemo(() => products.filter((product) => {
    const term = search.toLowerCase();
    return (product.name.toLowerCase().includes(term) || product.craft.toLowerCase().includes(term)) && (filter === 'All items' || product.status === filter);
  }), [filter, products, search]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 30 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View><Text style={[styles.eyebrow, { color: colors.primary }]}>MY CATALOG</Text><Text style={[styles.title, { color: colors.foreground }]}>Your products</Text></View>
          <Pressable testID="add-product" style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={() => router.push('/create')}><Feather name="plus" size={20} color={colors.primaryForeground} /></Pressable>
        </View>
        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={17} color={colors.mutedForeground} />
          <TextInput value={search} onChangeText={setSearch} placeholder="Search your products" placeholderTextColor={colors.mutedForeground} style={[styles.searchInput, { color: colors.foreground }]} />
          {search.length > 0 && <Pressable onPress={() => setSearch('')}><Ionicons name="close-circle" size={18} color={colors.mutedForeground} /></Pressable>}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {['All items', 'Published', 'Draft'].map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.chip, { borderColor: colors.border, backgroundColor: filter === item ? colors.indigo : colors.card }]}><Text style={[styles.chipText, { color: filter === item ? colors.primaryForeground : colors.mutedForeground }]}>{item}</Text></Pressable>)}
        </ScrollView>
        <View style={styles.catalogHeader}><Text style={[styles.count, { color: colors.mutedForeground }]}>{filtered.length} {filtered.length === 1 ? 'item' : 'items'}</Text><Text style={[styles.aiNote, { color: colors.sage }]}><Ionicons name="sparkles" size={12} color={colors.sage} /> AI-ready catalog</Text></View>
        <View style={styles.list}>
          {filtered.map((product) => <Pressable key={product.id} style={[styles.item, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}>
            <Image source={product.image} style={styles.itemImage} />
            <View style={styles.itemInfo}><View style={styles.itemTopline}><Text style={[styles.itemName, { color: colors.foreground }]} numberOfLines={2}>{product.name}</Text><Feather name="chevron-right" size={18} color={colors.mutedForeground} /></View><Text style={[styles.itemCraft, { color: colors.mutedForeground }]}>{product.craft}</Text><View style={styles.itemBottom}><Text style={[styles.itemPrice, { color: colors.primary }]}>₹{product.price.toLocaleString('en-IN')}</Text><View style={[styles.status, { backgroundColor: product.status === 'Published' ? '#e9efe6' : colors.secondary }]}><View style={[styles.statusDot, { backgroundColor: product.status === 'Published' ? colors.success : colors.accent }]} /><Text style={[styles.statusText, { color: colors.mutedForeground }]}>{product.status}</Text></View></View></View>
          </Pressable>)}
          {filtered.length === 0 && <View style={[styles.empty, { borderColor: colors.border }]}><Feather name="search" size={24} color={colors.mutedForeground} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>No products found</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Try another word or create a new listing.</Text></View>}
        </View>
        <Pressable style={[styles.bottomCta, { backgroundColor: colors.secondary }]} onPress={() => router.push('/create')}><View style={[styles.bottomCtaIcon, { backgroundColor: colors.primary }]}><Ionicons name="sparkles" size={16} color={colors.primaryForeground} /></View><View style={{ flex: 1 }}><Text style={[styles.bottomCtaTitle, { color: colors.foreground }]}>Add another product</Text><Text style={[styles.bottomCtaText, { color: colors.mutedForeground }]}>Let AI help with the hard parts</Text></View><Feather name="arrow-up-right" size={17} color={colors.primary} /></Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 20, gap: 18 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, eyebrow: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Inter_700Bold' }, title: { fontSize: 28, fontFamily: 'Inter_700Bold', marginTop: 7 }, addButton: { width: 42, height: 42, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }, searchBox: { height: 48, borderWidth: 1, borderRadius: 15, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 }, searchInput: { flex: 1, fontSize: 13, fontFamily: 'Inter_400Regular' }, chips: { gap: 8 }, chip: { borderWidth: 1, borderRadius: 22, paddingHorizontal: 15, paddingVertical: 9 }, chipText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' }, catalogHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, count: { fontSize: 12, fontFamily: 'Inter_400Regular' }, aiNote: { fontSize: 11, fontFamily: 'Inter_600SemiBold' }, list: { gap: 10 }, item: { borderWidth: 1, borderRadius: 18, padding: 9, flexDirection: 'row', gap: 12 }, itemImage: { width: 94, height: 106, borderRadius: 12 }, itemInfo: { flex: 1, paddingVertical: 2 }, itemTopline: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }, itemName: { fontSize: 14, lineHeight: 19, fontFamily: 'Inter_700Bold', flex: 1 }, itemCraft: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 5 }, itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }, itemPrice: { fontSize: 15, fontFamily: 'Inter_700Bold' }, status: { borderRadius: 12, paddingVertical: 5, paddingHorizontal: 8, flexDirection: 'row', gap: 5, alignItems: 'center' }, statusDot: { width: 5, height: 5, borderRadius: 3 }, statusText: { fontSize: 9, fontFamily: 'Inter_600SemiBold' }, empty: { borderWidth: 1, borderStyle: 'dashed', borderRadius: 18, padding: 30, alignItems: 'center', gap: 8 }, emptyTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', marginTop: 4 }, emptyText: { fontSize: 12, textAlign: 'center', fontFamily: 'Inter_400Regular' }, bottomCta: { borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }, bottomCtaIcon: { width: 33, height: 33, borderRadius: 11, alignItems: 'center', justifyContent: 'center' }, bottomCtaTitle: { fontSize: 12, fontFamily: 'Inter_700Bold' }, bottomCtaText: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 3 },
});