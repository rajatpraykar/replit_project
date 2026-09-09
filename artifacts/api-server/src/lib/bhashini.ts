/**
 * Bhashini (National Language Translation Mission - Ministry of Electronics & IT, Govt of India)
 * Provides free speech and translation services for 22 scheduled Indian languages.
 */

const BHASHINI_ENDPOINT = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline";

export interface BhashiniConfig {
  apiKey?: string;
  userId?: string;
  pipelineId?: string;
}

export function isBhashiniConfigured(): boolean {
  return Boolean(process.env.BHASHINI_API_KEY && process.env.BHASHINI_USER_ID);
}

/**
 * Transcribe Indian language speech using Bhashini ASR Dhruva API.
 */
export async function bhashiniTranscribe(
  audioBase64: string,
  sourceLanguage: string = "hi",
): Promise<string | null> {
  const apiKey = process.env.BHASHINI_API_KEY;
  const userId = process.env.BHASHINI_USER_ID;
  const pipelineId = process.env.BHASHINI_PIPELINE_ID ?? "64392f96daac500bd5c33043";

  if (!apiKey || !userId) {
    return null;
  }

  try {
    const payload = {
      pipelineTasks: [
        {
          taskType: "asr",
          config: {
            language: {
              sourceLanguage,
            },
            audioFormat: "wav",
            samplingRate: 16000,
          },
        },
      ],
      inputData: {
        audio: [
          {
            audioContent: audioBase64,
          },
        ],
      },
    };

    const response = await fetch(BHASHINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
        userID: userId,
        ulcaApiKey: apiKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as any;
    const outputText = data?.pipelineResponse?.[0]?.output?.[0]?.source;
    return outputText ?? null;
  } catch (err) {
    console.warn("[Bhashini] ASR request failed, falling back to Whisper:", err);
    return null;
  }
}
