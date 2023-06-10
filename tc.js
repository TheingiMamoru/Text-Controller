//variables
const fonts = ["Comic Sans MS", "Forte Regular", "Centaur Regular"];

//selectors

const output = document.querySelector("#output");
const text = document.querySelector("#text");
const count = document.querySelector("#count");
const color = document.querySelector("#color");
const fontSize = document.querySelector("#fontSize");
const fontFamily = document.querySelector("#fontFamily");
const textToSpeech = document.querySelector("#textToSpeech");
const speakToText = document.querySelector("#speakToText");

//textToSpeech
const synth = window.speechSynthesis;


const speak = (text) => {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.rate = 0.7; //for speed
    utterThis.voice = synth.getVoices()[2];
    //speaker icon active
    utterThis.addEventListener("start",() => {
        textToSpeech.classList.add("speaker-active");
    });
    utterThis.addEventListener("end",() => {
        textToSpeech.classList.remove("speaker-active");
    });

    synth.speak(utterThis)
}

//Speech Recognition
const listen = () => {
    const recognition = new webkitSpeechRecognition();
    //set the language and start recognizing
    recognition.lang = "en-US";
    recognition.start();

    // when a speech is returned
    recognition.onresult = (event) => {
        console.log(event.results[0][0].transcript);
        let transcript = event.results[0][0].transcript;
        text.value += transcript;
    }
};


fonts.forEach(font => {
    fontFamily.append(new Option(font, font));
})


//actions
fontFamily.addEventListener("change", e => {
    output.style.fontFamily = e.target.value;
})


//text ထဲမှာ စာရိုက်ရင် output မှာ ပြမယ်

text.addEventListener("keyup", event => {
    // console.log(text.value);
    // console.log(event.target.value);
    output.innerText += text.value;

    //ရိုက်တဲ့ စာလုံးအရေအတွက်ကို count မှာ လာပြမယ်
    // console.log(event.target.value.length);
    count.innerText = event.target.value.length;
});

color.addEventListener("change", e => {
    output.style.color = color.value;
})

fontSize.addEventListener("change", e => {
    // console.log(e.target.value);
    output.style.fontSize = e.target.value + "px";
});

//Text To Speech
textToSpeech.addEventListener("click",() => {
    speak(text.value);
})

//Speak To Text
speakToText.addEventListener("click", () => {
    listen();
})