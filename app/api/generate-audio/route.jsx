import textToSpeech from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';
import { storage } from './FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import util from 'util';

// Generate a unique ID for each file
const id = uuidv4();

// Initialize the TextToSpeech client
const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});

// Function to handle timeouts
const withTimeout = (promise, ms) => {
    let timer;
    const timeoutPromise = new Promise((_, reject) =>
        timer = setTimeout(() => reject(new Error('Operation timed out')), ms)
    );
    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
};

export async function POST(req) {
    try {
        // Parse the JSON request body to get the text input
        const { text } = await req.json();

        // Firebase storage reference with unique ID for each file
        const storageRef = ref(storage, `ai-short-video-files/${id}.mp3`);

        // Google Text-to-Speech request configuration
        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        // Generate the speech audio with a timeout of 30 seconds
        const [response] = await withTimeout(client.synthesizeSpeech(request), 30000); // 30 seconds timeout

        // Use Buffer to convert the audio content
        const audioBuffer = Buffer.from(response.audioContent, 'binary');

        // Upload the audio buffer to Firebase Storage with a timeout of 60 seconds
        await withTimeout(uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' }), 60000); // 60 seconds timeout

        // Generate the download URL for the uploaded file
        const downloadUrl = await getDownloadURL(storageRef);

        console.log(downloadUrl);

        // Return the download URL as the response
        return NextResponse.json({ Result: downloadUrl });
    } catch (error) {
        console.error('Error during text-to-speech or Firebase upload:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
