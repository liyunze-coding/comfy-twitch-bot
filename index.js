const ComfyJS = require("comfy.js");
require("dotenv").config();


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
    'about':`Hey guys! I'm Ryan currently living in Asia, I do co-working streams and I am a second-year computer science college student :D`,
    'intro':`Hey guys! I'm Ryan currently living in Asia, I do co-working streams and I am a second-year computer science college student :D`,
    'discord':`{user} Come join the Discord server here! https://discord.gg/UnHyHkhbga`,
    'commands':`{user} Check out my commands here! https://github.com/liyunze-coding/comfy-twitch-bot`
}

const broadcaster_commands = {
    'raid':'RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ',
    'raid2':'RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid'
}

// streamers I highly recommend
// incomplete, if you wanna be in the list, just leave a message in my chat :D
let streamers_to_shoutout = [
    'pinsaregood',     '4l1c3_0',
    'auspexonegaming', 'unknownnie',
    'charliosaurus',   'cloudyjoel',
    'theyolotato',     'itsbrandonut',
    'berryspace',      'studypaws',
    'wrongarrow',      'arcaneXVIII',
    'bubxmicn',        'tophurino',
    'wasmishtaken_',   'areeke',
    'KhrowV',          'brisim_claimhte'
]

var streamers = {};

for (s of streamers_to_shoutout){
    streamers[s.toLowerCase()] = true;
}

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
    if (commands[command]) {
        let reply = commands[command];
        reply = reply.replace('{user}', `@${user}`);
        reply = reply.replace('{message}', `${message}`)
        ComfyJS.Say(reply);
    } else if (broadcaster_commands[command] && flags.broadcaster){
        let reply = broadcaster_commands[command];
        reply = reply.replace('{user}', `@${user}`);
        reply = reply.replace('{message}', `${message}`)
        ComfyJS.Say(reply);
    } else if (command === 'time'){
        let d = new Date();
        let localtime = d.toLocaleTimeString('en-US', { hour12: true });
        ComfyJS.Say(`${user} it is currently ${localtime}`);
    }
}

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
	if (streamers[user.toLowerCase()]){
		ComfyJS.Say(`!so @${user}`);
		streamers[user.toLowerCase()] = false;
	}
}

ComfyJS.Init("ryans_bot_", `oauth:${process.env.TWITCH_CLIENT_ID}`, ["RyanPython"]);