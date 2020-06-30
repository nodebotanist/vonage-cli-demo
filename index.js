require('dotenv').config()
const https = require('https')
const argv = require('yargs')
  .command({
    command: 'nexmo balance',
    aliases: ['bal'],
    desc: 'See your Vonage account balance',
    handler: getBalance
  })
  .command({
    command: 'send [recipient] [message]',
    desc: 'Send an SMS messgage',
    handler: sendMessage
  })
  .demandCommand(1, 'Please enter a command to continue')
  .help()
  .argv

function getBalance(argv){
  https.get(`https://rest.nexmo.com/account/get-balance?api_key=${process.env.VONAGE_API_KEY}&api_secret=${process.env.VONAGE_API_SECRET}`, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`You have €${JSON.parse(data).value} in your Nexmo account.`);
    })
  })
}

function sendMessage(argv){

}