import { execFile } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { images, audio } = req.body;

  if (!images || !audio) {
    return res.status(400).json({ error: 'Images and audio are required.' });
  }

  const scriptPath = path.resolve('./render-video.js');

  execFile(
    'node',
    [scriptPath, JSON.stringify({ images, audio })],
    (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing render script:', stderr);
        return res.status(500).json({ error: 'Rendering failed.' });
      }

      console.log('Render script output:', stdout);
      res.status(200).json({ message: 'Rendering started successfully.', output: stdout });
    }
  );
}
