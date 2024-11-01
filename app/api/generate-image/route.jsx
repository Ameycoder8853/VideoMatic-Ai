import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";
import { storage } from "./FirebaseConfig"; // Make sure this is correctly set up

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        });

        const input = {
            prompt: prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1
        };

        const output = await replicate.run(
            "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
            { input }
        );

        if (!output || output.length === 0) {
            throw new Error("Image generation failed; no output received from Replicate.");
        }

        const base64Image = "data:image/png;base64," + await convertImageToBase64(output[0]);
        const fileName = `ai-short-video-files/${Date.now()}.png`;
        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);

        console.log("Download URL:", downloadUrl);
        return NextResponse.json({ result: downloadUrl });
    } catch (e) {
        console.error("Error in POST request:", e.message);
        return NextResponse.json({ error: "Failed to upload image", details: e.message }, { status: 500 });
    }
}

const convertImageToBase64 = async (imageUrl) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data).toString('base64');
        return base64Image;
    } catch (e) {
        console.error("Error converting image to base64:", e.message);
        throw new Error("Failed to convert image to base64: " + e.message);
    }
};
