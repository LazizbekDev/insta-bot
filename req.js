import axios from "axios";

const download = async (e) => {
    try {
        const res = await axios.get('https://instagram-downloader.p.rapidapi.com/insi.php', {
            headers: {
                'X-RapidAPI-Key': '06fdc64e18mshc6e2868dc26e1c6p1b76e6jsnd8718f1785de',
                'X-RapidAPI-Host': 'instagram-downloader.p.rapidapi.com'
            }
        })

        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

const options = {
    method: 'GET',
    url: 'https://instagram-downloader.p.rapidapi.com/insi.php',
    params: { li: '' },
    headers: {
        'X-RapidAPI-Key': '06fdc64e18mshc6e2868dc26e1c6p1b76e6jsnd8718f1785de',
        'X-RapidAPI-Host': 'instagram-downloader.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});