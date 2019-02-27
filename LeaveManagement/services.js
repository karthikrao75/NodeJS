const axios = require('axios')

const baseUrl = "http://localhost:8080";

const getWelcomeMessage = async () => {
    try {
      return await axios.get(baseUrl+'/hello');
    } catch (error) {
      console.error(error);
    }
  }

  const getLeavePlan = async (userName) => {
    try {
      return await axios.get(baseUrl+'/leave?userName='+userName);
    } catch (error) {
      console.error(error);
    }
  }


  exports.welcomeMessage = async () => {
    const message = await getWelcomeMessage();
    console.log(message.data);
    return message.data;
  }

  exports.leavePlan = async (userName) => {
    const leave = await getLeavePlan(userName);
    console.log(leave.data);
    return leave.data;
  }