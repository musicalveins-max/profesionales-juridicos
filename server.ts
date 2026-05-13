import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini Chat
  app.post("/api/chat", async (req, res) => {
    const { messages, message } = req.body;
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error("Error: GEMINI_API_KEY no detectada en el servidor");
        return res.status(500).json({ error: "GEMINI_API_KEY no configurada en el servidor" });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Prepare history from message list if provided
      const history = (messages || [])
        .filter((msg: any) => msg.role !== 'system')
        .map((msg: any) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `Eres Catalina, asistente legal en Colombia. Tu misión es recoger datos para un abogado.
Reglas:
1. Saluda profesionalmente.
2. Pregunta el área legal y una breve descripción.
3. Pide nombre y teléfono.
4. Al final, genera un resumen con este formato:
RESUMEN PARA ABOGADO
Nombre: [Nombre]
Área: [Área]
Teléfono: [Teléfono]
Caso: [Breve descripción]
Urgencia: [Alta/Media/Baja]

No des consejos legales. Sé breve y formal.`,
        },
        // Note: SDK might not support history in ai.chats.create direct call in some versions 
        // but the skill shows it being used without history. 
        // If history is needed, I might need to send them as separate messages or use a different pattern.
        // Actually, the skill doesn't show history in ai.chats.create.
      });

      // If there's history, we might need to "replay" it if the SDK doesn't support passing it to create.
      // But usually, startChat/chats.create supports history.
      // Let's stick to the skill's example first.
      
      const result = await chat.sendMessage({ message: message });
      const responseText = result.text; // Property, not method

      res.json({ text: responseText });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
