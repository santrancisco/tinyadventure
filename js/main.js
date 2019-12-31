
var soundlib = {
	"windy":{"url":"https://actions.google.com/sounds/v1/weather/strong_wind.ogg","v":1.0, "loop":true},
    "rain":{"url":"https://actions.google.com/sounds/v1/weather/light_rain.ogg","v":1.0, "loop":true},
    "heavy_rain":{"url":"https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg","v":1.0, "loop":true},
    "thunder_storm":{"url":"https://actions.google.com/sounds/v1/weather/thunderstorm_long.ogg","v":1.0, "loop":true},
    "warm_breeze":{"url":"https://actions.google.com/sounds/v1/weather/leaves_russle_on_tree.ogg","v":1.0, "loop":true},
    "distant_thunder":{"url":"https://actions.google.com/sounds/v1/weather/distant_thunder.ogg","v":1.0, "loop":true},
    // BELOW ARE fun ambiance sounds
    "fire":{"url":"https://actions.google.com/sounds/v1/ambiences/fire.ogg","v":0.8,"loop":true},
    "daylight_fire":{"url":"https://actions.google.com/sounds/v1/ambiences/daytime_forrest_bonfire.ogg","v":0.8, "loop":true},
    "coffee_shop":{"url":"https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg","v":0.8, "loop":true},
    "farm_animal":{"url":"https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg","v":0.8, "loop":true},
    "quiet_night":{"url":"https://actions.google.com/sounds/v1/ambiences/july_night.ogg","v":0.8, "loop":true},
    "fresh_morning_farm":{"url":"https://actions.google.com/sounds/v1/ambiences/morning_farm.ogg","v":0.8, "loop":true},
    "chicken_morning_farm":{"url":"https://actions.google.com/sounds/v1/ambiences/outdoor_farm_sounds.ogg","v":0.8, "loop":true},
    "bird_chirping_morning":{"url":"https://actions.google.com/sounds/v1/ambiences/outdoor_summer_ambience.ogg","v":0.8, "loop":true},
    "cricket_night":{"url":"https://actions.google.com/sounds/v1/ambiences/outside_night.ogg","v":0.8, "loop":true},
    "warm_afternoon":{"url":"https://actions.google.com/sounds/v1/ambiences/warm_afternoon_outdoors.ogg","v":0.8, "loop":true},
    "warm_night":{"url":"https://actions.google.com/sounds/v1/ambiences/warm_evening_outdoors.ogg","v":0.8, "loop":true},
    "outdoor_busy_people":{"url":"https://actions.google.com/sounds/v1/ambiences/outdoor_event_background_noise.ogg","v":0.3, "loop":true},
    // WEAPON - not loop
    "rifle_echo_long":{"url":"https://actions.google.com/sounds/v1/weapons/rifle_shot_echo.ogg","v":0.5, "loop":false},
    "":{"url":"","v":0.8, "loop":true},
    "":{"url":"","v":0.8, "loop":true},
    "":{"url":"","v":0.8, "loop":true},
    "":{"url":"","v":0.8, "loop":true},
};

currentlanguage="en";

languagelib={
    "en":"UK English Male",
    "vn":"Vietnamese Female"
};

var scenarios = [
    {
        "description":"It is 2045, a war broke out and your family is wondering through the apocalyptic land.",
        "stages":[
            {
                "time": 30000,
                "read":{
                    "en":"You are wondering through an abandoned town but there is no sign of living. A storm is approaching in and you must find food and shelter."
                },
                "sound":{
                    "windy":0,
                    "rifle_echo_long":15000
                }
            },
            {
            	"time": 30000,
                "read": {
                    "en":"While sitting around the campfire you heard a gun shoot and small noises outside the door. You take a look and found a wounded and exhausted dog outside."
                },
                "sound":{
                    "thunder_storm":0,
                    "fire":0,
                }
         	}
        ],
        "exit": ["Feeling fresh and ready, you can finally leave the town."]
    },
    {
        "description":"It is 1940, In the middle of world war 2, you and your family managed to escape to a farm.",
        "stages":[
            {
                "time": 20000,
                "read":{
                    "en":"Everyone stretch their legs and get out of the tent. It is important to keep your self healthy. You gather everyone and start your daily exercise."
                },
                "sound":{
                    "chicken_morning_farm":0
                }
            },
            {
            	"time": 30000,
                "read": {
                    "en":"Dark clouds gather quickly. It's time to head back into the tent and wait for the rain to finish."
                },
                "sound":{
                    "heavy_rain":0,
                    "thunder_storm":10000
                }
         	}
        ],
        "exit": ["Feeling fresh and ready, you can finally leave the farm."]
    }
];

async function speak (text, opts) {
    //opts = opts || {}
    pauseallsound();
    await sleep(1000);
    console.log(languagelib[currentlanguage])
    console.log(text)
    responsiveVoice.speak(text, languagelib[currentlanguage], opts)
}

currentsound=[];

async function  playsound(sounds,timeout) {
    for (const [sound, time]  of Object.entries(sounds)) {
        console.log(sound)
        if (typeof currentsound[sound] != "undefined") {
            currentsound[sound].currentTime = 0;
        } else {
            s = soundlib[sound]
            var snd = new Audio(s.url)
            snd.volume=s.v;
            snd.loop=s.loop;
            currentsound[sound] = snd;
        }
        setTimeout(function(){currentsound[sound].play()},time);   
    }
}

var pauseallsound=function(){
    for (i in currentsound){
        currentsound[i].pause();
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function createfunc(s){
    return function(){
        playsound(s)};
    }
  async function playscenario(s){
    document.getElementById("playbutton").disabled = true;
    for (var i = 0; i < s.stages.length; i++){
        speak(s.stages[i].read[currentlanguage],{
            onend: createfunc(s.stages[i].sound)
            });
        await sleep(s.stages[i].time);
   }
}

function getCurrentSenario() {
    qs = document.location.search;

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    if ((typeof params.s != "undefined")&&(params.s >= 0) && (params.s < scenarios.length)) {
        return parseInt(params.s);
    }
    return 0
    
}

currentscenario = getCurrentSenario()
document.getElementById("note").innerHTML = scenarios[currentscenario].description;

function previousscenario(){
    if (currentscenario == 0) {
        currentscenario = scenarios.length - 1
    } else {
        currentscenario -= 1;
    }
    document.location.href=document.location.origin+"/?s="+currentscenario;
}

function nextscenario(){
    if (currentscenario == scenarios.length - 1) {
        currentscenario = 0
    } else {
        currentscenario += 1;
    }
    document.location.href=document.location.origin+"/?s="+currentscenario;

}

