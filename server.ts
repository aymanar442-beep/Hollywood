import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Helper to get Gemini Client safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY_MISSING");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health & Diagnostic API
app.get("/api/health", async (req, res) => {
  const apiKeyPresent = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY");
  res.json({
    status: "ok",
    system: "CineGuard Apex Core",
    hasApiKey: apiKeyPresent,
    model: "gemini-3.7-flash",
    timestamp: new Date().toISOString(),
  });
});

// Diagnostic check endpoint
app.post("/api/diagnose", async (req, res) => {
  const apiKeyPresent = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY");
  if (!apiKeyPresent) {
    return res.status(400).json({
      success: false,
      errorType: "MISSING_API_KEY",
      message: "مفتاح GEMINI_API_KEY غير متوفر في متغيرات البيئة. يرجى ضبط المفتاح في الإعدادات (Settings > Secrets).",
      advice: "In Google AI Studio, ensure GEMINI_API_KEY is properly set in the Secrets panel."
    });
  }

  const startTime = Date.now();
  try {
    const ai = getGeminiClient();
    const testResponse = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: "CineGuard Security Link Check",
    });

    const latency = Date.now() - startTime;
    return res.json({
      success: true,
      latencyMs: latency,
      sampleResponse: testResponse.text?.substring(0, 50) || "OK",
      message: "محرك CineGuard الذكي متصل بنموذج Gemini 3.7 Flash ويعمل بسرعة فائقة.",
    });
  } catch (err: any) {
    const latency = Date.now() - startTime;
    let errorType = "UNKNOWN_ERROR";
    let message = "حدث خطأ غير متوقع أثناء فحص الاتصال بالنموذج.";

    const errStr = String(err.message || err);
    if (errStr.includes("API key") || errStr.includes("401") || errStr.includes("403") || errStr.includes("UNAUTHENTICATED")) {
      errorType = "INVALID_API_KEY";
      message = "مفتاح API غير صالح أو غير مصرح له بالوصول إلى النموذج.";
    } else if (errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("429") || errStr.includes("quota")) {
      errorType = "QUOTA_EXCEEDED";
      message = "تم تجاوز حد الطلبات المسموح به (Quota Exceeded). انتظر قليلاً ثم حاول مجدداً.";
    } else if (errStr.includes("SAFETY") || errStr.includes("BLOCKED")) {
      errorType = "SAFETY_BLOCKED";
      message = "تم حجب الاستجابة بواسطة فلتر الأمان والحماية الخاص بـ Gemini.";
    } else if (errStr.includes("ETIMEDOUT") || errStr.includes("FETCH_ERROR") || errStr.includes("network")) {
      errorType = "NETWORK_TIMEOUT";
      message = "حدث انقطاع أو بطء في شبكة الاتصال بين الخادم وخدمات الذكاء الاصطناعي.";
    }

    return res.status(500).json({
      success: false,
      errorType,
      latencyMs: latency,
      rawError: errStr,
      message,
    });
  }
});

// Multi-Agent Cinema Swarm Stream Endpoint
app.post("/api/cinema/audit/stream", async (req, res) => {
  const { scriptContent, projectTitle, agentRole, targetDemographic, securityLevel, language = "ar" } = req.body;

  if (!scriptContent || typeof scriptContent !== "string" || scriptContent.trim().length === 0) {
    return res.status(400).json({ error: "يرجى تقديم نص السيناريو أو المشهد للتحليل." });
  }

  const apiKeyPresent = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY");
  if (!apiKeyPresent) {
    return res.status(400).json({
      error: "مفتاح GEMINI_API_KEY غير متوفر. يرجى إضافة المفتاح في إعدادات التطبيق (Settings > Secrets).",
      errorType: "MISSING_API_KEY"
    });
  }

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const ai = getGeminiClient();

    let systemInstruction = "";
    if (agentRole === "security_auditor") {
      systemInstruction = `You are the Chief Cinema Security & Leak Auditor for Hollywood-grade studio productions in the CineGuard Apex platform.
Analyze the provided screenplay / scene with extreme tactical precision.
Identify:
1. High-Risk Plot Spoilers & Twist Reveals that require strict compartmentalization.
2. Scene Leak Vulnerability Score (0-100%).
3. Recommended Redactions & Individual Actor Cast Scopes (which characters only need dialogue fragments).
4. Watermarking Strategy & Security Clearance Levels.
Output format: Markdown with clear sections, visual badges [CRITICAL], [HIGH], [SECURE], and concrete actionable recommendations. Write primarily in ${language === "ar" ? "fluent, professional Arabic with technical terms in English" : "executive Hollywood-level English"}.`;
    } else if (agentRole === "ip_counsel") {
      systemInstruction = `You are the Lead Entertainment IP & Copyright Forensic Counsel for CineGuard Apex.
Audit the provided screenplay against:
1. Potential copyright overlaps, dialogue tropes, trademark hazards, and likeness infringements.
2. Originality Index (0-100%).
3. Similar historical cinema references and risk mitigations.
4. Clean-chain-of-title legal recommendations.
Output format: Structured executive legal brief in Markdown with risk metrics. Language: ${language === "ar" ? "Arabic with English legal/cinema terms" : "English"}.`;
    } else if (agentRole === "drama_doctor") {
      systemInstruction = `You are the Elite Screenplay Continuity & Narrative Architect (Script Doctor) for CineGuard Apex.
Analyze the provided scene / script for:
1. Timeline paradoxes, logic gaps, character motivation inconsistencies, and visual pacing issues.
2. Continuity Integrity Score (0-100%).
3. Dialogue punchiness, emotional beats, and subtext enhancement suggestions.
4. Scene Transition & Cinematography suggestions (Lighting, Camera movements).
Output format: Structured creative breakdown in Markdown. Language: ${language === "ar" ? "Arabic with cinematic terms" : "English"}.`;
    } else if (agentRole === "box_office") {
      systemInstruction = `You are the Senior Box Office Analytics & Audience Retention Forecaster for CineGuard Apex.
Analyze the script for:
1. Target Demographic Resonance (${targetDemographic || "General Global Audience"}).
2. Commercial Viability Score (0-100%) & Streaming Bingeability Index.
3. Retention Hotspots & Moments of Potential Viewer Churn.
4. Marketing Hook Suggestions & Trailer Teaser Climax Moments.
Output format: Professional analytical dashboard in Markdown. Language: ${language === "ar" ? "Arabic" : "English"}.`;
    } else {
      // FULL SWARM ORCHESTRATOR
      systemInstruction = `You are the Master Swarm Orchestrator for CineGuard Apex (Autonomous Cinema Security & Creative Intelligence Engine).
You coordinate an elite autonomous 4-agent swarm:
1. 🛡️ Chief Security & Anti-Leak Auditor
2. ⚖️ Entertainment IP & Copyright Counsel
3. 🎬 Master Script Doctor & Continuity Architect
4. 📊 Box Office & Audience Retention Forecaster

Analyze the submitted production material ("${projectTitle || "Untitled Feature"}") across all four vectors with deep forensic rigor.
Format your report with distinct agent headings, scores (0-100), vulnerability tables, and an Executive Studio Verdict.
Language: ${language === "ar" ? "Rich, elite professional Arabic with English cinema terminology" : "Top-tier Hollywood Executive English"}.`;
    }

    const prompt = `PROJECT TITLE: ${projectTitle || "Cinema Project"}
SECURITY CLEARANCE TARGET: ${securityLevel || "Tier-1 Top Secret"}
TARGET DEMOGRAPHIC: ${targetDemographic || "Global Theatrical & Premium Streaming"}

SCRIPT / SCENE MATERIAL:
"""
${scriptContent}
"""

Initiate comprehensive autonomous audit now.`;

    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    for await (const chunk of streamResponse) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err: any) {
    console.error("CineGuard Stream Error:", err);
    const errStr = String(err.message || err);
    res.write(`data: ${JSON.stringify({ error: "فشل التحليل الذكي للسيناريو", details: errStr })}\n\n`);
    res.end();
  }
});

// Chat Streaming API with Server-Sent Events (SSE)
app.post("/api/chat/stream", async (req, res) => {
  const { messages, systemInstruction, temperature } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "المحادثة فارغة أو صيغة الطلب غير صحيحة." });
  }

  const apiKeyPresent = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY");
  if (!apiKeyPresent) {
    return res.status(400).json({
      error: "مفتاح GEMINI_API_KEY غير متوفر. يرجى إضافة المفتاح في إعدادات التطبيق (Settings > Secrets).",
      errorType: "MISSING_API_KEY"
    });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const ai = getGeminiClient();

    const formattedContents = messages.map((msg: { role: string; content: string }) => {
      const role = msg.role === "assistant" ? "model" : msg.role;
      return {
        role: role === "system" ? "user" : role,
        parts: [{ text: msg.content }],
      };
    });

    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-3.7-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction || "You are CineGuard AI's executive advisor, specialized in cinema security, autonomous agents, and entertainment tech.",
        temperature: typeof temperature === "number" ? temperature : 0.7,
      },
    });

    for await (const chunk of streamResponse) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err: any) {
    console.error("Gemini Stream Error:", err);
    const errStr = String(err.message || err);
    res.write(`data: ${JSON.stringify({ error: "حدث خطأ أثناء المحادثة", details: errStr })}\n\n`);
    res.end();
  }
});

// Steganographic Invisible Watermarking Endpoint
app.post("/api/cinema/watermark", (req, res) => {
  const { text, actorName, copyId, timestamp } = req.body;
  if (!text) {
    return res.status(400).json({ error: "النص مطلوب للتشفير" });
  }

  const payload = JSON.stringify({
    actor: actorName || "Anonymous Cast",
    id: copyId || `CAST-${Math.floor(100000 + Math.random() * 900000)}`,
    time: timestamp || new Date().toISOString(),
  });

  // Convert payload into zero-width spaces (invisible watermark steganography)
  // 0 -> \u200B (Zero Width Space), 1 -> \u200C (Zero Width Non-Joiner)
  const binary = Array.from(payload)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
  const invisibleWatermark = binary
    .split("")
    .map((bit) => (bit === "1" ? "\u200C" : "\u200B"))
    .join("");

  // Inject invisible watermark right after the first word
  const words = text.split(" ");
  const watermarkedText = words.length > 1
    ? words[0] + invisibleWatermark + " " + words.slice(1).join(" ")
    : text + invisibleWatermark;

  res.json({
    success: true,
    watermarkId: payload,
    watermarkedLength: watermarkedText.length,
    watermarkedText,
    visibleBadge: `[STRICTLY CONFIDENTIAL - ISSUED TO: ${actorName || "PRINCIPAL CAST"} | ID: ${copyId || "SYS-SEC"}]`,
  });
});

// Revolutionary Crisis Salvage & Plot Flip Engine (Invented by Founder Ayman)
app.post("/api/cinema/crisis-salvage/stream", async (req, res) => {
  const { leakedContext, originalScript, productionBudget, language = "ar" } = req.body;

  if (!leakedContext || typeof leakedContext !== "string" || leakedContext.trim().length === 0) {
    return res.status(400).json({ error: "يرجى تحديد تفاصيل الجزء المسرب أو المحروق من السيناريو." });
  }

  const apiKeyPresent = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY");
  if (!apiKeyPresent) {
    return res.status(400).json({
      error: "مفتاح GEMINI_API_KEY غير متوفر. يرجى إضافة المفتاح في إعدادات التطبيق (Settings > Secrets).",
      errorType: "MISSING_API_KEY"
    });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const ai = getGeminiClient();

    const systemInstruction = `You are the Lead Narrative Crisis Salvage & Plot Flip Architect for CineGuard Apex (A pioneering proprietary technology conceived by Ayman for the Hollywood Google AI Studio Hackathon).
Your mission is to perform an emergency narrative rescue for a cinema/TV production whose major twists or scenes were brutally leaked to the public, threatening tens of millions in box-office losses.

You will formulate:
1. 🔄 **Counter-Twist Strategy (The Red Herring Pivot)**: Reframe the leaked plot as an intentional in-universe deception (a decoy, a character's fake ploy, or just the tip of a much darker iceberg).
2. 🎭 **Restructured Script Scenes**: Provide newly rewritten scenes and high-voltage dialogue that shock audiences who thought they knew the spoiler.
3. 💰 **Financial Damage Control & Reshoot Optimization**: Calculate how to achieve this plot turnaround reusing existing sets and actors with minimal reshoot budget (saving 80%+ of typical scrap losses).
4. 🛡️ **Post-Salvage Fortification**: Specific watermarking and actor-compartmentalization measures for the revised pages so zero further leaks occur.

Output format: Highly professional, cinematic executive salvage dossier in rich Markdown. Language: ${language === "ar" ? "Rich, elite professional Arabic with English cinematic terms" : "Executive Hollywood English"}.`;

    const prompt = `LEAK CRISIS REPORT:
-----------------------
LEAKED/SPOILED PLOT ELEMENTS:
"""
${leakedContext}
"""

ORIGINAL PRODUCTION SCRIPT / CONTEXT:
"""
${originalScript || "Major production thriller with key character death / betrayal leaked online."}
"""

ESTIMATED PRODUCTION BUDGET AT RISK: $${productionBudget || "85,000,000"} USD

Execute the full Emergency Crisis Salvage & Plot Flip analysis now.`;

    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    for await (const chunk of streamResponse) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err: any) {
    console.error("CineGuard Crisis Salvage Error:", err);
    const errStr = String(err.message || err);
    res.write(`data: ${JSON.stringify({ error: "فشل محرك إنقاذ السيناريو", details: errStr })}\n\n`);
    res.end();
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
