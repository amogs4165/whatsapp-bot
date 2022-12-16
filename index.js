
  const qrcode = require('qrcode-terminal'); 
   
  const { Client } = require('whatsapp-web.js'); 
  const client = new Client(); 

  let recentContact = []
   
  client.on('qr', qr => { 
    qrcode.generate(qr, { small: true }); 
  }); 
   
  client.on('ready', () => { 
    console.log('Client is ready!'); 
  }); 
   
  client.on('message', message => { 
    console.log("message", message); 
    // let content = messageContent[Math.floor(Math.random() * messageContent.length)]; 
    let content = `Hi ${message._data.notifyName}, Amogh is currently busy please leave a message`
    if ((message.body || message.hasMedia) && message.author === undefined && !recentContact.includes(message._data.notifyName) && message._data.notifyName) { 
      client.sendMessage(message.from, content);
      recentContact.push(message._data.notifyName);
    } 
  }); 

  client.on('message_ack', test => {
    console.log(test, 'message ack')
  })

  setInterval(()=> {
      recentContact = [];
  },900000)

   
  client.initialize();
