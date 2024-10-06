import express from 'express';
import { YoutubeTranscript } from './youtube-transcript-fix';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/transcribe', async (req, res) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: 'URL do vídeo não fornecida' });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    res.json({ transcript });
  } catch (error) {
    console.error('Erro ao transcrever o vídeo:', error);
    res.status(500).json({ error: 'Erro ao transcrever o vídeo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});