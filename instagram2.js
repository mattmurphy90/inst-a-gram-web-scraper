/* 
A Web Scraper that uses instagram logins to automically like and comment on most recent post
*/

// these are the requirements to work 
const puppeteer = require('puppeteer');
const { promisify } = require('util');

//dummy instagram accounts (these need to be real accounts so you would have to create actual accounts to function correctly);
const instaAccounts = [{username: "alexjeets95" , password: "Biblecamp08!"},{username: "jcdesigns09" , password: "jcpassword12321"},{username: "katiemurphy132" , password: "Killemsoftly"},{username: "jerseymike2001" , password: "zoolander9"},{username: "nelsonf.bk" , password: "NF12321"},{username: "jerryhandler.1995" , password: "jhandz1"}]

//Random number that is used to select one of the accounts to comment on the post
const randomNum = Math.floor(Math.random() * (instaAccounts.length + 1));
console.log("Random Number: " + randomNum);

//Acount that you want to be liked and commented on
const instagramSite = "https://www.instagram.com/mattsdrunk/";


// this loops through the dummy accounts and allows each one to login, find your instagram page, then like your photo. using the random number one of the dummy accounts is selected to make the comment
for (let i=0; i < instaAccounts.length; i++) {
  let scrape = async () => {
  let chromeOptions = {
  headless:true,
  defaultViewport: null,
  slowMo:10,
};
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let browser = await puppeteer.launch(chromeOptions);
  let page = await browser.newPage();
  await page.setViewport({width: 1200, height: 720})
  await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'networkidle2' }); // wait until page load
  await sleep(2000);
  await page.type('._2hvTZ.pexuQ.zyHYP[name="username"]', instaAccounts[i].username);
  await page.type('._2hvTZ.pexuQ.zyHYP[name="password"]', instaAccounts[i].password);

  await Promise.all([
            page.click('.sqdOP.L3NKy'),
            page.waitForNavigation({ waitUntil: 'networkidle2' })

  ]);

await sleep(2000);
await page.goto(instagramSite, { waitUntil: 'networkidle2' });
  await Promise.all([
            page.click('.Nnq7C.weEfm .v1Nh3' ),
  ]);
await sleep(2000);
  await Promise.all([
            page.click('.fr66n' ),
  ]);


// Update the comment where the text says insert comment here
if (i == randomNum) {
  await sleep(500);
  await Promise.all([
            page.type('.RxpZH textarea', "insert comment here"),
  ]);
  await sleep(2000);
  await Promise.all([
            page.click('.X7cDz button'),
  ]);
}  

let name = "finished " + " : " + instaAccounts[i].username + " : " + i;
browser.close();
console.log(name);
return "success";

};

scrape();
}