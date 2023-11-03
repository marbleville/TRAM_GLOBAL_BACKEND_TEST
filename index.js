const express = require("express");
const app = express();

// Stores prefrences
const settings = {
	urlLength: 6,
	urlStarter: "https://lehrhardt.link/",
	port: 3000,
};

// Keyed by username and value is an array of long URLs given by that user
let userMap = new Map();

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

	// Enures unique ids
	if (URLMap.has(id)) {
		generateID();
	}

	return id;
}

function longURLToShort(longURL, user) {
	let shortURL = "";
	let id = generateID();
	shortURL = settings.urlStarter + id;
	let o = Object.create(URLObj);
	o.shortURL = shortURL;
	o.ogURL = longURL;
	o.user = user;
	URLMap.set(id, o);
	if (userMap.has(user)) {
		let arr = userMap.get(user);
		arr.push(longURL);
		userMap.set(user, arr);
	} else {
		userMap.set(user, [longURL]);
	}

	return shortURL;
}
