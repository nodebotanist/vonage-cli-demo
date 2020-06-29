const argv = require('yargs')
  .command({
    command: 'balance',
    aliases: ['bal'],
    desc: 'See your Vonage account balance',
    handler: getBalance
  })
  .command({
    command: 'send [recipient] [message]',
    desc: 'Send an SMS messgage'
  })
  .demandCommand(1, 'Please enter a command to continue')
  .help()
  .argv

console.log(argv)

function getBalance(){
}