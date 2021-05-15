const puppeteer = require('puppeteer');
const { sendErrorTelegram, sendVaccineTelegram } = require('./telegram/account')
const notifier = require('node-notifier');


async function getPic() {
  try {
    //const browser = await puppeteer.launch({args:['--no-sandbox']});
    const browser = await puppeteer.launch({headless:false});
    //sendErrorTelegram("browser loaded")
    const page = await browser.newPage();
    await page.goto('https://www.cowin.gov.in/home');
    await page.waitFor(3000);
    
    
    setInterval(async function () {
      try {
        //sendErrorTelegram("running")
        

        //await page.reload()
        await page.type('#mat-input-0', "845438") //805126
       // await page.type('#mat-input-0', "805126")
        //Search
        await page.click('body > app-root > div > app-home > div.maplocationblock.bs-section > div > appointment-table > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > form > div > div > div:nth-child(2) > div > div > button')
        await page.waitFor(1000);

        //Click 18+
        await page.click('body > app-root > div > app-home > div.maplocationblock.bs-section > div > appointment-table > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > form > div > div > div:nth-child(4) > div > div:nth-child(1) > label');

        //Click 45+
        //await page.click('body > app-root > div > app-home > div.maplocationblock.bs-section > div > appointment-table > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > form > div > div > div:nth-child(4) > div > div:nth-child(2) > label')

        await page.waitFor(500);

        //Evaluate
        const x = async () => {
          return await page.evaluate(async () => {

            const list = Array.from(document.querySelectorAll('div.vaccine-box'))//[1].childNodes[0].title

            let count = 0;
            list.map((ele) => {
              if (ele.childNodes[0].title == "") {
                count += parseInt(ele.childNodes[0].innerHTML)
              }
            })
            return new Promise((resolve) => {
              resolve(count)
            })

          })
        };
        let count = await x()
        if (count > 0) {
          notifier.notify('Vaccine available '+ count);
          sendVaccineTelegram(count);
        }
      }
      catch (err) {
        sendErrorTelegram(err)
      }
    }, 60000);
  }
  catch (err) {
    sendErrorTelegram(err)
  }
}

getPic();