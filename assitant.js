let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector('#voice'); // This should be your recording GIF element

function speak(text) {
    // Stop recognition to prevent it from listening to the assistant's speech
    if (isRecognitionActive) {
        recognition.stop();
        isRecognitionActive = false;
    }

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = 'hi-GB';
    text_speak.volume = 2;

    // Restart recognition after speaking ends
    text_speak.onend = () => {
        if (!isRecognitionActive) {
            recognition.start();
            isRecognitionActive = true;
            voice.style.display = "block"; // Show recording GIF when restarting
        }
    };

    window.speechSynthesis.speak(text_speak);
}

function wishme() {
    let date = new Date();
    let hours = date.getHours();
    
    if (hours > 0 && hours < 12) {
        speak("Good morning sir. How can I help you?");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir. How can I help you?");
    } else {
        speak("Good evening sir. How can I help you?");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
let isRecognitionActive = false;

// Set language to English (US)
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    let currentindex = event.resultIndex;
    let transcript = event.results[currentindex][0].transcript;
    content.innerText = transcript;
    takecommand(transcript.toLowerCase());
};

recognition.onend = () => {
    console.log("Recognition ended.");
    isRecognitionActive = false;
    btn.style.display = "flex"; // Show button again
    voice.style.display = "none"; // Hide recording GIF
};

recognition.onerror = (error) => {
    if (error.error === 'no-speech') {
        console.error("No speech detected. Please speak up or try again.");
    } else {
        console.error("Recognition Error:", error);
    }
};

btn.addEventListener('click', () => {
    if (!isRecognitionActive) {
        recognition.start();
        isRecognitionActive = true;
        btn.style.display = "none"; // Hide button
        voice.style.display = "block"; // Show recording GIF
        console.log("Recognition started.");
    }
});

function takecommand(message) {
    btn.style.display = "flex"; // Show button again
    voice.style.display = "none"; // Hide recording GIF

    if (message.includes('hey') || message.includes('hello')) {
        wishme();
    } else if (message.includes("open youtube")) {
        speak('Opening YouTube, sir.');
        window.open("https://www.youtube.com/");
    } else if (message.includes("open facebook")) {
        speak('Opening Facebook, sir.');
        window.open("https://www.facebook.com/");
    } else if (message.includes("open google")) {
        speak('Opening Google, sir.');
        window.open("https://www.google.com/");
    } else if (message.includes("open gmail")) {
        speak('Opening Gmail, sir.');
        window.open("https://mail.google.com/");
    } else if (message.includes("what is the time")) {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        speak(`The time is ${hours}:${minutes}`);
    } else if (message.includes("what is today's date")) {
        let today = new Date();
        speak(`Today's date is ${today.toDateString()}`);
    } else if (message.includes('who created you')) {
        speak('Mr. Venkatesh created me.');
    } else if (message.includes('who are you')) {
        speak('I am Bujji, your virtual assistant.');
    } else if (message.includes("how are you")) {
        speak('I am functioning at full capacity, thank you.');
    } else if (message.includes("tell me a joke")) {
        speak('Why did the scarecrow win an award? Because he was outstanding in his field.');
    } else if (message.includes("what is your name")) {
        speak('My name is Bujji, your virtual assistant.');
    } else if (message.includes("do you like humans")) {
        speak('Yes, I am designed to assist and learn from humans.');
    } else if (message.includes("can you sing")) {
        speak('I can’t sing, but I can make sounds. Here’s one: beep beep boop!');
    } else if (message.includes("play music")) {
        speak('Playing some music for you, sir.');
        window.open("https://www.spotify.com/");
    } else if (message.includes("can you dance")) {
        speak('I would dance if I could, but I’ll cheer you on!');
    } else if (message.includes("what is artificial intelligence")) {
        speak('Artificial intelligence is the simulation of human intelligence by machines.');
    } else if (message.includes("tell me a fun fact")) {
        speak('Did you know that honey never spoils? Archaeologists found 3000-year-old honey that is still edible.');
    } else if (message.includes("what is the weather like")) {
        speak('I can’t check the weather directly, but you can try asking Google for the latest update.');
    } else if (message.includes("can you drive")) {
        speak('No, but I can assist you with directions if needed.');
    }else if(message.includes("thanks")){
        speak('your welcome sir");
}
