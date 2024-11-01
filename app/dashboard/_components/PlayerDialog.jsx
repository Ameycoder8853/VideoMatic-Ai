import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./dialog";
import { Player } from "@remotion/player";
import { RemotionVideo } from './RemotionVideo';
import { Button } from './button';
import { db } from '../../db';
import { VideoData } from '../../schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

export const PlayerDialog = ({ playVideo, videoId }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState(null);
    const [durationInFrame, setDurationInFrame] = useState(1800);
    const router = useRouter();

    useEffect(() => {
        if (playVideo && videoId) {
            setOpenDialog(true);
            GetVideoData();
        } else {
            setOpenDialog(false);
        }
    }, [playVideo, videoId]);

    const GetVideoData = async () => {
        const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
        if (result && result[0]) {
            setVideoData(result[0]);
        }
    };

    const closeDialog = () => {
        setOpenDialog(false);
        router.replace('/dashboard');
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="bg-white flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5">Your Video is Ready</DialogTitle>
                    <DialogDescription>
                        {videoData ? (
                            <Player
                                component={RemotionVideo}
                                durationInFrames={Number(durationInFrame.toFixed(0))}
                                compositionWidth={300}
                                compositionHeight={450}
                                fps={30}
                                controls={true}
                                inputProps={{
                                    ...videoData,
                                    setDurationInFrames: (frameValue) => setDurationInFrame(frameValue),
                                }}
                            />
                        ) : (
                            <p>Loading video...</p>
                        )}
                        <div className='flex gap-10 mt-10'>
                            <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                            <Button>Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default PlayerDialog;
