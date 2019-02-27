const Alexa = require('ask-sdk-core')
const services = require('./services')

var applicationName = 'LeaveManagement'

var welcomeMessage = 'Welcome to leave Manager. You can plan leaves or know up coming leave plans here'
var question = 'would you like to plan you leaves or know up coming leave plans?'
var helpMessage = 'Plan your leave here'

services.leavePlan("karthik");

const LaunchRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle (handlerInput) {
    const speechText = welcomeMessage;
   // speechText = services.welcomeMessage();

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
  handle (handlerInput) {
    const speechText ='Leave plans for ' +handlerInput.requestEnvelope.request.intent.slots.user.value;

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

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    NoIntentHandler,
    getUserLeavePlansHandler,
    addUserLeavePlansHandler 
	).addErrorHandlers(ErrorHandler).lambda()