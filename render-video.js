const { renderMedia } = require('@remotion/renderer');
const path = require('path');

const renderVideo = async ({ images, audio }) => {
  try {
    const compositionId = 'MyVideo'; // Ensure this matches your RemotionVideo component's ID
    const serveUrl = path.join(__dirname, 'remotion'); // Adjust path to your Remotion project
    const outputPath = path.join(__dirname, 'output/rendered-video.mp4'); // Adjust output path as needed

    console.log('Starting video render...');

    await renderMedia({
      composition: compositionId,
      serveUrl,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: { images, audio },
    });

    console.log(`Video rendered successfully: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('Error during rendering:', error);
    throw error;
  }
};

if (require.main === module) {
  // For direct script execution (testing purposes)
  const args = JSON.parse(process.argv[2]);
  renderVideo(args)
    .then((output) => console.log(`Rendered video at ${output}`))
    .catch((error) => console.error('Error:', error));
}

module.exports = renderVideo;
