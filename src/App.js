import React, { Component }  from 'react';
import {getToken} from './getToken';
import './App.css';
import { Container } from 'reactstrap';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
const speechSDK = require('microsoft-cognitiveservices-speech-sdk');

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      displayText: 'Click Microphone Icon to Speak.....'
    }
  }

  async componentDidMount(){
    //Checking the Validity of Token from API
    const response = await getToken();
    if(response.appServiceToken === null){
      this.setState({
        displayText: 'FATAL-ERROR: ' + response.error
      });
    }
  }

  async audioFromMicrophone(){
    const response = await getToken();
    const token = response.appServiceToken;
    const region = response.appServiceRegion;
    //const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJjZW50cmFsaW5kaWEiLCJzdWJzY3JpcHRpb24taWQiOiIyOGExOGUxNGE1NGM0ODZkOWRmMjM3NTg1YzZmMzM5MCIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy8zNTA2NTc3NC0yNjhlLTRiNjAtYWRkZC0yM2VmMDllNzI2NDYvcmVzb3VyY2VHcm91cHMvdHdpdHRlci1zcGFjZXMtYXBwL3Byb3ZpZGVycy9NaWNyb3NvZnQuQ29nbml0aXZlU2VydmljZXMvYWNjb3VudHMvc3BlZWNodG90ZXh0Iiwic2NvcGUiOiJzcGVlY2hzZXJ2aWNlcyIsImF1ZCI6InVybjptcy5zcGVlY2hzZXJ2aWNlcy5jZW50cmFsaW5kaWEiLCJleHAiOjE2NjA0NjA0NjUsImlzcyI6InVybjptcy5jb2duaXRpdmVzZXJ2aWNlcyJ9.x4zrad30EybeL6NRBZAar3BJ-IE3nOxbrtQIiJW1ncc";
    //const region = "centralindia";
    const speechConfig = speechSDK.SpeechConfig.fromAuthorizationToken(token, region);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = speechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechSDK.SpeechRecognizer(speechConfig, audioConfig);

    setTimeout(function() { 
      this.setState({displayText: 'Speak Now.....'}) //After 2 second, set displayText
    }.bind(this), 2000);

    recognizer.recognizeOnceAsync(result=>{
      let displayText;
      console.log(result);
      if(result.reason === ResultReason.RecognizedSpeech){
        displayText = `Text I heard is.... ${result.text}`;
      }else{
        displayText = `I could not get your voice.....`;
      }
      this.setState({
        displayText: displayText
      });
    });
  }
  
  render(){
    return(
       <Container className='app-container'>
         <h1 className="display-4 mb-3">Search for Spaces</h1>
         <div className="row main-container">
         <div className="col-6">
         <i className="fas fa-microphone fa-lg mr-2" onClick={() => this.audioFromMicrophone()}></i>
         Convert speech to text from your mic.
         </div>
         <div className='col-6 output-display rounded'>
         <code>{this.state.displayText}</code>
         </div>
         </div>
       </Container>
    );
  }
}
