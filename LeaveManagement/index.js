const Alexa = require('ask-sdk-core')
const services = require('./services')

var users=null;

var applicationName = 'LeaveManagement'

var welcomeMessage = 'Welcome to leave Manager. You can plan leaves or know up coming leave plans here'
var question = 'would you like to plan you leaves or know up coming leave plans?'
var helpMessage = 'Plan your leave here'

const LaunchRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle (handlerInput) {
    const speechText = welcomeMessage;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(question)
      .withSimpleCard(applicationName, speechText)
      .getResponse()
  }
}

const HelpIntentHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle (handlerInput) {
    const speechText = helpMessage

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}

const CancelAndStopIntentHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle (handlerInput) {
    const speechText = 'Goodbye!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse()
  }
}

const SessionEndedRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle (handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`)

    return handlerInput.responseBuilder.getResponse()
  }
}

const getUserLeavePlansHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'getUserleavePlans'
  },
  async handle (handlerInput) {
    let speechText ='';
    let user = handlerInput.requestEnvelope.request.intent.slots.user.value;
    await loadUsers();
    if(users.indexOf(user) > -1 ){
    let leaves = await services.leavePlan(user);
    console.log(" handlerInput "+leaves);
    speechText ='Up coming Leave plans for '+ user + ' are:';
    
    for(var i=0; i < leaves.length ; i++){
      let leave= leaves[i];
      console.log("leave record" +leave);
      if(i!==0){
        speechText = speechText+ " and"
      }
      speechText = speechText+ " "+ leave.userName + " has planned leave for "+ leave.leaveReason +" starting from "+leave.startDate+" to "+ leave.endDate;
      
    }
  } else{
    speechText ="Unable to find "+ user +". please use a valid user";
  }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(question)
      .withSimpleCard(applicationName, speechText)
      .getResponse()
  }
}

const addUserLeavePlansHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'addUserLeavePlans'
  },
  handle (handlerInput) {
    const speechText ='Leave plans for ' +handlerInput.requestEnvelope.request.intent.slots.user.value+' added succesfully';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(question)
      .withSimpleCard(applicationName, speechText)
      .getResponse()
  }
}
const getLeavePlansHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'getLeavePlans'
  },
  async handle (handlerInput) {
    let speechText = '';
    let leaves = await services.upcomingLeavePlans();
    if(leaves.length===0){
      speechText ='No up coming Leave plans available';
    }else{
      speechText ='Upcoming Leave plans are:';
    }

    for(var i=0; i < leaves.length ; i++){
      let leave= leaves[i];
      console.log("leave record" +leave);
      if(i!==0){
        speechText = speechText+ " and"
      }
      speechText = speechText+ " "+ leave.userName + " has planned leave for "+ leave.leaveReason +" starting from "+leave.startDate+" to "+ leave.endDate;
      
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}

const NoIntentHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
  },
  handle (handlerInput) {
    const speechText = question;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}

const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.log(`Error handled: ${error.message}`)

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse()
  }
}

const loadUsers = async function(){
  if(users === null){
    users = await services.users();
  }
}

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    NoIntentHandler,
    getUserLeavePlansHandler,
    addUserLeavePlansHandler ,
    getLeavePlansHandler
	).addErrorHandlers(ErrorHandler).lambda()