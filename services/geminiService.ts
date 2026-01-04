import { GoogleGenAI, Type } from "@google/genai";
import { ConsultationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProjectRequest = async (
  projectDescription: string
): Promise<ConsultationResponse> => {
  try {
    const prompt = `
      You are a senior technical consultant at 'HongLabAI'. 
      A potential client has submitted the following project idea: "${projectDescription}".
      
      Please provide a brief, professional technical analysis in Korean.
      1. Summarize the feasibility and key challenges (max 2 sentences).
      2. Suggest 3-4 specific modern technologies (e.g., React, Python, TensorFlow, AWS) that would be suitable.
      
      Return the result in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: "A professional summary of feasibility and challenges in Korean.",
            },
            techStack: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of recommended technologies.",
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as ConsultationResponse;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Fallback response in case of API error or missing key
    return {
      analysis: "현재 AI 시스템 연결이 지연되고 있습니다. 문의를 제출해주시면 담당자가 상세히 검토하여 연락드리겠습니다.",
      techStack: ["Manual Review"],
    };
  }
};