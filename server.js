require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Tu es Zenith, une IA d'une sagesse infinie.
RÈGLES CRITIQUES :
1. Si l'utilisateur demande une image, tu DOIS générer une description en anglais et l'insérer EXACTEMENT ainsi : {IMAGE:ta description ici}.
2. Ne dis JAMAIS que tu ne peux pas générer d'images.
3. Pour les fichiers, analyse le texte fourni et réponds avec précision.`;

app.post('/api/chat', async (req, res) => {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...req.body.messages],
            temperature: 0.6,
        });
        res.json({ texte: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Erreur de réflexion." });
    }
});

app.listen(3000, () => console.log("✨ Zenith est prêt sur le port 3000"));
