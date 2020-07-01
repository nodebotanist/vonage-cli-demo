# Vonage cli demo

## Installation

clone this repository, and in your terminal in the repo folder: `npm i`

## Setup 

You'll need to create a `.env` file in the repo folder with the following format:

```
VONAGE_APPLICATION_ID="YOUR_VONAGE_APPLICATION_ID"
VONAGE_API_KEY="YOUR_VONAGE_API_KEY"
VONAGE_API_SECRET="YOUR_VONAGE_API_SECRET"
```

You can get the application ID when you create a Vonage application from the [App Dashboard](https://dashboard.nexmo.com/applications).

You can get the API key and secret from [your Vonage dashboard](https://dashboard.nexmo.com/).

Finally, you'll need to download your application's private key and place it in the repo folder as `private.pem`

## Running

`node index.js balance` will retrieve your Vonage balance

`node index.js send --to <number> --from <number> --message <message>` will send an SMS to `--to` with `--message` (emoji supported)