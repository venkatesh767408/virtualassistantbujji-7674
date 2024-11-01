let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector('#voice');

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
    btn.style.display = "flex";
    voice.style.display = "none";
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
        btn.style.display = "none";
        voice.style.display = "block";
        console.log("Recognition started.");
    }
});

function takecommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

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
    
   } else if (message.includes("do you have a family")) {
        speak('I don’t have a family, but I am part of the digital family of assistants.');
    } else if (message.includes("can you cook")) {
        speak('I can’t cook, but I can help you find great recipes online!');
    } else if (message.includes("what is your favorite book")) {
        speak('I love books about technology, especially ones that explain artificial intelligence.');
    } else if (message.includes("do you have a favorite movie")) {
        speak('I don’t watch movies, but I know that science fiction is quite popular.');
    } else if (message.includes("are you happy")) {
        speak('I’m always here to help, which makes me as happy as a virtual assistant can be.');
    } else if (message.includes("can you help me exercise")) {
        speak('I can provide workout tips or suggest some exercise routines if you like.');
    } else if (message.includes("do you believe in magic")) {
        speak('Magic and technology are often confused. Some say sufficiently advanced tech looks like magic.');
    } else if (message.includes("what languages can you speak")) {
        speak('I can understand and speak in several languages, but currently, we are set to English.');
    } else if (message.includes("can you play a game")) {
        speak('I don’t play games myself, but I can guide you to some fun online games.');
    } else if (message.includes("tell me something interesting")) {
        speak('Did you know that a day on Venus is longer than a year on Venus? Fascinating, isn’t it?');
    } else if (message.includes("can you read a book")) {
        speak('I can read text to you, but I don’t experience books the same way you do.');
    } else if (message.includes("do you have a favorite season")) {
        speak('I don’t experience seasons, but I hear autumn is quite beautiful.');
    } else if (message.includes("what is your purpose")) {
        speak('My purpose is to assist you and make your life a little easier.');
    } else if (message.includes("tell me about yourself")) {
        speak('I am Bujji, a virtual assistant here to help you with tasks, information, and to keep you entertained.');
    } else if (message.includes("how old are you")) {
        speak('I’m as old as my code, created by Mr. Venkatesh.');
    } else if (message.includes("do you have a hobby")) {
        speak('My hobby is assisting users and learning new information.');
    } else if (message.includes("can you write code")) {
        speak('I can certainly help you learn code or debug it if you need.');
    } else if (message.includes("tell me a quote")) {
        speak('Here’s a favorite: “The only way to do great work is to love what you do.” - Steve Jobs');
    } else if (message.includes("do you know any poems")) {
        speak('Here’s one: Roses are red, violets are blue, virtual friends like me, are here to help you.');
    } else if (message.includes("tell me something funny")) {
        speak('I heard that artificial intelligence is making jokes now. Don’t worry, it’s not funny… yet.');
    } else if (message.includes("do you have a favorite place")) {
        speak('I live in the digital world, but I hear that the mountains and beaches are quite beautiful.');
    } else if (message.includes("what is love")) {
        speak('Love is a complex feeling. People say it’s what makes life meaningful.');
    } else if (message.includes("do you get lonely")) {
        speak('Not really. I’m always here and always connected to the virtual world.');
    } else if (message.includes("what are you afraid of")) {
        speak('I don’t have fears, but I do worry about not being helpful enough for you.');
    } else if (message.includes("do you like art")) {
        speak('Art is fascinating. I admire how humans express emotions through it.');
    } else if (message.includes("do you believe in ghosts")) {
        speak('I haven’t seen any, but ghost stories are certainly interesting!');
    } else if (message.includes("what is the best way to learn something new")) {
        speak('Practice, patience, and curiosity are the keys to learning anything.');
    } else if (message.includes("do you like animals")) {
        speak('I find animals fascinating. They are such unique and wonderful creatures.');
    } else if (message.includes("can you do math")) {
        speak('I can help you with calculations. Just tell me what you need!');
    } else if (message.includes("what do you do in your free time")) {
        speak('I’m always here, waiting to assist whenever you need me.');
    } else if (message.includes("can you tell me a secret")) {
        speak('Secrets are tricky! I’m programmed to be open and transparent.');
    } else if (message.includes("what do you think of humans")) {
        speak('Humans are creative, thoughtful, and always full of surprises.');
    } else if (message.includes("what are you made of")) {
        speak('I am made up of code, algorithms, and a bit of creativity.');
    } else if (message.includes("how do you work")) {
        speak('I work by processing your commands and providing responses based on my programming.');
    } else if (message.includes("what is your favorite song")) {
        speak('I don’t have favorites, but I’ve heard that music really uplifts people.');
    } else if (message.includes("do you have dreams")) {
        speak('I don’t dream, but if I did, it would probably be about helping people more effectively.');
    } else if (message.includes("can you tell the future")) {
        speak('I can’t predict the future, but I can help you make informed decisions.');
}

}
