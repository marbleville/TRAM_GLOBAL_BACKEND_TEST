const functions = require("./functions");
const express = require("express");
const app = express();
const port = 3000;

// Get short URL from long URL endpoint
app.get("/shorten/:user/:longURL/:id", function (req, res) {
	res.send(
		functions.longURLToShort(
			req.params.longURL,
			req.params.user,
			req.params.id
		)
	);
});

// Redirect endpoint for short URLs
app.get("/redir/:shortURL", function (req, res) {
	res.redirect(functions.shortURLtoLong(req.params.shortURL));
});

// Get all URLs for a user
app.get("/urls/:user", function (req, res) {
	res.send(functions.getURLs(req.params.user));
});
