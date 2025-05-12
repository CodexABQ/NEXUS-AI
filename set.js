




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUUvUERJbmdvS2xBbkFFdVcvalE2c1RvM05lYXhNY2JYK0QweG8yelowQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjVaVUI4cnBjNituQ2RyK1U1Z2cxRVJzeWF0Nm5SVVNwYUlIWWc0WE5TMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSVNZUmdhRXdkN2N3VXRYbE1zajM0Z0Z5ckJkSThEa2NVTDY4dXRNZUVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRmloM0pmZkYvUVV3R01zZ0padEt3dkdaMVFhdjVWbmI1aXVXQzVpMFRzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFFSWN1eE8yWGd3amtwdzNadUlPYjNsbWlRendWdFRtZXdISTlhTVpWVTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJFbmNDOGxqWFJLQ3NRN3B5M1k3cE1vVXdpMkhTOUtYK3Z0NFpYZ09hWDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZScWlMY1JnUEw5Q2FtakZJR3B6R21YM2JCV3hxVFFGTVVlTW1aT0Yzbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlZpdEV3YmFUYzZtaXJ0enhjTHgzei9TMW44YzZwb0hBUTVWN1ZmbjFRWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNndEFGc3R6czFFUTVGYmR0RXg0U3pFa0ZML2c4TXU2dDVFcW9CMWpISThvN3UyTCtLV3FZK2hiYnpVdmJMWWFJcitkYUNDZDJuaE1ZaE1zQlVSemp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE0LCJhZHZTZWNyZXRLZXkiOiI5LzUyMy9lSEZLTndaM29KdEpVUlQ3RFVMZll2dU1tSmtwV05NVEsyZHRBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwNjUzMDAyMDlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNTI3NDQ3RjREM0JEQTc0NEQwNzBFREIwNzI0N0UxMDQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzA1MTEzOH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA2NTMwMDIwOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxQjcxODhEMUI1NUYyRkNDMDc2MjM4MTNBRkM2QkU4QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MDUxMTc5fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJGbXptR2tQeVM1LU1HQ2FLWjgxdVB3IiwicGhvbmVJZCI6IjA4OTkwMDlmLTg0YjMtNDQ2MS05YjhiLTA0YTFkYWY2M2U5YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIMTYzRTR5dld4a0UzcTA0TCswQ0ZGb2FrbHc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZllSQUxTRkZFREtROS8xaEVNb2duYTZrNDAwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlgzWFg0MURNIiwibWUiOnsiaWQiOiIyMzQ4MDY1MzAwMjA5OjIyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuC8kiDwnZWs8J2VufCdlbrwnZW58J2VtPCdlYTwnZWs8J2VtyDgvJIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kvejFhTUJFUExFaDhFR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjZzQ0lrZ01KbXZRcFlzWjJmTDkrOTlHZ0lUVXhxRFpCbFdZc3Y3THYzVGc9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBQWlI4ZkFaeStHcFlVVVJkREMxZzhkdnpRQjM2QUpaNDQzakVuZGJOMUZMTllrVkxjTCt6NmZJTXB4b0VWNlNzUGlrczY3c3FhTWl0RkcwMjhIM0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSOHhzUmFjeTducHNGa1lKZ0V1enhlcW9JaE1Ga3BkVWJzVU9XUUJGUEE0OXkwTDRoS1NXd2M2OFVaRXBsdHdybEJOTkt5dHR5bUVtUXphUXNVb2lnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwNjUzMDAyMDk6MjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZXJBaUpJRENacjBLV0xHZG55L2Z2ZlJvQ0UxTWFnMlFaVm1MTCt5NzkwNCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzA1MTEzNSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMQ1gifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "2348065300209",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Codex",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
