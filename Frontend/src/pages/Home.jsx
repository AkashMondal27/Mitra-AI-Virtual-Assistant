import React, { useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { useContext } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useRef } from 'react';

function Home() {

  //import the image 
  const { userData, serverUrl, setUserData, getGemeniResponse } = useContext(userDataContext);
  const navigate = useNavigate();
   
  //for the listeninng time 
  const[listening ,setListening ]=useState(false);
  const isSpeakingRef=useRef(false);
  const recognitionRef=useRef(null)
  const synth=window.speechSynthesis;


 // 👇 this will print all the availabe voices & languages i have in my computer 
  useEffect(() => {
    const loadVoices = () => {
      console.log("Gender:", userData?.assistantGender); // show the gender of Assistant 
      const voices = window.speechSynthesis.getVoices();

      console.log("Available Voices:");

      voices.forEach((voice, index) => {
        console.log(index, voice.name, "-", voice.lang);
      });
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);










  //Log out funcaton
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      navigate("/signin")

    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  //Start funcation 
  const startRecognition=()=>{
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (error) {
       if(!error.message.includes("start")){
        console.log("Recognition error : ", error);
       }
    }
  }

  //make a funcation to speak the  assistant 
  // const speak = (text) => {
  //   const utterence = new SpeechSynthesisUtterance(text);  // this class make the text to speech level
        
  //   //   utterence.lang='hi-IN';
  //   // const voices=window.speechSynthesis.getVoices()
  //   //   const hindiVoice=voices.find(v=>v.lang==="hi-IN")
  //   //   if(hindiVoice){
  //   //     utterence.voice=hindiVoice;
  //   //   } 
  //   isSpeakingRef.current=true;
  //   utterence.onend=()=>{
  //     isSpeakingRef.current=false;
  //     // recognitionRef.current?.start();
  //     startRecognition();
  //   }
  //   synth.speak(utterence) // make to speech level code to real speech

  // }

 

// Function to make the assistant speak
const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);

  // Get all available voices
  const voices = window.speechSynthesis.getVoices();

  // Select voice based on assistant gender
  if (userData?.assistantGender === "female") {
    const femaleVoice =
      voices.find((v) => v.name.includes("Zira")) ||
      voices.find((v) => v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.name.includes("Heera"));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.pitch = 1.2; // Slightly higher voice
  } else {
    const maleVoice =
      voices.find((v) => v.name.includes("David")) ||
      voices.find((v) => v.name.includes("Mark"));

    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.pitch = 0.9; // Slightly deeper voice
  }

  // Common speech settings
  utterance.rate = 1;
  utterance.volume = 1;

  // If you want Hindi responses, uncomment the next line
  utterance.lang = "hi-IN";

  // Stop listening while speaking
  isSpeakingRef.current = true;

  // Restart listening after speech ends
  utterance.onend = () => {
    isSpeakingRef.current = false;
    startRecognition();
  };

  // Speak
  synth.speak(utterance);
};
















  // make Funcation to hsadle the command like open youtube etc.
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
      if(type==="general"){
       speak(response);
      }
   

      else if (type === "google_search") {

        window.open(
         `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
         "_blank"
        );
        speak(`Here is some information about ${userInput} `);
      }
     else if (type === "youtube_play" || type ==="youtube_search") {
         window.open(
         `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
          "_blank"
      );
          speak(`Playing ${userInput} on YouTube`);
      }

      else if (type === "calculator_open") {
           window.open(
         "https://www.google.com/search?q=calculator",
          "_blank"
        );
      }

      else if (type === "instagram_open") {
         window.open("https://www.instagram.com", "_blank");
      }

      else if (type === "facebook_open") {
        window.open("https://www.facebook.com", "_blank");
      }

      else if (type === "weather_show") {
         window.open(
          `https://www.google.com/search?q=weather+${encodeURIComponent(userInput)}`,
          "_blank"
          );
      }
      else if (
         type === "get_time" ||
         type === "get_date" ||
         type === "get_day" ||
         type === "get_month"
        ) {
           speak(response);
      }
      else {
        console.log("Sorry, I couldn't understand that command.")
          speak("Sorry, I couldn't understand that command.");
        }
    }
   

     // Voice Recocnize :- What user will say , it will take that sentances/words and convert to text , so that user can see what he said 

   useEffect(() => {
    const SpeechRecognition =   window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continuous = true;
    recognition.lang = "en-US"

    
    recognitionRef.current=recognition

    const isRecognizeRef={current:false}

    const safeRecognition=()=>{
      if(!isSpeakingRef.current && !isRecognizeRef.current){
        try {
          recognition.start();
          console.log('Recognition requested to start')
        } catch (error) {
          if(error.name !="InvalidStateError")
          console.log("Start error : ".error)
        }
      }
    }
    
    recognition.onstart=()=>{
      console.log("Recognition started");
      isRecognizeRef.current=true;
      setListening(true);
    };
   
    recognition.onend=()=>{
      console.log("recognition ended");
      isRecognizeRef.current=false;
      setListening(false);


       if(!isSpeakingRef.current){
      setTimeout(()=>{
        safeRecognition();
      },1000);
     }
    };

  recognition.onerror=(event)=>{
    console.warn("recognition error : ",event.error);
    isRecognizeRef.current=false;
    setListening(false);
    if(event.error !="aborted" && !isSpeakingRef.current){
      setTimeout(()=>{
        safeRecognition();

      },1000);
    }
  }
   


    recognition.onresult = async (e) => {  // this will give what user say
      console.log(e)
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("user question  : " + transcript)
      console.log("Assistant Name:", userData?.assistantName);

      //if we take the Assistant name to comment , then it will send to Gemini to take ans 
      if ( userData && transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {

        recognition.stop();
        isRecognizeRef.current=false;
        setListening(false);
        const data = await getGemeniResponse(transcript);
        console.log(data);
        // speak(data.response);
        handleCommand(data);
      }
    }
     // check every 10 sec that the microphone reconition is strted or not    
    const fallback=setInterval(()=>{
      if(!isSpeakingRef.current && !isRecognizeRef.current){
        safeRecognition();
      }

    },10000)
    
    safeRecognition();

    return()=>{
      recognition.stop();
      setListening(false);
      isRecognizeRef.current=false;
      clearInterval(fallback)
    }

   }, [])






   return (
    <div className='w-full min-h-screen bg-linear-to-t from-[black] to-[#010b38] flex 
                   justify-center items-center md:py-3 p-0 flex-col gap-4 ' >




      <button //Assiatant Setup
        className="
            absolute top-0 right-8
            group
            w-[90%]
            max-w-35
            h-9
            mt-7 
            rounded-full
            bg-linear-to-r from-blue-700 to-blue-1000
           text-white  text-sm 
            border-2 border-blue-900
            cursor-pointer
            shadow-lg shadow-cyan-500/30
            hover:shadow-cyan-500/50
            hover:scale-105
            transition-all duration-100
            flex
            gap-2
            justify-center
            items-center
            mx-auto"
        onClick={() => navigate("/customize")}>
        Assistant Setup
        <IoArrowBackSharp className='rotate-180' />
      </button>

      <button //Log Out 
        className="
            absolute top-0 left-8
            group
            w-[90%]
            max-w-25
            h-8
            mt-7
            rounded-full
            bg-linear-to-r from-blue-700 to-blue-1000
           text-white  text-sm       
            border-2 border-blue-900
            cursor-pointer
            shadow-lg shadow-cyan-500/30
            hover:shadow-cyan-500/50
            hover:scale-105
            transition-all duration-100
            flex
            gap-2
            justify-center
            items-center
            mx-auto"
        onClick={handleLogOut}>
        <TbLogout2 />
        Log Out

      </button>

      <div className='md:w-70 w-60 md:h-90 h-90 flex justify-center overflow-hidden items-center rounded-4xl'>
        <img src={userData?.assistantImage} alt="Assistant"
          className='w-full h-full object-cover shadow-lg ' />
      </div>

      <h1 className="text-white font-semibold text-[18px]">
        I am {userData?.assistantName || "your Assistant"}
      </h1>

    </div>

  )
}

export default Home 
