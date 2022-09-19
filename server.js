import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const TOKEN = "5415065601:AAG65fYP4AT5ozeVfsfVRDa7jR25UUO6qTE"

const bot = new TelegramBot(TOKEN, { polling: true });

const download = async (url) => {
    const options = {
        method: 'GET',
        url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
        params: { url },
        headers: {
            'X-RapidAPI-Key': '9ea5748716msh4cb3f676d47021dp17a992jsn7d30a9b73573',
            'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
        }
    };

    try {
        const res = await axios.request(options)

        const result = {
            media: res.data.media,
            title: res.data.title
        }

        console.log(res.data)
        return result
    } catch (error) {
        console.log(error)
    }
}

bot.on('message', async (m) => {
    try {
        const id = m.chat.id;
        if (m.text == '/start') {
            await bot.sendMessage(id, `Salom ${m.chat.first_name}, men Yuksta. Instagram video havolasini yuboring`)
        }

        const res = await download(m.text);

        await bot.sendVideo(id, res.media, {
            caption: res.title
        })
    } catch (err) {
        console.log(err)
    }
})