import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '5mb' }));

  // AI Tactician route with thinking mode
  app.post('/api/tactician', async (req: Request, res: Response) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY is not set. Please configure your API key in the Secrets panel.',
        });
      }

      const { prompt, formationData } = req.body;

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are an elite Grandmaster strategist for the mobile 4X strategy game "Kingshot".
You provide deep, mathematically sound tactical advice on Kingshot Bear Trap troop ratios and rally synchronization.
Core rules of Kingshot Bear Trap combat:
1. Archers are the primary damage dealers (~70-80% of damage) because the Bear Trap entity has the lowest defense against ranged/archer attacks.
2. Cavalry provide secondary damage (~15-20%).
3. Infantry deal minimal damage (~5-10%); because the Bear Trap does not wipe out squads, heavy Infantry reduces total score.
4. For My Rally Lead: Allocate the optimal ratio (such as 10% Infantry, 20% Cavalry, 70% Archers) up to full rally capacity.
5. For Joiner Marches: Evenly distribute the remaining troop pool across all available march slots to maximize total alliance contribution.`;

      const contents = `${systemInstruction}

Current Formation Parameters:
${JSON.stringify(formationData, null, 2)}

Player Inquiry:
${prompt || 'Analyze my current setup and explain how to optimize my march splits and hero skill synergies for maximum damage.'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });

      return res.json({
        analysis: response.text,
      });
    } catch (error: any) {
      console.error('Tactician API Error:', error);
      return res.status(500).json({
        error: error?.message || 'Failed to process tactical query',
      });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Serve static dist in production, or Vite middlewares in dev
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
