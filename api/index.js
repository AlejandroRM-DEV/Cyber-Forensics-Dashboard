require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const bodyParser = require("body-parser");
const guard = require("express-jwt-permissions")();
const { Request } = require("./models");

const app = express();

const jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
	}),
	audience: process.env.AUTH0_AUDIENCE,
	issuer: process.env.AUTH0_ISSUER,
	algorithms: ["RS256"],
});

app.use(jwtCheck);
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/requests", guard.check(["read:requests"]), async (req, res) => {
	Request.findAll()
		.then((users) => {
			res.json({ ok: true, data: users });
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
});

app.post("/requests", guard.check(["create:requests"]), async (req, res) => {
	Request.create(req.body)
		.then((id) => {
			res.json({ ok: true, data: id });
		})
		.catch((err) => {
			res.status(500).json({ ok: false, error: err });
		});
});

app.get("/extractions", guard.check(["read:extractions"]), async (req, res) => {
	res.json({ ok: true, data: [] });
});

app.post("/extractions", guard.check(["create:extractions"]), async (req, res) => {
	res.json({ ok: true, data: null });
});

app.listen(process.env.PORT || 8080);
