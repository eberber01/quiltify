const SpotifyWebAPI = require("spotify-web-api-node");
require("dotenv").config();

module.exports.handler = async (event, context, callback) => {
	const CLIENT_ID = process.env.CLIENT_ID;
	const CLIENT_SECRET = process.env.CLIENT_SECRET;
	const REDIRECT_URI = "https://main.d3ftg3vbkuts3x.amplifyapp.com/";

	const body = JSON.parse(event.body);
	const code = body["code"];

	const spotifyApi = new SpotifyWebAPI({
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		redirectUri: REDIRECT_URI,
	});

	try {
		const data = await spotifyApi.authorizationCodeGrant(code);

		const response = {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			statusCode: 200,
			body: JSON.stringify({
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
				accessToken: data.body.access_token,
			}),
		};
		callback(null, response);
	} catch (err) {
		const response = {
			statusCode: 400,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
		};
		callback(null, response);
	}
};
