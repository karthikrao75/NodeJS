const axios = require('axios')

const baseUrl = "http://localhost:8080";

const get = async (url) => {
    try {
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }

  const addLeavePlan = async (leave) =>{
    try {
      return axios.post(baseUrl+'/leave',leave);
    } catch (error) {
      console.error(error);
    }
  }

  exports.welcomeMessage = async () => {
    const message = await get(baseUrl+'/hello');
    console.log(message.data);
    return message.data;
  }

  exports.leavePlan = async (userName) => {
    const leaves = await get(baseUrl+'/leave?userName='+userName);
    console.log(leaves.data);
    return leaves.data;
  }

  exports.users = async () => {
    const users = await get(baseUrl+'/users');
    console.log(users.data);
    return users.data;
  }

  exports.upcomingLeavePlans = async () =>{
    const leaves = await get(baseUrl+'/leave/upcoming');
    console.log(leaves.data);
    return leaves.data;
  }

  exports.addLeave = async (leave) =>{
    const leave = await addLeavePlan(leave);
    console.log(leave.data);
    return leave.data;
  }