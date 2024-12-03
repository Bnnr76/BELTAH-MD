const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0pGWStXRkR0Y3dteGU2cytwckdkTU9LQ1JsL2ViUzY1ZTZ0OUs3d1luMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZXlUSGNGYXVLamFrYlBwR0twME1BUjd3OGpuanFMYloxa2J6UkJWV25qMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2R2IyNDBkSVF3UkJkUkJaWGxuYW9aUjl2dGhKMXFURURwZGoxQWZwQ1ZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyN2lrTnlHUzdZMnhWU0d5VFRzQzErOG5ZM3ZOMGtjWk8ydjZSanRqaHc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjREcnFldWZRNDV4eUdqL3FZeWszRzk2aFg2RGxKWTBFWUxOeGszQnRFVms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdkL1I0cW41WUllQzFNeHhDOE1IaFdsRDFDMU9CT055RnFJSFU1QlVrRm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibURnNFJkOFVFWHVFcHhGTklNTE0vYk5HYUxYY1ZBV0V0bi9HcVZGTVgwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSm9NZ2VEUlVHWENsajZpa2NDSHJ5M1ZnVjcyUEtkSC85RzVoU2dtOHVpVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNUWVpya3BGTUVyRDhSR2wxUnNtMEdBQjI0V091aGU2ZmFsZE1WVUhQK2JLNVFtL1NFclBJcXp5dzhodHZ2TEVBaFRVZjVrZGkrK2RxQ0pRS1B4ZkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA3LCJhZHZTZWNyZXRLZXkiOiI5MGladXBBL2tTL1VhK0tnYnYzNTdaYzJtSWp0UGVxdFR2S28rWlhnUkMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQ0NzcwMDE4NTIxMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwQTIxRUVCQ0RCMDA4RTE3NzIzQjRGMjFFOTU5RDJBRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMzMjE3NzU4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0NDc3MDAxODUyMTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0I4Qjc3NjQ5RUQ4NjYxOUY4NTQ2QzUwRTA2QUVEREUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMzIxNzc1OH0seyJrZXkiOnsicmVtb3RlSmlkIjoiNDQ3NzAwMTg1MjEwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjlBMjcwMUU4MjhCOTgyRDA4OUYxRUVFRTg3RjY4MjRBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzMyMTc3NjB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQ0NzcwMDE4NTIxMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCRDE5RjA2MzQ3QTkyQjAxNzU3RTZGQkE3QjhCQzQzMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMzMjE3NzYwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiItVktna2FsWVFLV0doa1Mzcmd1em1RIiwicGhvbmVJZCI6IjFmOTcyODVkLWQ4NjAtNDRjMi1hMmRkLWQyZTVmMjRiNzE4NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5R1BtNkVNcXgrdm1hMk9NOVp5YWQ2T2xqejg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkVDb3hMNC9LUExZbWU0Mkk1QTRyekx5QUhFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRHNVdSQzlCIiwibWUiOnsiaWQiOiI0NDc3MDAxODUyMTA6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJSQU5BIFNIQU4gIDIxMCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1N1clpFR0VOQ2J1N29HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMXBGbEFhZ0dGSGJYOGZPVmkxSWpmNTFTMER2UEorRzFwWlFldlVINmVqND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVUgrb0xDMTRWSExaSkR4Z1hwQllrL0dsVVRQTmpUbUZTN1NHaEJxM0VGOUs5YzhKK2VnQVE1NzRlR09YK25oQmMrbHNxNGIzNUhaYmtNaG45ZEYyQlE9PSIsImRldmljZVNpZ25hdHVyZSI6Ikw3MFFDKzg3VVp0d3lXNFloTXR3MXZzdHdTZGxwdHVETWlaenY2VXBQbmFkT1N1UnZYakJuUjVXWGwrQ2pkWHRXUzVYUHdNRGEreDRHelFVeEErVEN3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDQ3NzAwMTg1MjEwOjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGFSWlFHb0JoUjIxL0h6bFl0U0kzK2RVdEE3enlmaHRhV1VIcjFCK25vKyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzIxNzc1NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIZXEifQ==;;;',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Huaweike/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254114141192",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ BELTAH-MD",
    BOT : process.env.BOT_NAME || 'BELTAH-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
