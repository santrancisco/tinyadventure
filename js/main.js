
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

function updateLanguage() {
    currentlanguage = document.getElementById("select_language").value;
    document.getElementById("note").innerHTML = scenarios[currentscenario].description[currentlanguage];
}


async function speak (text, opts) {
    //opts = opts || {}
    pauseallsound();
    await sleep(1000);
    responsiveVoice.speak(text[currentlanguage], languagelib[currentlanguage], opts)
}

currentsound=[];



function  playambience(sounds,timeout) {
    for (const [sound, time]  of Object.entries(sounds)) {
        if (time == 0){
           playsound(sound,time)
        }
    }
}

function  playsoundatspecifictime(sounds,timeout) {
    for (const [sound, time]  of Object.entries(sounds)) {
        if (time != 0){
           playsound(sound,time)
        }
    }
}

function  playsound(sound,timeout) {
    if (typeof currentsound[sound] != "undefined") {
        currentsound[sound].currentTime = 0;
    } else {
        s = soundlib[sound]
        var snd = new Audio(s.url)
        snd.volume=s.v;
        snd.loop=s.loop;
        currentsound[sound] = snd;
    }
    setTimeout(function(){currentsound[sound].play()},timeout*1000);   

}


function pauseallsound(){
    for (var i in currentsound){
        currentsound[i].pause();
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

runcounter = 0;
// function createfunc(s){
//     return function(){
//         playsound(s)
//     };
// }


async function setProgressbar(currentrun, timemax){
    var timeleft = timemax;
    while(1){
        console.log(timeleft)
            if (currentrun != runcounter){
                return;
            }
            document.getElementById("progressBar").value =   Math.round(((timemax-timeleft)/timemax)*10);
            timeleft -= 1000;
            if(timeleft <= 0){
                return;
            }
            document.getElementById("timeleft").innerHTML = Math.round(timeleft/1000)
        
        await sleep(1000);
    }
}

async function playscenario(fromstage){
    runcounter += 1;
    var currentrun = runcounter;
    pauseallsound();
    document.getElementById("playbutton").disabled = true;
    var s=scenarios[currentscenario];
    for (var i = 0; i < s.stages.length; i++){
        document.getElementById("stage-"+i).classList.remove("stagebttactive");
    }
    for (var i = fromstage; i < s.stages.length; i++){
        if (currentrun!=runcounter){
            console.log("Exit previous run")
            return
        }
        document.getElementById("narative").innerHTML = s.stages[i].read[currentlanguage];
        document.getElementById("stage-"+i).classList.add("stagebttactive");
        console.log(s.stages[i].sounds);
        playsoundatspecifictime(s.stages[i].sounds);
        speak(s.stages[i].read,{
            onend: function(){playambience(s.stages[i].sounds)}
            });
        await setProgressbar(currentrun, s.stages[i].time*1000)
        document.getElementById("stage-"+i).classList.remove("stagebttactive");
   }
   pauseallsound();
   speak(s.exit,{});
}

function getCurrentSenario() {
    var qs = document.location.search;

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
document.getElementById("note").innerHTML = scenarios[currentscenario].description[currentlanguage];
for (var i =0;i<scenarios[currentscenario].stages.length;i++){
    document.getElementById("stages").innerHTML+="<button class=\"btt stagebtt\" onclick=\"playscenario("+i+")\"id=\"stage-"+i+"\">"+i+"</div>"
}

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

