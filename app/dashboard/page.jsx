"use client";

import React, { useContext, useEffect, useState } from 'react';
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import { db } from '../db';
import { VideoData } from '../schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import VideoList from './_components/VideoList';

const Dashboard = () => {
    const [videoList, setVideoList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        if (user) GetVideoList();
    }, [user]);

    const GetVideoList = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));

        console.log(result);
        setVideoList(result);
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-primary text-2xl'>Dashboard</h2>
                <Link href={'/dashboard/create-new'}>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        + Create New
                    </button>
                </Link>
            </div>

            {/* Empty State */}
            {videoList?.length === 0 && (
                <div>
                    <EmptyState />
                </div>
            )}

            {/* List of Videos */}
            <VideoList videoList={videoList} />
        </div>
    );
}

export default Dashboard;
