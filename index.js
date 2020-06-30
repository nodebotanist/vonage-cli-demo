const https = require('https')
const fs = require('fs')

const uuid = require('uuid')
const jwt = require('jsonwebtoken')
require('dotenv').config()
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
  const key = fs.readFileSync('./private.key')
  const jti = uuid.v1()
  const iat = parseInt(Date.now() / 1000, 10)
  const token = jwt.sign({
    jti,
    iat,
    application_id: process.env.VONAGE_APPLICATION_ID
  }, key, {algorithm: 'RS256'})

  const body = JSON.stringify({
    to: {
      type: 'sms',
      number: '15129680474'
    },
    from: {
      type: 'sms',
      number: '12406586863'
    },
    message: {
      content: {
        type: 'text',
        text: 'Hello'
      }
    }
  })
  const options = {
    hostname: 'api.nexmo.com',
    path: '/v0.1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Content-Length': body.length
    }
  }
  const req = https.request(options, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`${data}`);
    })
  })
  req.write(body)
}