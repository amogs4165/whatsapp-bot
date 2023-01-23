require('dotenv').config();
const qrcode = require('qrcode-terminal'); 
const { Configuration, OpenAIApi } = require("openai");
const { Client } = require('whatsapp-web.js'); 
const client = new Client(); 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
  
const openai = new OpenAIApi(configuration);


try {
  client.on('qr', qr => { 
    qrcode.generate(qr, { small: true }); 
  }); 
    
  client.on('ready', () => { 
    console.log('Client is ready!'); 
  }); 
    
  client.on('message',  async (message) => { 
    if(message.body && message.body.includes('@raj')) {
      const ms = message.body.substring(4);
      const {data} =  await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ms,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      client.sendMessage(message.from, data.choices[0].text);
    }
  }); 
    
  client.initialize();
  
} catch (error) {
  console.error(error);
}
