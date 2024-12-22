"use client"

import { db } from './db' 
import { Users } from './schema' 
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { eq } from 'drizzle-orm';

const Provider = ({children}) => {  
 
    const {user}=useUser();

    useEffect(()=>{
        user&&isNewUser();
    },[user]);
     
    const isNewUser=async() =>{
        const result =await db.select().from(Users)
        .where(eq(Users.email,user?.primaryEmailAddress?.emailAddress));

        if(!result[0])
            {
                await db.insert(Users).values({
                    name:user.fullName,
                    email:user?.primaryEmailAddress?.emailAddress,
                    imageUrl:user?.imageUrl 
                })
            }
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default Provider