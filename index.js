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
