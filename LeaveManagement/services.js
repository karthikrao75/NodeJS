const axios = require('axios')

const getWelcomeMessage = async () => {
    try {
      return await axios.get('http://ip-172-31-95-29.ec2.internal:8080/hello');
    } catch (error) {
      console.error(error);
    }
  }


  exports.welcomeMessage = async () => {
    const message = await getWelcomeMessage();
    console.log(message.data);
    return message.data;
  }