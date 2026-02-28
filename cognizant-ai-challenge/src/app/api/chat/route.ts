import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview" 
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    if (error.message.includes("not found")) {
        try {
            const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await fallbackModel.generateContent('Fallback response for: ' + (await req.json()).prompt);
            const response = await result.response;
            return NextResponse.json({ text: response.text() });
        } catch (innerError) {
            return NextResponse.json({ error: "Model not found. Please check AI Studio for available models." }, { status: 404 });
        }
    }

    return NextResponse.json({ error: "AI Service Error" }, { status: 500 });
  }
}