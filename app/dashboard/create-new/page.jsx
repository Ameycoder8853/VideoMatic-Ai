"use client";
import React, { useContext, useEffect, useState } from 'react';
import SelectStyle from './_components/SelectStyle';
import SelectTopic from './_components/SelectTopic';
import SelectDuration from './_components/selectDuration';
import axios from 'axios';
import CustomLoading from '../_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '../../_context/VideoDataContext';
import { db } from '../../db';
import { Users, VideoData } from '../../../configs/schema';
import { useUser } from '@clerk/nextjs';
import { PlayerDialog } from '../_components/PlayerDialog';
import { UserDetailContext } from '../../_context/UserDetailContext'
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const {userDetail,setUserDetail}= useContext(UserDetailContext)



  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onCreateClickHandler = async () => {
    if (!userDetail || userDetail.credits <= 0) {
      toast("You don't have enough credits");
      return;
    }
    
    // Proceed with generating the video
    
    setLoading(true);
    try {
      const scriptData = await GetVideoScript();
      const audioFileUrl = await GenerateAudioFile(scriptData);
      const captions = await GenerateAudioCaption(audioFileUrl);
      const images = await GenerateImages(scriptData);

      setVideoData({
        videoScript: scriptData,
        audioFileUrl: audioFileUrl,
        captions: captions,
        imageList: images,
      });

      const result = await SaveVideoData({
        videoScript: scriptData,
        audioFileUrl: audioFileUrl,
        captions: captions,
        imageList: images,
      });

      if (result && result.length > 0) {
        setVideoId(result[0].id);
        setPlayVideo(true);
      }
    } catch (error) {
      console.error("Error in creation process:", error);
    } finally {
      setLoading(false);
    }
  };

  const GetVideoScript = async () => {
    const prompt = `write a script to generate a ${formData.duration} video on topic: ${formData.topic} story along with AI image prompt in ${formData.imageStyle} format for each scene and give me results in JSON format with imagePrompt and ContentText as fields`;
    const resp = await axios.post('/api/get-video-script', { prompt });

    if (resp.data.result) {
      return resp.data.result;
    } else {
      throw new Error("Failed to get video script.");
    }
  };

  const GenerateAudioFile = async (videoScriptData) => {
    const script = videoScriptData.map((item) => item.ContentText).join(' ');
    const resp = await axios.post('/api/generate-audio', {
      text: script,
      id: uuidv4(),
      duration: formData.duration === '30 seconds' ? 30 : 60, // Pass duration in seconds
    });

    const audioFileUrl = resp.data.Result;
    if (audioFileUrl) {
      return audioFileUrl;
    } else {
      throw new Error("Failed to generate audio file.");
    }
  };

  const GenerateAudioCaption = async (audioFileUrl) => {
    const resp = await axios.post('/api/generate-caption', { audioFileUrl });
    const captions = resp.data.result;

    if (captions) {
      return captions;
    } else {
      throw new Error("Failed to generate captions.");
    }
  };

  const GenerateImages = async (videoScriptData) => {
    const images = [];
    for (const element of videoScriptData) {
      const response = await axios.post('/api/generate-image', {
        prompt: element.imagePrompt,
      });
      images.push(response.data.result);
    }
    return images;
  };

  const SaveVideoData = async (videoData) => {
    setLoading(true);
    try {
      const result = await db
        .insert(VideoData)
        .values({
          script: videoData.videoScript,
          audioFileUrl: videoData.audioFileUrl,
          captions: videoData.captions,
          imageList: videoData.imageList,
          duration: formData.duration,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        }).returning({ id: VideoData?.id })
          await UpdateUserCredits();
      console.log("Saved to DB:", result);
      return result;
    } catch (error) {
      console.error("Error saving video data:", error);
    } finally {
      setLoading(false);
    }
  };


  
  const UpdateUserCredits =async()=>{
    const result=await db.update(Users).set({
      credits:userDetail?.credits-10
    }).where(eq(Users?.email,user?.primaryEmailAddress?.emailAddress))
    console.log(result);
  }


  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10 w-full"
          onClick={onCreateClickHandler}
        >
          Create Short Video
        </button>
      </div>
      <CustomLoading loading={loading} />
      {playVideo && videoId && (
        <PlayerDialog playVideo={playVideo} videoId={videoId} />
      )}
    </div>
  );
};

export default CreateNew;
