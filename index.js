const ComfyJS = require("comfy.js");
require("dotenv").config();

const commands = {
    'overlays':`{user} I made the overlays and bot myself! I used HTML + CSS and Javascript (ComfyJS) to make it! Please leave some feedback on it, would love some advice!`,
    'taskhelp':`{user} "!task [task]" to add your task to the list; "!done" when you're done with your task; "!remove" if you made a typo in the previous task.`,
    'wordle':`I made Wordle on Stream, a game where users can do "!playwordle" then enter any 5 letter words to play the game and "!stopwordle" to stop playing the game.`,
    'lurk':`Thanks for lurking, {user}!`,
    'unlurk':`Welcome back {user}!`,
    'socials':`{user} here are Ryan's socials: https://liyunze-coding.github.io/socials.html`,
    'github':`{user} https://github.com/liyunze-coding`,
    'welcome':`{user} Welcome to Ryan's comfy stream, hope you enjoy your time here :D`,
    'website':`{user} Check out Ryan's website here: https://liyunze-coding.github.io/`,
    'hug':'{user} sends a hug to {message} <3 <3',
    'pat':"{user} pats {message} <3 <3",
    'bonk':'{user} bonks {message} >:(',
    'about':`{user} I'm Ryan currently living in Asia, I do co-working streams and I am studying computer science in college :D`,
    'discord':`{user} Come join the Discord server here! https://discord.gg/UnHyHkhbga`
}

const broadcaster_commands = {
    'raid':'RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ',
    'raid2':'RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid'
}

var streamers = {
	'pinsaregood':true, 
	'4l1c3_0':true, 
	'auspexonegaming':true, 
	'unknownnie':true,
	'charliosaurus':true, 
	'cloudyjoel':true, 
	'theyolotato':true,
	'itsbrandonut':true,
	'berryspace':true,
	'studypaws':true,
	'wrongarrow':true,
	'arcaneXVIII':true,
	'bubxmicn':true
}

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
    if (commands[command]) {
        let reply = commands[command];
        reply = reply.replace('{user}', `@${user}`);
        reply = reply.replace('{message}', `${message}`)
        ComfyJS.Say(reply);
    } else if (broadcaster_commands[command]){
        if (flags.broadcaster){
            let reply = broadcaster_commands[command];
            reply = reply.replace('{user}', `@${user}`);
            reply = reply.replace('{message}', `${message}`)
            ComfyJS.Say(reply);
        }
    }
}

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
	if (streamers[user.toLowerCase()]){
		ComfyJS.Say(`!so @${user}`);
		streamers[user.toLowerCase()] = false;
	}
}

ComfyJS.Init("ryans_bot_", `oauth:${process.env.TWITCH_CLIENT_ID}`, ["RyanPython"]);