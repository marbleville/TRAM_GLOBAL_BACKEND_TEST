const functions = require("./functions");
const express = require("express");
const app = express();

// Get short URL from long URL endpoint
app.get("/shorten/:user/:id/*", function (req, res) {
	try {
		let url = functions.longURLToShort(
			req.params[0],
			req.params.user,
			req.params.id
		);

		// If teir is exceeded send 403 error
		if (url === "You cannot create any more short URLs.") {
			res.status(403);
			res.send(url);
		} else {
			res.status(200);
			res.send(url);
		}
	} catch {
		res.status(400);
	}
});

// Redirect endpoint for short URLs
app.get("/redir/*", function (req, res) {
	try {
		res.redirect(functions.shortURLtoLong(req.params[0]));
	} catch {
		res.send("URL not found");
		res.status(400);
	}
});

// Get all URLs for a user
app.get("/urls/:user", function (req, res) {
	try {
		res.status(200);
		res.send(functions.getURLs(req.params.user));
	} catch {
		res.send("User not found");
		res.status(400);
	}
});

// Update a user's tier
app.put("/newtier/:user/:tier", function (req, res) {
	res.send("Update Requested");
	res.status(functions.updateUserTier(req.params.user, req.params.tier));
});

module.exports = app;
