const app = require("./index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(app);

describe("User Endpoints", () => {
	it("GET /shorten/allen/123456/https://github.com/marbleville should return https://lehrhardt.link/123456", async () => {
		const res = await requestWithSupertest.get(
			"/shorten/allen/123456/https://github.com/marbleville"
		);
		expect(res.status).toEqual(200);
		expect(res.text).toEqual("https://lehrhardt.link/123456");
	});

	it("GET /redir/https://lehrhardt.link/123456 should redirect to https://github.com/marbleville", async () => {
		const res = await requestWithSupertest.get(
			"/redir/https://lehrhardt.link/123456"
		);

		expect(res.status).toEqual(302);
		expect(res.redirect).toEqual(true);
	});

	it("GET /urls/allen should return [ { shortURL: 'https://lehrhardt.link/123456', ogURL: ", async () => {
		const res = await requestWithSupertest.get("/urls/allen");

		expect(res.status).toEqual(200);
		expect(res.text).toEqual('{"urls":["https://github.com/marbleville"]}');
	});

	it("GET /newtier/allen/2 should return 200", async () => {
		const res = await requestWithSupertest.put("/newtier/allen/4");

		expect(res.status).toEqual(200);
	});

	it("GET /newtier/allen/2 should return 200", async () => {
		const res = await requestWithSupertest.put("/newtier/allen/2");

		expect(res.status).toEqual(200);
	});

	it("GET /shorten/allen/123456/https://github.com/marbleville should return 403 when run the teir 2 limit times", async () => {
		const res = await requestWithSupertest.get(
			"/shorten/allen/1234567/https://github.com/marbleville"
		);
		expect(res.status).toEqual(403);
	});
});
