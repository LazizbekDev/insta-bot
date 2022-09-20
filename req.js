import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import express from "express";
import cors from "cors";

const app = express()
app.use(express.json());
app.use(cors());

const TOKEN = "5773119919:AAFP7b-5tcpDqpKq5hULs0T2VK_X0EY3VEg";

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

        return res
    } catch (error) {
        console.log(error)
    }
}

bot.on('message', async (m) => {
    try {
        const id = m?.chat?.id;
        if (m?.text == '/start') {
            await bot.sendMessage(id, `Salom ${m?.chat?.first_name}, men Yuksta. Instagram video havolasini yuboring`)
        } else if (m?.text.startsWith('https://instagram.com/stories/')) {
            const res = await download(m?.text);

            res.data?.map(async (d, i) => {
                await bot.sendVideo(id, d?.media)
            })
        }
    } catch (err) {
        console.log(err)
    }
})

app.get('/', (req, res) => {
    res.send('yuksta api')
})

app.post('/api/yuksta', async (req, res) => {

    try {
        if (req.body.url.startsWith('https://instagram.com/stories/')) {
            const result = await download(req.body.url);

            result?.data?.map((video, index) => {
                return res.status(200).send(video?.media)
            })
        } else {
            const result = await download(req.body.url);

            console.log(result.data)
            return res.status(200).send(result?.data?.media)
        }
    } catch (err) {
        console.log(err);
    }

})

const PORT = 5000;

app.listen(process.env.PORT || PORT, () => {
    console.log('Server running')
})