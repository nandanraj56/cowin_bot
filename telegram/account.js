const axios = require("axios")

let key = process.env.Telegram_API
let channel = process.env.group //Used to send notifications
let admin = process.env.me //Used to send error logs

const sendVaccineTelegram = (count)=>{
   
    let text = encodeURI(`Hi, ${count} Vaccine(s) available.`)
    let telegramUrl = 'https://api.telegram.org/bot'+key+'/sendMessage?chat_id='+channel+'&text='+text
    axios.get(telegramUrl)
    console.log("Telegram Sent "+count)
}
const sendErrorTelegram = (err)=>{
    let telegramUrl = 'https://api.telegram.org/bot'+key+'/sendMessage?chat_id='+admin+'&text='+err
    axios.get(telegramUrl)
    console.log(err)
}
module.exports = {
    sendVaccineTelegram,
    sendErrorTelegram
}