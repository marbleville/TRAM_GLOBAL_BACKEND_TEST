// Stores prefrences
const settings = {
	urlLength: 6,
	urlStarter: "https://lehrhardt.link/",
	maxIdLength: 30,
	tier1: 100,
	tier2: 500,
	tier3: 1000,
	tierErrorMsg: "You cannot create any more short URLs.",
};

// Keyed by username and value is an array of long URLs given by that user
let userMap = new Map();

// Sotres user teir level and urls given by that user
let userObj = {
	teir: 1,
	urls: [],
};

// Stores the shortURL and ogURL given by a user
let URLObj = {
	shortURL: "",
	ogURL: "",
	user: "",
};

// Keyed by shortURL id and value is the URLObj
let URLMap = new Map();

// Makes an id of the given length and returns it
function generateID() {
	let id = "";
	let chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < settings.urlLength; i++) {
		id += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	// Ensures unique ids
	if (URLMap.has(id)) {
		generateID();
	}

	return id;
}

function longURLToShort(longURL, user, givenId) {
	// Check URL limit based on tier
	if (
		userMap.has(user) &&
		userMap.get(user).urls.length >= getTierLimit(user)
	) {
		return settings.tierErrorMsg;
	}

	let shortURL = "";
	// user can optionally give and id for the short url
	let id =
		givenId.equals("") || givenId.length > settings.maxIdLength
			? generateID()
			: givenId;

	shortURL = settings.urlStarter + id;

	// Create DB object
	let o = Object.create(URLObj);
	o.shortURL = shortURL;
	o.ogURL = longURL;
	o.user = user;

	URLMap.set(id, o);

	// Update user history
	if (userMap.has(user)) {
		let obj = userMap.get(user);
		let arr = obj.urls;
		arr.push(longURL);
		obj.urls = arr;

		userMap.set(user, obj);
	} else {
		let obj = Object.create(userObj);
		let arr = obj.urls;
		arr.push(longURL);
		obj.urls = arr;

		userMap.set(user, obj);
	}

	return shortURL;
}

// returns the long URL given the short URL
function shortURLtoLong(shortURL) {
	let id = shortURL.slice(settings.urlStarter.length);
	return URLMap.get(id).ogURL;
}

// Returns all URLs given by a user
function getURLs(user) {
	return userMap.get(user);
}

function getTierLimit(user) {
	let tier = userMap.get(user).teir;
	switch (tier) {
		case 1:
			return settings.tier1;
		case 2:
			return settings.tier2;
		case 3:
			return settings.tier3;
		default:
			return 0;
	}
}

function updateUserTier(user, tier) {
	if (tier <= 3 && userMap.has(user)) {
		let obj = userMap.get(user);
		obj.teir = tier;
		userMap.set(user, obj);
		return 200;
	}

	return 400;
}

module.exports = {
	generateID,
	longURLToShort,
	shortURLtoLong,
	getURLs,
	updateUserTier,
	settings,
};
