import React, { useState } from 'react';
import { Thumbnail } from "@remotion/player";
import { RemotionVideo } from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

function VideoList({ videoList }) {
    const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
    const [videoId, setVideoId] = useState();

    const handleThumbnailClick = (video) => {
        setVideoId(video.id);
        setOpenPlayerDialog(true);
    };

    return (
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
            {videoList?.map((video, index) => (
                <div
                    key={index}
                    className='cursor-pointer hover:scale-105 transition-all'
                    onClick={() => handleThumbnailClick(video)}
                >
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth={300}
                        compositionHeight={400}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        style={{
                            borderRadius: 15
                        }}
                        inputProps={{
                            ...video,
                            setDurationInframe: (v) => console.log(v)
                        }}
                    />
                </div>
            ))}
            <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
        </div>
    );
}

export default VideoList;
