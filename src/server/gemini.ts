import "server-only";

import { GoogleGenAI, Type } from "@google/genai";
import type { ConsultationResponse } from "@/types";

let geminiClient: GoogleGenAI | null | undefined;

function getGeminiClient() {
  if (geminiClient !== undefined) {
    return geminiClient;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  geminiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;
  return geminiClient;
}

const fallbackResponse: ConsultationResponse = {
  analysis:
    "현재 AI 분석 시스템 연결이 지연되고 있습니다. 프로젝트 내용을 남겨주시면 담당자가 직접 검토하겠습니다.",
  techStack: ["담당자 검토"],
};

export async function analyzeProjectRequest(projectDescription: string): Promise<ConsultationResponse> {
  const client = getGeminiClient();

  if (!client) {
    return fallbackResponse;
  }

  try {
    const response = await client.models.generateContent({
      model: process.env.GEMINI_MODEL ?? "gemini-3-flash-preview",
      contents: `
        You are a senior technical consultant at HongLabAI.
        Analyze the following project idea: "${projectDescription}".

        Respond in Korean with:
        1. A concise feasibility and key-challenge summary in no more than two sentences.
        2. Three or four suitable modern technologies.

        Return only JSON matching the provided schema.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            techStack: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["analysis", "techStack"],
        },
      },
    });

    if (!response.text) {
      return fallbackResponse;
    }

    return JSON.parse(response.text) as ConsultationResponse;
  } catch (error) {
    console.error("Gemini consultation analysis failed", error);
    return fallbackResponse;
  }
}
