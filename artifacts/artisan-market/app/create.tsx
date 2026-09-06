import * as ImagePicker from 'expo-image-picker';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useArtisan } from '@/context/ArtisanContext';

const sampleTextile = require('@/assets/images/indigo-textile.jpg');

export default function CreateScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ mode?: string }>();
  const { addProduct } = useArtisan();
  const [step, setStep] = useState<1 | 2>(1);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<any>(sampleTextile);
  const [name, setName] = useState('Handwoven Indigo Dupatta');
  const [material, setMaterial] = useState('Cotton · Natural indigo');
  const [voiceCaptured, setVoiceCaptured] = useState(params.mode === 'voice');
  const [recording, setRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('A soft, naturally dyed dupatta woven by hand in small batches. Each piece carries the gentle irregularity and story of the loom.');
  const [hindiDescription, setHindiDescription] = useState('छोटे बैच में हाथ से बुना हुआ नरम दुपट्टा। हर टुकड़े में करघे की खूबसूरत पहचान और कारीगर की कहानी है।');
  const [price, setPrice] = useState('1480');
  const [cost, setCost] = useState('620');

  useEffect(() => {
    if (params.mode === 'voice') setVoiceCaptured(true);
  }, [params.mode]);

  const chooseImage = async (camera: boolean) => {
    const result = camera
      ? await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.9, allowsEditing: true, aspect: [1, 1] })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.9, allowsEditing: true, aspect: [1, 1] });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      setImageSource({ uri: result.assets[0].uri });
    }
  };

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      setVoiceCaptured(true);
    } else {
      setRecording(true);
    }
  };

  const generateCatalog = () => {
    if (!name.trim()) {
      Alert.alert('Add a product name', 'Give your product a simple name so we can create its listing.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => { setIsGenerating(false); setStep(2); }, 700);
  };

  const publish = async () => {
    await addProduct({ name, craft: 'Handloom textile', price: Number(price) || 1480, status: 'Published', description, hindiDescription, image: imageSource, imageUri: imageUri ?? undefined, material });
    Alert.alert('Your listing is live', 'Your product has been added to your catalog.', [{ text: 'View catalog', onPress: () => router.replace('/inventory') }]);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 26 }]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.topbar}><Pressable style={styles.iconButton} onPress={() => router.back()}><Feather name="arrow-left" size={20} color={colors.foreground} /></Pressable><View style={styles.stepper}><View style={[styles.stepDot, { backgroundColor: colors.primary }]} /><View style={[styles.stepLine, { backgroundColor: step === 2 ? colors.primary : colors.border }]} /><View style={[styles.stepDot, { backgroundColor: step === 2 ? colors.primary : colors.border }]} /></View><Pressable style={styles.iconButton} onPress={() => router.back()}><Feather name="x" size={20} color={colors.foreground} /></Pressable></View>
        {step === 1 ? (
          <>
            <View style={styles.heading}><Text style={[styles.eyebrow, { color: colors.primary }]}>NEW LISTING</Text><Text style={[styles.title, { color: colors.foreground }]}>Show us your craft.</Text><Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Start with one photo and a few words. We’ll help shape the rest.</Text></View>
            <View style={[styles.photoPanel, { backgroundColor: colors.secondary }]}><Image source={imageSource} style={styles.previewImage} /><View style={styles.photoBadge}><Ionicons name="sparkles" size={12} color={colors.primary} /><Text style={[styles.photoBadgeText, { color: colors.primary }]}>AI studio ready</Text></View><View style={styles.photoActions}><Pressable testID="camera-button" style={[styles.photoAction, { backgroundColor: colors.primary }]} onPress={() => chooseImage(true)}><Ionicons name="camera-outline" size={18} color={colors.primaryForeground} /><Text style={[styles.photoActionText, { color: colors.primaryForeground }]}>Camera</Text></Pressable><Pressable style={[styles.photoAction, { backgroundColor: colors.card }]} onPress={() => chooseImage(false)}><Ionicons name="images-outline" size={18} color={colors.foreground} /><Text style={[styles.photoActionText, { color: colors.foreground }]}>Gallery</Text></Pressable></View></View>
            <Text style={[styles.fieldLabel, { color: colors.foreground }]}>Tell us about it</Text>
            <View style={[styles.voiceBox, { backgroundColor: colors.card, borderColor: voiceCaptured ? colors.sage : colors.border }]}><Pressable style={[styles.micButton, { backgroundColor: recording ? colors.primary : colors.secondary }]} onPress={toggleRecording}><Ionicons name={recording ? 'stop' : 'mic-outline'} size={20} color={recording ? colors.primaryForeground : colors.primary} /></Pressable><View style={{ flex: 1 }}><Text style={[styles.voiceTitle, { color: colors.foreground }]}>{recording ? 'Listening… tap to stop' : voiceCaptured ? 'Voice note captured' : 'Speak in your language'}</Text><Text style={[styles.voiceText, { color: colors.mutedForeground }]}>{voiceCaptured ? '“नीले रंग का हाथ से बुना हुआ दुपट्टा…”' : 'Tap the mic and describe your product'}</Text></View>{voiceCaptured && <Ionicons name="checkmark-circle" size={21} color={colors.success} />}</View>
            <View style={styles.orRow}><View style={[styles.orLine, { backgroundColor: colors.border }]} /><Text style={[styles.orText, { color: colors.mutedForeground }]}>or type a few details</Text><View style={[styles.orLine, { backgroundColor: colors.border }]} /></View>
            <TextInput value={name} onChangeText={setName} placeholder="Product name" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
            <TextInput value={material} onChangeText={setMaterial} placeholder="Material or craft" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
            <Pressable style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={generateCatalog} disabled={isGenerating}>{isGenerating ? <ActivityIndicator color={colors.primaryForeground} /> : <><Ionicons name="sparkles" size={17} color={colors.primaryForeground} /><Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Create my catalog listing</Text><Feather name="arrow-right" size={17} color={colors.primaryForeground} /></>}</Pressable>
          </>
        ) : (
          <>
            <View style={styles.heading}><Text style={[styles.eyebrow, { color: colors.primary }]}>AI DRAFT READY</Text><Text style={[styles.title, { color: colors.foreground }]}>Looks beautiful already.</Text><Text style={[styles.subtitle, { color: colors.mutedForeground }]}>We created a listing in English and Hindi. Make any changes before publishing.</Text></View>
            <View style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}><Image source={imageSource} style={styles.resultImage} /><View style={styles.resultBody}><View style={styles.aiPill}><Ionicons name="sparkles" size={12} color={colors.primary} /><Text style={[styles.aiPillText, { color: colors.primary }]}>AI enhanced photo</Text></View><Text style={[styles.resultName, { color: colors.foreground }]}>{name}</Text><Text style={[styles.resultMaterial, { color: colors.mutedForeground }]}>{material}</Text></View></View>
            <Text style={[styles.fieldLabel, { color: colors.foreground }]}>Listing description</Text>
            <TextInput value={description} onChangeText={setDescription} multiline style={[styles.textarea, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
            <TextInput value={hindiDescription} onChangeText={setHindiDescription} multiline style={[styles.textarea, { color: colors.foreground, backgroundColor: colors.secondary, borderColor: colors.border, marginTop: 10 }]} />
            <View style={styles.priceHeading}><Text style={[styles.fieldLabel, { color: colors.foreground, marginTop: 0 }]}>Suggested price</Text><View style={styles.recommended}><Ionicons name="trending-up" size={12} color={colors.success} /><Text style={[styles.recommendedText, { color: colors.success }]}>Good margin</Text></View></View>
            <View style={[styles.priceBox, { backgroundColor: colors.card, borderColor: colors.primary }]}><Text style={[styles.rupee, { color: colors.primary }]}>₹</Text><TextInput value={price} onChangeText={setPrice} keyboardType="number-pad" style={[styles.priceInput, { color: colors.foreground }]} /><View style={[styles.priceHint, { backgroundColor: colors.secondary }]}><Text style={[styles.priceHintText, { color: colors.mutedForeground }]}>Market range ₹1,200–1,650</Text></View></View>
            <Text style={[styles.costLabel, { color: colors.mutedForeground }]}>Your material + making cost</Text><View style={[styles.costRow, { borderBottomColor: colors.border }]}><Text style={[styles.costText, { color: colors.foreground }]}>₹</Text><TextInput value={cost} onChangeText={setCost} keyboardType="number-pad" style={[styles.costInput, { color: colors.foreground }]} /><Text style={[styles.costHelper, { color: colors.mutedForeground }]}>We’ll use this to improve future suggestions</Text></View>
            <Pressable style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={publish}><Ionicons name="checkmark-circle-outline" size={18} color={colors.primaryForeground} /><Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Publish this listing</Text></Pressable><Pressable style={styles.backToEdit} onPress={() => setStep(1)}><Text style={[styles.backToEditText, { color: colors.primary }]}>Back to edit</Text></Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { paddingHorizontal: 20, gap: 15 }, topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }, iconButton: { width: 38, height: 38, justifyContent: 'center', alignItems: 'center' }, stepper: { flexDirection: 'row', alignItems: 'center' }, stepDot: { width: 8, height: 8, borderRadius: 4 }, stepLine: { width: 52, height: 2 }, heading: { gap: 8, marginTop: 4, marginBottom: 5 }, eyebrow: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Inter_700Bold' }, title: { fontSize: 29, lineHeight: 34, fontFamily: 'Inter_700Bold' }, subtitle: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_400Regular', maxWidth: 315 }, photoPanel: { borderRadius: 22, padding: 10, marginTop: 3 }, previewImage: { width: '100%', height: 218, borderRadius: 16 }, photoBadge: { position: 'absolute', left: 22, top: 22, backgroundColor: '#fffdf9', borderRadius: 12, paddingVertical: 7, paddingHorizontal: 9, flexDirection: 'row', gap: 5, alignItems: 'center' }, photoBadgeText: { fontSize: 10, fontFamily: 'Inter_700Bold' }, photoActions: { flexDirection: 'row', gap: 8, marginTop: 9 }, photoAction: { flex: 1, borderRadius: 13, minHeight: 42, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7 }, photoActionText: { fontSize: 12, fontFamily: 'Inter_700Bold' }, fieldLabel: { fontSize: 13, fontFamily: 'Inter_700Bold', marginTop: 3 }, voiceBox: { minHeight: 68, borderWidth: 1, borderRadius: 17, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 11 }, micButton: { width: 44, height: 44, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }, voiceTitle: { fontSize: 12, fontFamily: 'Inter_700Bold' }, voiceText: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 5 }, orRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, orLine: { height: 1, flex: 1 }, orText: { fontSize: 10, fontFamily: 'Inter_400Regular' }, input: { height: 48, borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, fontSize: 13, fontFamily: 'Inter_500Medium' }, primaryButton: { minHeight: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9, marginTop: 5 }, primaryButtonText: { fontSize: 13, fontFamily: 'Inter_700Bold' }, resultCard: { borderWidth: 1, borderRadius: 19, overflow: 'hidden' }, resultImage: { width: '100%', height: 190 }, resultBody: { padding: 14 }, aiPill: { flexDirection: 'row', alignItems: 'center', gap: 5 }, aiPillText: { fontSize: 10, fontFamily: 'Inter_700Bold' }, resultName: { fontSize: 17, fontFamily: 'Inter_700Bold', marginTop: 9 }, resultMaterial: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 4 }, textarea: { minHeight: 92, borderWidth: 1, borderRadius: 15, padding: 13, fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular', textAlignVertical: 'top' }, priceHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }, recommended: { flexDirection: 'row', alignItems: 'center', gap: 4 }, recommendedText: { fontSize: 10, fontFamily: 'Inter_700Bold' }, priceBox: { minHeight: 65, borderWidth: 1.5, borderRadius: 16, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 7 }, rupee: { fontSize: 24, fontFamily: 'Inter_700Bold' }, priceInput: { fontSize: 25, fontFamily: 'Inter_700Bold', flex: 1 }, priceHint: { borderRadius: 10, paddingVertical: 7, paddingHorizontal: 8, maxWidth: 125 }, priceHintText: { fontSize: 9, lineHeight: 12, fontFamily: 'Inter_600SemiBold' }, costLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold', marginTop: -2 }, costRow: { minHeight: 39, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }, costText: { fontSize: 15, fontFamily: 'Inter_700Bold' }, costInput: { width: 70, fontSize: 14, fontFamily: 'Inter_700Bold' }, costHelper: { fontSize: 9, fontFamily: 'Inter_400Regular', flex: 1 }, backToEdit: { alignItems: 'center', paddingVertical: 5 }, backToEditText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
});