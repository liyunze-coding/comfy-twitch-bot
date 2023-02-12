const ComfyJS = require("comfy.js");
const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
require("dotenv").config();

const compliments = fs.readFileSync('./text_files/compliments.txt', 'utf8').split('\n');
const quotes = fs.readFileSync('./text_files/quotes.txt', 'utf8').split('\n');
const random_autoresponders = ["compliment", "quote"];

const commands = {
    'taskhelp':`{user} "!task [task]" to add your task to the list; "!done" when you're done with your task; "!remove" if you made a typo in the previous task.`,
    'lurk':`Thanks for lurking, {user}!`,
    'unlurk':`Welcome back {user}!`,
    'socials':`{user} here are Ryan's socials: https://liyunze-coding.github.io/socials.html`,
    'github':`{user} https://github.com/liyunze-coding`,
    'welcome':`{message} Welcome to Ryan's comfy stream, hope you enjoy your time here :D`,
    'website':`{user} Check out Ryan's website here: https://liyunze-coding.github.io/`,
    'hug':'{user} sends a hug to {message} <3 <3',
    'pat':"{user} pats {message} <3 <3",
    'bonk':'{user} bonks {message} >:(',
    'kabedon':'{user} kabedons {message} :OO',
    'welcome':`Hey guys! I'm Ryan from Malaysia, I do co-working streams and I am a second-year computer science college student :D`,
    'discord':`{user} Come join the Discord server here! https://discord.gg/UnHyHkhbga`,
    'commands':`{user} Check out my commands here! https://github.com/liyunze-coding/comfy-twitch-bot#readme`,
    'focus':'EVERYONE SHUT THE FUCK UP AND FOCUS RIGHT NOW NODNOD <3'
}

const broadcaster_commands = {
    'raid':'RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ',
    'raid2':'RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid'
}



// streamers I highly recommend
// incomplete, if you wanna be in the list, just leave a message in my chat :D
let streamers_to_shoutout = [
    'pinsaregood',       '4l1c3_0',
    'auspexonegaming',   'unknownnie',
    'charliosaurus',     'cloudydayzzz',
    'theyolotato',       'itsbrandonut',
    'berryspace',        'studypaws',
    'wrongarrow',        'arcaneXVIII',
    'bubxmicn',          'tophurino',
    'wasmishtaken_',     'areeke',
    'KhrowV',            'brisim_claimhte',
    'j3dg',              'pcc_lanezzz',
    'studywyuki',        'imVubVubs',
    'TG_Khalil',         'study_with_flowergirl',
    'lyricalclove',      'studystreamken',
    'euphie___',         'mikewhatwhere',
    'supernaturalwriter','xeno_hiraeth',
    'elly78456',         'soxiesox',
    'warpyn',            'studywithdoc',
    'kaylaneedsanap',    'studysmrt'
]

var streamers = {};

for (s of streamers_to_shoutout){
    streamers[s.toLowerCase()] = true;
}

const sendWebHook = async(url, data) => {
    const form = FormData();

    form.append('payload_json', JSON.stringify(data));

    await axios.post(url, form);
}

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
    if (streamers[user.toLowerCase()]){
        setTimeout( () => {
            ComfyJS.Say(`!so @${user}`);
        }, 1000);
		
		streamers[user.toLowerCase()] = false;
	}

    if (commands[command]) {
        let reply = commands[command];
        reply = reply.replace('{user}', `@${user}`);
        reply = reply.replace('{message}', `${message}`);

        ComfyJS.Say(reply);
    } else if (broadcaster_commands[command] && (flags.broadcaster || flags.mod)){
        let reply = broadcaster_commands[command];
        reply = reply.replace('{user}', `@${user}`);
        reply = reply.replace('{message}', `${message}`)
        ComfyJS.Say(reply);
    } else if (command === 'time'){
        let d = new Date();
        let localtime = d.toLocaleTimeString('en-US', { hour12: true });
        ComfyJS.Say(`${user} it is currently ${localtime}`);
    } else if (command === 'promote' && flags.broadcaster){
        let content_of_promotion = `<@&1038436118816903210> https://twitch.tv/RyanPython\n\n${message}\n\n*sent from ryans\\_bot\\_*`

        sendWebHook(
            process.env.WEBHOOK_URL,
            {
                content: content_of_promotion
            }
        )

        ComfyJS.Say(`${user} promotion successful!`);
    } else if (command === 'compliment'){
        let compliment_user = `@${user}`;

        if (message.includes("@")){
            compliment_user = message.match(/(@[^\s]+)/g)[0];
        }

        let random_compliment = compliments[Math.floor(Math.random() * compliments.length)];
        ComfyJS.Say(`${compliment_user} ${random_compliment}`);
    } else if (command === 'quote'){
        let random_quote = quotes[Math.floor(Math.random() * quotes.length)];
        ComfyJS.Say(`${random_quote}`);
    }
}

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
	if (streamers[user.toLowerCase()]){
		setTimeout( () => {
            ComfyJS.Say(`!so @${user}`);
        }, 1000);
		streamers[user.toLowerCase()] = false;
	}

    let chance = Math.random() * 100;

    if (!['ryans_bot_', 'streamelements'].includes(user.toLowerCase()) && chance == 69){ //1% chance
        let autoresponder = random_autoresponders[Math.floor(Math.random() * random_autoresponders.length)];
        
        if (autoresponder === "compliment"){
            let random_compliment = compliments[Math.floor(Math.random() * compliments.length)];

            ComfyJS.Say(`@${user} ${random_compliment}`);
        } else if (autoresponder === "quote"){
            let random_quote = quotes[Math.floor(Math.random() * quotes.length)];
            ComfyJS.Say(`${random_quote}`);
        }
    } else if (user.toLowerCase() === 'ryans_bot_' && message === `Time for a break!`){
        sendWebHook(
            process.env.WEBHOOK_URL_2,
            {
                content: `<@&1052576825504698388> it's break time! come hop on stream! <https://twitch.tv/RyanPython>`
            }
        )
    }
}

ComfyJS.Init("ryans_bot_", `oauth:${process.env.CLIENT_TOKEN}`, ["RyanPython"]);
// ComfyJS.Init("RyanPython", `oauth:${process.env.CLIENT_TOKEN}`);