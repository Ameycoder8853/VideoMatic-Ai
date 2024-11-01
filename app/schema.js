import { pgTable, serial, varchar, boolean, json} from "drizzle-orm/pg-core";

export const Users =pgTable('users',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false)

})


export const VideoData = pgTable('videoData', {
    id:serial('id').primaryKey(),
    script:json('script').notNull(),
    audioFileUrl:varchar('audioFileUrl').notNull(), // No `notNull` to avoid insertion issues
    captions:json('captions').notNull(),
    imageList:varchar('imageList').array(), // Changed to JSON for storing as an array
    createdBy:varchar('createdBy').notNull()
});
