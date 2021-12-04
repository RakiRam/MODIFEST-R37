let count = 0
function invoke() {
    if(count %2 != 0){
        Speek("voice assistiant shutdown.")
        stopRocket();
    }
    else{
        Speek("Voice assistaint started.")
        startRecognization();
    }
    count += 1
}

function Speek(speechToSpeek) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(speechToSpeek));
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

function startRecognization() {
    recognition.interimResults = true;
    recognition.addEventListener('result', (e) => {
        let text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
        console.log(text);
        if (e.results[0].isFinal) 
        {
            text = text.toLowerCase()
            document.getElementById('voicetext').style.display="block";
            document.getElementById('voicetext').innerHTML = text;
            if (text.includes('nexa') || text.includes('hey nexa') ) 
            {
                switch (true)
                {
                    case text.indexOf('open') != -1:
                        if (text.includes("whatsapp")) 
                        {
                            Speek("opening whatsapp")
                            window.open("https://www.whatsapp.com/","_blank");
                        }
                        else if (text.includes('instagram') || text.includes('insta') || text.includes('reels')) 
                        {
                            Speek("Openig Instagram")
                            window.open("https://www.instagram.com/","_blank");
                        }
                        else if (text.includes('youtube') || text.includes('videos')) {
                            Speek("Opening Youtube")
                            window.open("https://youtube.com/","_blank");
                        }
                        else if(text.includes('twitter')||text.includes('tweet')){
                            Speek("Opening twitter")
                            window.open("https://twitter.com");
                        }
                        else if(text.includes('discord')||text.includes('Discord')){
                            Speek("Opening discord")
                            window.open("https://discord.com/channels/@me");
                        }
                        else{
                            Speek("These are the Results i found")
                            idx = text.indexOf('open')
                            tosearch = text.slice(idx+5)
                            window.open('https://www.google.com/search?q='+tosearch);   
                        }
                        break;
                    case text.indexOf('search') != -1:
                        idx = text.indexOf('search')
                        tosearch = text.slice(idx+7)
                        Speek("searching "+tosearch)
                        window.open('https://www.google.com/search?q='+tosearch);
                        break
                    case text.indexOf('help') != -1 || text.indexOf('show commands'):
                        Speek("These are the commands");
                        document.getElementById("help").click();
                        break
                    case text.indexOf('weather') != -1 || text.indexOf('climate'):
                        Speek("current temperature is "+wheatherreport()+"degree centigrades ");
                        if(wheatherreport() < 30)
                        {
                            document.getElementById('logo').src="./images/cold.gif";
                        }
                        else if(wheatherreport() >= 30)
                        {
                            document.getElementById('logo').src="./images/hot.gif";
                        }
                        else{
                            document.getElementById('logo').src="./images/shut.gif";
                        }

                        break
                    case (text.indexOf('i am') != -1) || (text.indexOf('iam') != -1 || text.indexOf('its') != -1 || text.indexOf('lets') != -1):
                        if ( (text.indexOf('surprise') != -1)||(text.indexOf('surprised') != -1))
                        {
                            document.getElementById('logo').src="./images/whooaa.gif";
                            Speek("");
                        }
                        else if ( (text.indexOf('angry') != -1)){
                            document.getElementById('logo').src="./images/angry.gif";
                        }
                        else if ( (text.indexOf('funny') != -1)||  (text.indexOf('fun') != -1)){
                            document.getElementById('logo').src="./images/laugh.gif";
                        }
                        else if ( (text.indexOf('sad') != -1) ||  (text.indexOf('unhappy') != -1)){
                            document.getElementById('logo').src="./images/sad.gif";
                        }
                        else if ( (text.indexOf('party') != -1) ||  (text.indexOf('') != -1)){
                            document.getElementById('logo').src="./images/part.gif";
                        }
                        break
                    default:
                        Speek('Command not found .. please follow these commands');
                        document.getElementById("help").click();
                        break
                }
            }
        }
    })
    recognition.addEventListener('end', () => {
        recognition.start();
    })
    recognition.start();
}
function stopRocket() {
    recognition.stop();
}

function wheatherreport()
{
    let lon;
    let lat;
    const kelvin = 273;
    window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        const api = "6d055e39ee237af35ca066f35474e9df";
        const base =
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
    `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;
        fetch(base)
            .then((response) => {
            return response.json();
            })
            .then((data) => {
            // console.log(data);
            let temperature = Math.floor(data.main.temp - kelvin);
            return temperature;
            });
        });
    }
    });
}

