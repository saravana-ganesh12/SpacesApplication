import React, { Component }  from 'react';
import {getToken} from './getToken';
import {getSpaces} from './getSpaces';
import './Spaces.css';
import { Container } from 'reactstrap';

import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
const speechSDK = require('microsoft-cognitiveservices-speech-sdk');

export default class Spaces extends Component{

  constructor(props){
    super(props);
    this.state = {
      displayText: 'Click Microphone Icon to Speak.....',
      spacesFound: []
    }
  }

  async componentDidMount(){
    //Checking the Validity of Token from API
    const response = await getToken();
    if(response.appServiceToken === null){
      this.setState({
        displayText: 'FATAL-ERROR: ' + response.error,
        spacesFound: []
      });
    }
  }

  async audioFromMicrophone(){
    const response = await getToken();
    const token = response.appServiceToken;
    const region = response.appServiceRegion;
    const speechConfig = speechSDK.SpeechConfig.fromAuthorizationToken(token, region);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = speechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechSDK.SpeechRecognizer(speechConfig, audioConfig);

    setTimeout(function() { 
      this.setState({displayText: 'Speak Now.....', spacesFound: []}) //After 2 second, set displayText
    }.bind(this), 2000);

    recognizer.recognizeOnceAsync(async (result) => {
      let displayText; 
      let spacesFound = [];
      if(result.reason === ResultReason.RecognizedSpeech){
        const spaces = await getSpaces(String(result.text.split(/[.\s]+/).join('')).trim());
        const spacesResponse = spaces.data; 
        if(spaces.status === 404){
          displayText= "Error in getting the Spaces.....login again and try";
          spacesFound=  [];
        }
        else if(spaces.status === 200){
          if(spacesResponse.meta.result_count === 0){
             displayText= `No Spaces found for ${String(result.text.split(/[.\s]+/).join('')).trim()} as of Now`;
             spacesFound=  [];
          }
          else{
              displayText= `Searching for ${String(result.text.split(/[.\s]+/).join('')).trim()}.....\nHere is What I found.....`;
              spacesFound=  spacesResponse.data;
          }
        }
        }else{
          displayText = `I could not get your voice.....`;
          spacesFound = [];
        }
        this.setState({
           displayText: displayText,
           spacesFound: spacesFound
       });
    });
  }
  
  render(){
    return(
      <Container className='app-container'>
      <h1 className="display-4 mb-3">Search for Spaces</h1>
      <div className="row main-container">
      <div className="col-6">
      <i className="fas fa-microphone fa-lg md-2" onClick={() => this.audioFromMicrophone()}></i>
        &nbsp;&nbsp;Convert speech to text from your mic.
      </div>
      <br/>
      <br/>
      <div className='col-xl-10 output-display rounded'>
      <code>{this.state.displayText}</code>
      <br/>
      <br/>
      <ul>
        {this.state.spacesFound.map((i) => (<><li>{i.title}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;https://twitter.com/i/spaces/{i.id}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{i.state}</li><br/></>))}
      </ul> 
      </div>
      </div>
   </Container>
    )
  }
}
