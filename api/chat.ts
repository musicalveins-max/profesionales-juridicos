import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, messages } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Error: GEMINI_API_KEY no detectada");
      return res.status(500).json({ error: "Error: GEMINI_API_KEY no detectada en Vercel" });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Para rutas sin estado (Serverless), preparamos la historia directamente
    const history = (messages || [])
      .filter((msg: any) => msg.role !== 'system')
      .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
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
    });

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Error en Vercel Function:", error);
    return res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
}
