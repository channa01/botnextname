const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// ใส่โทเคนบอทของคุณที่ได้จาก Discord Developer Portal
const channel_id = ""; //คลิกขวา discord copy channel id
const token = ''; //Discord Developer Portal

// อาร์เรย์ของชื่อ
const names = ['A', 'B', 'C', 'D']; //ชื่อผู้เข้าร่วม

let currentIndex = 0;

client.once('ready', () => {
    console.log('Ready!');
});

// ฟังก์ชันเพื่อตรวจสอบเวลาและส่งข้อความ
function checkTimeAndSendMessage() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // ถ้าเวลาคือ 9:30 น.
    if (currentHour === 9 && currentMinute === 30) {
        const channel = client.channels.cache.get(channel_id); // แทนที่ด้วย Channel ID ของคุณ
        if (channel) {
            channel.send(`วันนี้คิว : ${names[currentIndex]}`);
            currentIndex = (currentIndex + 1) % names.length; // อัปเดต index เพื่อชื่อถัดไป
        }
    }
}

// ตรวจสอบเวลาและส่งข้อความทุกนาที
setInterval(checkTimeAndSendMessage, 60 * 1000); // ตรวจสอบทุกๆ นาที

client.on('messageCreate', message => {
    // ถ้าเป็นข้อความจากบอทเอง ให้ข้ามไป
    if (message.author.bot) return;

    // คำสั่ง !next เลือกชื่อถัดไป
    if (message.content === '!next') {
        currentIndex = (currentIndex + 1) % names.length;
        message.channel.send(`วันนี้คิว : ${names[currentIndex]}`);
    }

    // คำสั่ง !prev เลือกชื่อก่อนหน้า
    if (message.content === '!prev') {
        currentIndex = (currentIndex - 1 + names.length) % names.length;
        message.channel.send(`กลับมาคิว : ${names[currentIndex]}`);
    }
});

client.login(token);


//https://discord.com/oauth2/authorize?client_id=1253555299604893747&scope=bot&permissions=11264