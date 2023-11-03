// Makes an id of the given length and returns it
function generateID(URLMap) {
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

function longURLToShort(longURL, user, userMap, URLMap) {
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

module.exports = { generateID, longURLToShort };
