import React, { useEffect } from 'react';
import {
    AbsoluteFill,
    Audio,
    Img,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig
} from 'remotion';

export const RemotionVideo = ({ script, imageList, audioFileUrl, captions, setDurationInFrame }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    // Function to calculate the total duration in frames
    const getDurationFrame = () => {
        const durationInFrames = (captions[captions?.length - 1]?.end / 1000) * fps;
        return Math.ceil(durationInFrames); // Ensure integer value
    };

    // Get the current caption text based on the frame
    const getCurrentCaptions = () => {
        const currentTime = (frame / fps) * 1000; // Current time in milliseconds
        const currentCaption = captions.find(
            (word) => currentTime >= word.start && currentTime <= word.end
        );
        return currentCaption ? currentCaption?.text : '';
    };

    // Use `useEffect` to set the total duration in frames when the component mounts
    useEffect(() => {
        if (setDurationInFrame) {
            setDurationInFrame(getDurationFrame());
        }
    }, [setDurationInFrame, fps, captions]);

    return (
        <AbsoluteFill className="bg-black">
            {imageList?.map((item, index) => {
                const totalDuration = getDurationFrame();
                const startTime = (index * totalDuration) / imageList?.length;
                const duration = totalDuration / imageList?.length;

                const scale = (index) =>
                    interpolate(
                        frame,
                        [startTime, startTime + duration / 2, startTime + duration],
                        index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                return (
                    <Sequence key={index} from={Math.ceil(startTime)} durationInFrames={Math.ceil(duration)}>
                        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Img
                                src={item}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: `scale(${scale(index)})`,
                                }}
                            />
                            <AbsoluteFill
                                style={{
                                    color: 'white',
                                    justifyContent: 'center',
                                    top: undefined,
                                    bottom: 50,
                                    height: 150,
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
                            </AbsoluteFill>
                        </AbsoluteFill>
                    </Sequence>
                );
            })}
            <Audio src={audioFileUrl} />
        </AbsoluteFill>
    );
};
