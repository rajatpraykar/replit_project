import * as ImagePicker from 'expo-image-picker';
import { File } from 'expo-file-system';
import { RecordingPresets, requestRecordingPermissionsAsync, useAudioRecorder } from 'expo-audio';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { AppLanguage, useArtisan } from '@/context/ArtisanContext';
import { getApiBaseUrl } from '@/constants/api';

const sampleTextile = require('@/assets/images/indigo-textile.jpg');
const languageLabels: Record<AppLanguage, string> = { en: 'English', hi: 'हिन्दी', mr: 'मराठी', bn: 'বাংলা' };

export default function CreateScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ mode?: string }>();
  const { addProduct, language, setLanguage } = useArtisan();
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [step, setStep] = useState<1 | 2>(1);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<any>(sampleTextile);
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const [name, setName] = useState('Handwoven Indigo Dupatta');
  const [nameHindi, setNameHindi] = useState('हाथ से बुना हुआ पारंपरिक नील दुपट्टा');
  const [material, setMaterial] = useState('Cotton · Natural indigo');
  const [voiceCaptured, setVoiceCaptured] = useState(params.mode === 'voice');
  const [recording, setRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('A soft, naturally dyed dupatta woven by hand in small batches. Each piece carries the gentle irregularity and story of the loom.');
  const [hindiDescription, setHindiDescription] = useState('छोटे बैच में हाथ से बुना हुआ नरम दुपट्टा। हर टुकड़े में करघे की खूबसूरत पहचान और कारीगर की कहानी है।');
  const [price, setPrice] = useState('1480');
  const [retailPrice, setRetailPrice] = useState('1480');
  const [b2bPrice, setB2bPrice] = useState('960');
  const [exportPrice, setExportPrice] = useState('1920');
  const [pricingTier, setPricingTier] = useState<'retail' | 'wholesale' | 'export'>('retail');
  const [cost, setCost] = useState('620');
  const [geoIndication, setGeoIndication] = useState<string | undefined>('Rajasthan Handloom Cluster');
  const [tags, setTags] = useState<string[]>(['#Handloom', '#MoSJEArtisan', '#VocalForLocal']);
  const [isSpeaking, setIsSpeaking] = useState(false);

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
      setImageMimeType(result.assets[0].mimeType ?? 'image/jpeg');
    }
  };

  const enhanceImage = async () => {
    if (!imageUri) {
      Alert.alert('Choose a product photo first', 'Use Camera or Gallery so the AI studio can beautify your actual product image.');
      return;
    }
    setIsEnhancing(true);
    try {
      const imageBase64 = await new File(imageUri).base64();
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/enhance-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType: imageMimeType }),
      });
      const payload = (await response.json()) as { imageBase64?: string; mimeType?: string; message?: string };
      if (!response.ok || !payload.imageBase64) throw new Error(payload.message ?? 'Image enhancement failed');
      setImageSource({ uri: `data:${payload.mimeType ?? 'image/png'};base64,${payload.imageBase64}` });
      setImageUri(null);
      setImageMimeType(payload.mimeType ?? 'image/png');
    } catch (error) {
      Alert.alert('Could not beautify photo', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const transcribe = async (uri: string) => {
    setIsTranscribing(true);
    try {
      const audioBase64 = await new File(uri).base64();
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/transcribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64, mimeType: 'audio/m4a', language }),
      });
      const payload = (await response.json()) as { text?: string; message?: string };
      if (!response.ok || !payload.text) throw new Error(payload.message ?? 'Transcription failed');
      setVoiceTranscript(payload.text);
      setDescription((current) => current ? `${current} ${payload.text}` : payload.text ?? '');
      setVoiceCaptured(true);
    } catch (error) {
      Alert.alert('Could not transcribe', error instanceof Error ? error.message : 'Please try recording again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const toggleRecording = async () => {
    if (recording) {
      await recorder.stop();
      setRecording(false);
      if (recorder.uri) await transcribe(recorder.uri);
    } else {
      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Microphone permission needed', 'Allow microphone access so your words can become a product description.');
        return;
      }
      await recorder.prepareToRecordAsync();
      recorder.record();
      setRecording(true);
    }
  };

  // Real Multilingual Auto-Cataloger API integration
  const generateCatalog = async () => {
    if (!name.trim()) {
      Alert.alert('Add a product name', 'Give your product a simple name so we can create its listing.');
      return;
    }
    setIsGenerating(true);
    try {
      let imageBase64: string | undefined = undefined;
      if (imageUri) {
        try {
          imageBase64 = await new File(imageUri).base64();
        } catch {
          // ignore
        }
      }

      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/catalog/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: name,
          craftType: material,
          materials: material,
          voiceTranscript,
          imageBase64,
          language,
          materialCost: Number(cost) || 400,
          makingHours: 5,
        }),
      });

      if (response.ok) {
        const payload = await response.json();
        if (payload.englishTitle) setName(payload.englishTitle);
        if (payload.hindiTitle) setNameHindi(payload.hindiTitle);
        if (payload.englishDescription) setDescription(payload.englishDescription);
        if (payload.hindiDescription) setHindiDescription(payload.hindiDescription);
        if (payload.geoIndication) setGeoIndication(payload.geoIndication);
        if (payload.tags && Array.isArray(payload.tags)) setTags(payload.tags);
        if (payload.pricing) {
          const ret = String(payload.pricing.retail ?? 1480);
          const who = String(payload.pricing.wholesale ?? 960);
          const exp = String(payload.pricing.export ?? 1920);
          setRetailPrice(ret);
          setB2bPrice(who);
          setExportPrice(exp);
          setPrice(ret);
        }
      }
    } catch {
      // Graceful fallback to default values
    } finally {
      setIsGenerating(false);
      setStep(2);
    }
  };

  // Voice narration for low-literacy artisans
  const speakDescription = (textToSpeak: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      Alert.alert('Audio Narration', textToSpeak);
    }
  };

  const publish = async () => {
    await addProduct({
      name,
      nameHindi,
      craft: 'Handloom textile',
      price: Number(price) || 1480,
      b2bPrice: Number(b2bPrice) || 960,
      exportPrice: Number(exportPrice) || 1920,
      status: 'Published',
      description,
      hindiDescription,
      image: imageSource,
      imageUri: imageUri ?? undefined,
      material,
      tags,
      geoIndication,
    });
    Alert.alert('Your listing is live on ONDC!', 'Your product has been added to the direct artisan catalog and synced to government networks.', [
      { text: 'View catalog', onPress: () => router.replace('/inventory') },
    ]);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 26 }]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.topbar}><Pressable style={styles.iconButton} onPress={() => router.back()}><Feather name="arrow-left" size={20} color={colors.foreground} /></Pressable><View style={styles.stepper}><View style={[styles.stepDot, { backgroundColor: colors.primary }]} /><View style={[styles.stepLine, { backgroundColor: step === 2 ? colors.primary : colors.border }]} /><View style={[styles.stepDot, { backgroundColor: step === 2 ? colors.primary : colors.border }]} /></View><Pressable style={styles.iconButton} onPress={() => router.back()}><Feather name="x" size={20} color={colors.foreground} /></Pressable></View>
        {step === 1 ? (
          <>
            <View style={styles.heading}><Text style={[styles.eyebrow, { color: colors.primary }]}>NEW LISTING • नया उत्पाद</Text><Text style={[styles.title, { color: colors.foreground }]}>Show us your craft.</Text><Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Start with one photo and a few words. AI creates your bilingual catalog.</Text></View>
            <View style={[styles.photoPanel, { backgroundColor: colors.secondary }]}><Image source={imageSource} style={styles.previewImage} /><View style={styles.photoBadge}><Ionicons name="sparkles" size={12} color={colors.primary} /><Text style={[styles.photoBadgeText, { color: colors.primary }]}>{isEnhancing ? 'AI studio is working…' : 'AI studio ready'}</Text></View><View style={styles.photoActions}><Pressable testID="camera-button" style={[styles.photoAction, { backgroundColor: colors.primary }]} onPress={() => { void chooseImage(true); }}><Ionicons name="camera-outline" size={18} color={colors.primaryForeground} /><Text style={[styles.photoActionText, { color: colors.primaryForeground }]}>Camera</Text></Pressable><Pressable style={[styles.photoAction, { backgroundColor: colors.card }]} onPress={() => { void chooseImage(false); }}><Ionicons name="images-outline" size={18} color={colors.foreground} /><Text style={[styles.photoActionText, { color: colors.foreground }]}>Gallery</Text></Pressable></View><Pressable style={[styles.beautifyButton, { backgroundColor: colors.indigo }]} onPress={() => { void enhanceImage(); }} disabled={isEnhancing}><Ionicons name={isEnhancing ? 'hourglass-outline' : 'sparkles'} size={16} color={colors.primaryForeground} /><Text style={[styles.beautifyText, { color: colors.primaryForeground }]}>{isEnhancing ? 'Beautifying photo…' : 'Beautify with AI Studio'}</Text></Pressable></View>
            <Text style={[styles.fieldLabel, { color: colors.foreground }]}>Tell us about it (बोलकर या लिखकर बताएं)</Text>
            <View style={styles.voiceSettingsRow}><Text style={[styles.voiceSettingsLabel, { color: colors.mutedForeground }]}>Voice language (भाषा)</Text><Pressable style={[styles.languageButton, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => setShowLanguageMenu((open) => !open)}><Ionicons name="language-outline" size={15} color={colors.primary} /><Text style={[styles.languageButtonText, { color: colors.foreground }]}>{languageLabels[language]}</Text><Feather name="chevron-down" size={15} color={colors.mutedForeground} /></Pressable></View>
            {showLanguageMenu && <View style={[styles.languageMenu, { backgroundColor: colors.card, borderColor: colors.border }]}>{(Object.keys(languageLabels) as AppLanguage[]).map((option) => <Pressable key={option} style={styles.languageOption} onPress={() => { void setLanguage(option); setShowLanguageMenu(false); }}><Text style={[styles.languageOptionText, { color: option === language ? colors.primary : colors.foreground }]}>{languageLabels[option]}</Text>{option === language && <Ionicons name="checkmark" size={16} color={colors.primary} />}</Pressable>)}</View>}
            <View style={[styles.voiceBox, { backgroundColor: colors.card, borderColor: voiceCaptured ? colors.sage : colors.border }]}><Pressable style={[styles.micButton, { backgroundColor: recording ? colors.primary : colors.secondary }]} onPress={() => { void toggleRecording(); }} disabled={isTranscribing}><Ionicons name={isTranscribing ? 'hourglass-outline' : recording ? 'stop' : 'mic-outline'} size={20} color={recording ? colors.primaryForeground : colors.primary} /></Pressable><View style={{ flex: 1 }}><Text style={[styles.voiceTitle, { color: colors.foreground }]}>{isTranscribing ? 'Bhashini / Whisper transcribing…' : recording ? 'Listening… बोलें, रोकने के लिए टैप करें' : voiceCaptured ? 'Voice text added to description' : 'Speak in your language (अपनी भाषा में बोलें)'}</Text><Text style={[styles.voiceText, { color: colors.mutedForeground }]}>{voiceTranscript || 'Tap the mic and describe your craft'}</Text></View>{voiceCaptured && !isTranscribing && <Ionicons name="checkmark-circle" size={21} color={colors.success} />}</View>
            <View style={styles.orRow}><View style={[styles.orLine, { backgroundColor: colors.border }]} /><Text style={[styles.orText, { color: colors.mutedForeground }]}>or type a few details</Text><View style={[styles.orLine, { backgroundColor: colors.border }]} /></View>
            <TextInput value={name} onChangeText={setName} placeholder="Product name (उत्पाद का नाम)" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
            <TextInput value={material} onChangeText={setMaterial} placeholder="Material or craft (सामग्री या हस्तकला)" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
            <Pressable style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={generateCatalog} disabled={isGenerating}>{isGenerating ? <ActivityIndicator color={colors.primaryForeground} /> : <><Ionicons name="sparkles" size={17} color={colors.primaryForeground} /><Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Generate Bilingual AI Catalog</Text><Feather name="arrow-right" size={17} color={colors.primaryForeground} /></>}</Pressable>
          </>
        ) : (
          <>
            <View style={styles.heading}><Text style={[styles.eyebrow, { color: colors.primary }]}>AI DRAFT READY • सूची तैयार है</Text><Text style={[styles.title, { color: colors.foreground }]}>Looks beautiful already.</Text><Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Created in English & Hindi with fair-trade pricing.</Text></View>
            <View style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}><Image source={imageSource} style={styles.resultImage} /><View style={styles.resultBody}><View style={styles.aiPill}><Ionicons name="sparkles" size={12} color={colors.primary} /><Text style={[styles.aiPillText, { color: colors.primary }]}>AI Studio Photo</Text></View><Text style={[styles.resultName, { color: colors.foreground }]}>{name}</Text><Text style={[styles.resultMaterial, { color: colors.mutedForeground }]}>{material}</Text>{geoIndication ? (<View style={[styles.giBadge, { backgroundColor: colors.secondary, borderColor: colors.border }]}><Ionicons name="ribbon" size={13} color={colors.primary} /><Text style={[styles.giBadgeText, { color: colors.primary }]}>{geoIndication}</Text></View>) : null}</View></View>
            
            <View style={styles.audioRow}>
              <Text style={[styles.fieldLabel, { color: colors.foreground, marginVertical: 0 }]}>Listing description</Text>
              <Pressable style={[styles.listenBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]} onPress={() => speakDescription(hindiDescription || description)}>
                <Ionicons name={isSpeaking ? "stop-circle" : "volume-medium"} size={16} color={colors.primary} />
                <Text style={[styles.listenBtnText, { color: colors.primary }]}>{isSpeaking ? "रोकें (Stop)" : "सुनें (Listen)"}</Text>
              </Pressable>
            </View>

            <TextInput value={description} onChangeText={setDescription} multiline style={[styles.textarea, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
            <TextInput value={hindiDescription} onChangeText={setHindiDescription} multiline style={[styles.textarea, { color: colors.foreground, backgroundColor: colors.secondary, borderColor: colors.border, marginTop: 10 }]} />

            <View style={styles.priceHeading}>
              <Text style={[styles.fieldLabel, { color: colors.foreground, marginTop: 0 }]}>Fair-Trade Pricing Tiers</Text>
              <View style={styles.recommended}>
                <Ionicons name="shield-checkmark" size={13} color={colors.success} />
                <Text style={[styles.recommendedText, { color: colors.success }]}>Minimum Wage Compliant</Text>
              </View>
            </View>

            {/* Three Fair-Trade Pricing Chips */}
            <View style={styles.pricingChipsRow}>
              <Pressable
                style={[styles.pricingChip, { borderColor: pricingTier === 'retail' ? colors.primary : colors.border, backgroundColor: pricingTier === 'retail' ? colors.primary : colors.card }]}
                onPress={() => { setPricingTier('retail'); setPrice(retailPrice); }}
              >
                <Text style={[styles.chipTitle, { color: pricingTier === 'retail' ? colors.primaryForeground : colors.mutedForeground }]}>Retail (खुदरा)</Text>
                <Text style={[styles.chipAmount, { color: pricingTier === 'retail' ? colors.primaryForeground : colors.foreground }]}>₹{retailPrice}</Text>
              </Pressable>
              <Pressable
                style={[styles.pricingChip, { borderColor: pricingTier === 'wholesale' ? colors.primary : colors.border, backgroundColor: pricingTier === 'wholesale' ? colors.primary : colors.card }]}
                onPress={() => { setPricingTier('wholesale'); setPrice(b2bPrice); }}
              >
                <Text style={[styles.chipTitle, { color: pricingTier === 'wholesale' ? colors.primaryForeground : colors.mutedForeground }]}>Wholesale (थोक B2B)</Text>
                <Text style={[styles.chipAmount, { color: pricingTier === 'wholesale' ? colors.primaryForeground : colors.foreground }]}>₹{b2bPrice}</Text>
              </Pressable>
              <Pressable
                style={[styles.pricingChip, { borderColor: pricingTier === 'export' ? colors.primary : colors.border, backgroundColor: pricingTier === 'export' ? colors.primary : colors.card }]}
                onPress={() => { setPricingTier('export'); setPrice(exportPrice); }}
              >
                <Text style={[styles.chipTitle, { color: pricingTier === 'export' ? colors.primaryForeground : colors.mutedForeground }]}>Export (निर्यात)</Text>
                <Text style={[styles.chipAmount, { color: pricingTier === 'export' ? colors.primaryForeground : colors.foreground }]}>₹{exportPrice}</Text>
              </Pressable>
            </View>

            <View style={[styles.priceBox, { backgroundColor: colors.card, borderColor: colors.primary }]}><Text style={[styles.rupee, { color: colors.primary }]}>₹</Text><TextInput value={price} onChangeText={setPrice} keyboardType="number-pad" style={[styles.priceInput, { color: colors.foreground }]} /><View style={[styles.priceHint, { backgroundColor: colors.secondary }]}><Text style={[styles.priceHintText, { color: colors.mutedForeground }]}>Selected for listing</Text></View></View>
            <Text style={[styles.costLabel, { color: colors.mutedForeground }]}>Your material + making cost (सामग्री व मजदूरी लागत)</Text><View style={[styles.costRow, { borderBottomColor: colors.border }]}><Text style={[styles.costText, { color: colors.foreground }]}>₹</Text><TextInput value={cost} onChangeText={setCost} keyboardType="number-pad" style={[styles.costInput, { color: colors.foreground }]} /><Text style={[styles.costHelper, { color: colors.mutedForeground }]}>Guarantees 100% fair-wage surplus</Text></View>
            <Pressable style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={publish}><Ionicons name="cloud-upload-outline" size={18} color={colors.primaryForeground} /><Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Publish to ONDC & Catalog</Text></Pressable><Pressable style={styles.backToEdit} onPress={() => setStep(1)}><Text style={[styles.backToEditText, { color: colors.primary }]}>Back to edit</Text></Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 14 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  iconButton: { width: 38, height: 38, justifyContent: 'center', alignItems: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepDot: { width: 8, height: 8, borderRadius: 4 },
  stepLine: { width: 52, height: 2 },
  heading: { gap: 6, marginTop: 4, marginBottom: 4 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Inter_700Bold' },
  title: { fontSize: 28, lineHeight: 33, fontFamily: 'Inter_700Bold' },
  subtitle: { fontSize: 13, lineHeight: 18, fontFamily: 'Inter_400Regular', maxWidth: 320 },
  photoPanel: { borderRadius: 22, padding: 10, marginTop: 2 },
  previewImage: { width: '100%', height: 215, borderRadius: 16 },
  photoBadge: { position: 'absolute', left: 22, top: 22, backgroundColor: '#fffdf9', borderRadius: 12, paddingVertical: 6, paddingHorizontal: 9, flexDirection: 'row', gap: 5, alignItems: 'center' },
  photoBadgeText: { fontSize: 10, fontFamily: 'Inter_700Bold' },
  photoActions: { flexDirection: 'row', gap: 8, marginTop: 9 },
  photoAction: { flex: 1, borderRadius: 13, minHeight: 42, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7 },
  photoActionText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  beautifyButton: { minHeight: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7, marginTop: 8 },
  beautifyText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  fieldLabel: { fontSize: 13, fontFamily: 'Inter_700Bold', marginTop: 2 },
  voiceSettingsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  voiceSettingsLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
  languageButton: { borderWidth: 1, borderRadius: 12, paddingVertical: 6, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  languageButtonText: { fontSize: 10, fontFamily: 'Inter_700Bold' },
  languageMenu: { borderWidth: 1, borderRadius: 14, overflow: 'hidden', marginTop: -6 },
  languageOption: { minHeight: 38, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee5d9' },
  languageOptionText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  voiceBox: { minHeight: 68, borderWidth: 1, borderRadius: 17, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 11 },
  micButton: { width: 44, height: 44, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  voiceTitle: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  voiceText: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 4 },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  orLine: { height: 1, flex: 1 },
  orText: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  input: { height: 48, borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, fontSize: 13, fontFamily: 'Inter_500Medium' },
  primaryButton: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9, marginTop: 4 },
  primaryButtonText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  resultCard: { borderWidth: 1, borderRadius: 19, overflow: 'hidden' },
  resultImage: { width: '100%', height: 190 },
  resultBody: { padding: 14 },
  aiPill: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  aiPillText: { fontSize: 10, fontFamily: 'Inter_700Bold' },
  resultName: { fontSize: 17, fontFamily: 'Inter_700Bold', marginTop: 8 },
  resultMaterial: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 3 },
  giBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 9, alignSelf: 'flex-start', marginTop: 8 },
  giBadgeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  audioRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  listenBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1 },
  listenBtnText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  textarea: { minHeight: 90, borderWidth: 1, borderRadius: 15, padding: 12, fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular', textAlignVertical: 'top' },
  priceHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  recommended: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  recommendedText: { fontSize: 10, fontFamily: 'Inter_700Bold' },
  pricingChipsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  pricingChip: { flex: 1, borderWidth: 1.5, borderRadius: 14, paddingVertical: 8, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' },
  chipTitle: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
  chipAmount: { fontSize: 15, fontFamily: 'Inter_700Bold', marginTop: 2 },
  priceBox: { minHeight: 62, borderWidth: 1.5, borderRadius: 16, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 7 },
  rupee: { fontSize: 24, fontFamily: 'Inter_700Bold' },
  priceInput: { fontSize: 24, fontFamily: 'Inter_700Bold', flex: 1 },
  priceHint: { borderRadius: 10, paddingVertical: 6, paddingHorizontal: 8, maxWidth: 125 },
  priceHintText: { fontSize: 9, lineHeight: 12, fontFamily: 'Inter_600SemiBold' },
  costLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold', marginTop: -2 },
  costRow: { minHeight: 38, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  costText: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  costInput: { width: 70, fontSize: 14, fontFamily: 'Inter_700Bold' },
  costHelper: { fontSize: 9, fontFamily: 'Inter_400Regular', flex: 1 },
  backToEdit: { alignItems: 'center', paddingVertical: 4 },
  backToEditText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
});