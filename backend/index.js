require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache();

const app = express();

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/login", async (req, res) => {
	const code = req.query.code;

	if (!code) {
		res.status(401).json({ ok: false, error: "Missing authorization code" });
	}

	const params = new URLSearchParams();
	params.append("grant_type", "authorization_code");
	params.append("client_id", process.env.AUTH0_CLIENT_ID);
	params.append("client_secret", process.env.AUTH0_CLIENT_SECRET);
	params.append("code", code);
	params.append("redirect_uri", process.env.FRONTEND_URL_CALLBACK);

	axios
		.post(`${process.env.AUTH0_ISSUER}/oauth/token`, params)
		.then((response) => {
			console.log(response.data);
			cache.set(response.data.id_token, response.data, response.data.expires_in);
			res.cookie(`id_token`, response.data.id_token, {
				secure: process.env.NODE_ENV === "production",
				httpOnly: true,
			})
				.status(200)
				.json({ ok: true, data: response.data.id_token });
		})
		.catch((err) => {
			console.log(err);
			res.status(403).json({ ok: false, error: err.message });
		});
});

app.get("/requests", async (req, res) => forward(req, res));
app.post("/requests", async (req, res) => forward(req, res));
app.get("/extractions", async (req, res) => forward(req, res));
app.post("/extractions", async (req, res) => forward(req, res));

app.listen(process.env.PORT || 3001, () => console.log("Started"));

const forward = async (req, res) => {
	try {
		const auth = cache.get(req.cookies.id_token || "");
		if (!auth) {
			res.status(401).json({ ok: false, error: "Missing cookie" });
			return;
		}
		console.log(auth)
		const response = await axios({
			method: req.method,
			url: `${process.env.API_URL}${req.url}`,
			data: req.body,
			headers: { Authorization: `Bearer ${auth.access_token}` },
		});
		res.json(response.data);
	} catch (error) {
		console.error(error);
		if (error.response.status === 401) {
			res.status(401).json({ ok: false, error: "Unauthorized to access data" });
		} else if (error.response.status === 403) {
			res.status(403).json({ ok: false, error: "Permission denied" });
		} else {
			res.status(500).json({ ok: false, error: "Something went wrong. Please try again, if the error persists contact us for support" });
		}
	}
};
