/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Videomatic.ai_owner:mYSBzve7DZP4@ep-summer-mud-a8kkc4c6.eastus2.azure.neon.tech/Videomatic.ai?sslmode=require',
    }
  };