const axios = require('axios')

const getWelcomeMessage = async () => {
    try {
      return await axios.get('http://ec2-3-95-147-224.compute-1.amazonaws.com:8080/hello');
    } catch (error) {
      console.error(error);
    }
  }


  exports.welcomeMessage = async () => {
    const message = await getWelcomeMessage();
    console.log(message.data);
    return message.data;
  }