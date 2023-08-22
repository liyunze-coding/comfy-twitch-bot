const ComfyJS = require("comfy.js");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const say = require("say");

const textToSpeech = (text) => {
	say.speak(text);
};

const bot_user = "RyanPython";
const channel = "RyanPython";

require("dotenv").config();

const compliments = fs
	.readFileSync("./text_files/compliments.txt", "utf8")
	.split("\n");
const quotes = fs.readFileSync("./text_files/quotes.txt", "utf8").split("\n");
const random_autoresponders = ["compliment", "quote"];

const commands = {
	lurk: `Thanks for lurking, {user}!`,
	unlurk: `Welcome back {user}!`,
	github: `{user} https://github.com/liyunze-coding`,
	welcome: `{message} Welcome to Ryan's comfy stream, hope you enjoy your time here :D`,
	website: `{user} Check out Ryan's website here: https://ryanpython.me/`,
	hug: "{user} sends a hug to {message} <3 <3",
	pat: "{user} pats {message} <3 <3",
	bonk: "{user} bonks {message} >:(",
	chancla: "{user} throws a chancla at {message} >:(",
	kabedon: "{user} kabedons {message} :OO",
	intro: `Hey guys! I'm Ryan from Malaysia, I do co-working streams and I am a second-year computer science college student :D`,
	discord: `{user} Come join the Discord server here! https://discord.gg/UnHyHkhbga`,
	commands: `{user} Check out my commands here! https://github.com/liyunze-coding/comfy-twitch-bot#readme`,
};

const broadcaster_commands = {
	raid: "RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ RYANRAID ヽ(*｀ﾟД´)ﾉ",
	raid2: "RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid RYANRAID TombRaid",
	raid3: "RYAN ABANDONED US ヽ(*｀ﾟД´)ﾉ RYAN ABANDONED US  ヽ(*｀ﾟД´)ﾉ RYAN ABANDONED US  ヽ(*｀ﾟД´)ﾉ RYAN ABANDONED US  ヽ(*｀ﾟД´)ﾉ RYAN ABANDONED US ヽ(*｀ﾟД´)ﾉ RYAN ABANDONED US  ヽ(*｀ﾟД´)ﾉ RYAN ABANDONED US  ヽ(*｀ﾟД´)ﾉ RYAN ABANDONED US  ",
	subraid: "RYAN RAID ryanpy1Wrath ryanpy1Wrath RYAN RAID ryanpy1Wrath ryanpy1Wrath RYAN RAID ryanpy1Wrath ryanpy1Wrath RYAN RAID ryanpy1Wrath ryanpy1Wrath RYAN RAID ryanpy1Wrath ryanpy1Wrath RYAN RAID ryanpy1Wrath ryanpy1Wrath ",
	raid4: "UWU 💦 NYA MEOW RAID TIME 🕓 ! RYAN IS 😗♻ HERE 🚢💪 TO 💦✌ EAT 😩🗣 YOUR 👉 TOES 👣 NOM NOM JUST KIDDING UWU 💦 NYA MEOW RAID TIME 🕓 ! RYAN IS 😗♻ HERE 🚢💪 TO 💦✌ EAT 😩🗣 YOUR 👉 TOES 👣 NOM NOM JUST KIDDING",
};

// streamers I highly recommend
// incomplete, if you wanna be in the list, just leave a message in my chat :D
let streamers_to_shoutout = [
	"pinsaregood",
	"4l1c3_0",
	"auspexonegaming",
	"unknownnie",
	"charliosaurus",
	"cloudydayzzz",
	"theyolotato",
	"itsbrandonut",
	"berryspace",
	"studypaws",
	"wrongarrow",
	"arcaneXVIII",
	"bubxmicn",
	"tophurino",
	"areeke",
	"KhrowV",
	"brisim_claimhte",
	"snacklordg",
	"j3dg",
	"pcc_lanezzz",
	"studywyuki",
	"imVubVubs",
	"TG_Khalil",
	"study_with_flowergirl",
	"lyricalclove",
	"studystreamken",
	"euphie___",
	"mikewhatwhere",
	"supernaturalwriter",
	"xeno_hiraeth",
	"elly78456",
	"soxiesox",
	"warpyn",
	"studywithdoc",
	"kaylaneedsanap",
	"studysmrt",
	"samkitkat",
	"mindiigo",
	"corgi_chaos",
	"augywolfy",
	"interseeker",
	"nedseveredhead",
	"oneinalilian",
	"lala_xitlali",
	"opoempedernida",
	"shadygepril",
	"extelso",
	"cheshirepope",
	"nachoburrit0",
	"thisemmanem",
	"acrone",
	"notagoodplaya",
	"j2modest",
	"nihn_jnesyo",
	"nick_kendall",
	"nixi_lab",
	"dmclr",
	"sunfflawer",
	"clarissawrites",
	"clarishy",
	"wafflesdot025",
	"hellojaya",
	"long1nteger",
	"brownplinka",
	"hawokai",
	"foxyb",
	"centinaplays",
	"kaibobatea",
	"kaibobabat",
	"strawberrynator",
	"pineappleeffect",
	"thearielmermaid",
	"productivetime",
	"studytme",
	"kailondo",
	"justaskmiles",
	"donzalez",
	"aminastudy",
	"k8studywithme",
	"drminakovenus",
	"piratejack01",
	"mandztudy",
	"shazanksss",
	"okoriparukun",
	"thepainfulphd",
];

var streamers = {};

for (s of streamers_to_shoutout) {
	streamers[s.toLowerCase()] = true;
}

const sendWebHook = async (url, data) => {
	const form = FormData();

	form.append("payload_json", JSON.stringify(data));

	await axios.post(url, form);
};

function getUsernameId(username) {
	return axios
		.get(`https://api.twitch.tv/helix/users?login=${username}`, {
			headers: {
				"Client-ID": process.env.CLIENT_ID,
				Authorization: `Bearer ${process.env.CLIENT_TOKEN}`,
			},
		})
		.then((res) => {
			return res.data.data[0].id;
		})
		.catch((err) => {
			console.error(`Error getting user ID for ${username}: ${err}`);
		});
}

function getLastGame(id) {
	return new Promise((resolve, reject) => {
		axios.get(
			`https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
			{
				headers: {
					"Client-ID": process.env.CLIENT_ID,
					Authorization: `Bearer ${process.env.CLIENT_TOKEN}`,
				},
			}
		)
			.then((res) => {
				resolve(res.data.data[0].game_name);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

async function callShoutoutStreamer(username) {
	let userID = await getUsernameId(username);
	let game = await getLastGame(userID);

	ComfyJS.Say(
		`Hey guys! Please check out @${username}! They were last streaming ${game} at https://twitch.tv/${username}!`
	);
}

// textToSpeech("Hello everyone! I'm Ryan's comfy bot");

ComfyJS.onConnected = (address, port, isFirstConnect) => {
	// ComfyJS.Say("Hello everyone! I'm Ryan's comfy bot :D");
};

ComfyJS.onCommand = async (user, command, message, flags, extra) => {
	if (streamers[user.toLowerCase()]) {
		setTimeout(() => {
			callShoutoutStreamer(user);
		}, 3000);

		streamers[user.toLowerCase()] = false;
	}

	if (commands[command]) {
		let reply = commands[command];
		reply = reply.replace("{user}", `@${user}`);
		reply = reply.replace("{message}", `${message}`);

		ComfyJS.Say(reply);
	} else if (
		broadcaster_commands[command] &&
		(flags.broadcaster || flags.mod)
	) {
		let reply = broadcaster_commands[command];
		reply = reply.replace("{user}", `@${user}`);
		reply = reply.replace("{message}", `${message}`);
		ComfyJS.Say(reply);
	} else if (command === "time") {
		let d = new Date();
		let localtime = d.toLocaleTimeString("en-US", { hour12: true });
		ComfyJS.Say(`${user} it is currently ${localtime}`);
	} else if (command === "promote" && flags.broadcaster) {
		let content_of_promotion = `<@&1038436118816903210> \n# <https://www.twitch.tv/RyanPython>\n${message}`;

		sendWebHook(process.env.WEBHOOK_URL, {
			content: content_of_promotion,
		});

		ComfyJS.Say(`${user} promotion successful!`);
	} else if (command === "compliment") {
		let compliment_user = `@${user}`;

		if (message.includes("@")) {
			compliment_user = message.match(/(@[^\s]+)/g)[0];
		}

		let random_compliment =
			compliments[Math.floor(Math.random() * compliments.length)];
		ComfyJS.Say(`${compliment_user} ${random_compliment}`);
	} else if (command === "quote") {
		let random_quote = quotes[Math.floor(Math.random() * quotes.length)];
		ComfyJS.Say(`${random_quote}`);
	} else if (command === "so" && (flags.broadcaster || flags.mod)) {
		let streamer = message.split(" ")[0];
		streamer = streamer.replace("@", "");

		callShoutoutStreamer(streamer);
	}
};

ComfyJS.onChat = async (user, message, flags, self, extra) => {
	if (streamers[user.toLowerCase()]) {
		setTimeout(() => {
			callShoutoutStreamer(user);
		}, 3000);
		streamers[user.toLowerCase()] = false;
	}

	let chance = Math.random() * 100;

	if (
		!["ryandotts", "streamelements", "ryanpython"].includes(
			user.toLowerCase()
		) &&
		chance >= 69 &&
		chance <= 70
	) {
		// 2% chance
		let autoresponder =
			random_autoresponders[
				Math.floor(Math.random() * random_autoresponders.length)
			];

		if (autoresponder === "compliment") {
			let random_compliment =
				compliments[Math.floor(Math.random() * compliments.length)];

			ComfyJS.Say(`@${user} ${random_compliment}`);
		} else if (autoresponder === "quote") {
			let random_quote =
				quotes[Math.floor(Math.random() * quotes.length)];
			ComfyJS.Say(`${random_quote}`);
		}
	}
};

ComfyJS.onReward = (user, reward, cost, message, extra) => {
	// console.log(user + " redeemed " + reward + " for " + cost);
	textToSpeech(reward);
};

ComfyJS.Init(channel, `oauth:${process.env.CLIENT_TOKEN}`, bot_user);
