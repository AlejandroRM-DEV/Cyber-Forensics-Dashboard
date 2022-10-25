require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const jwt_decode = require("jwt-decode");
const NodeCache = require("node-cache");
const cache = new NodeCache();
const fs = require("fs/promises");
const multer = require("multer");
const { PythonShell } = require("python-shell");
const { randomUUID } = require("crypto");
const path = require("path");

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, `${randomUUID()}${path.extname(file.originalname)}`);
	},
});
const upload = multer({ storage: storage });

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

app.get("/agencies", async (req, res) => forward(req, res));
app.get("/requests", async (req, res) => forward(req, res));
app.get("/requests/:id", async (req, res) => forward(req, res));
app.put("/requests/:id", async (req, res) => forward(req, res));
app.post("/requests", async (req, res) => forward(req, res));
app.get("/extractions", async (req, res) => forward(req, res));
app.post("/extractions", async (req, res) => forward(req, res));

app.post("/secuencia-imagenes", upload.fields([{ name: "imgsSecuencia" }]), (req, res) => {
	const data = { ...req.body, ...req.files, docx: "sec-img.docx", docxNew: `${randomUUID()}.docx` };
	for (const archivo in req.files) {
		data[archivo] = data[archivo].map((file) => path.resolve(__dirname, file.path));
	}
	PythonShell.run("./python/main.py", { mode: "json", args: [JSON.stringify(data)] }, (err) => {
		for (const archivo in req.files) {
			data[archivo].forEach((archivo) => fs.unlink(archivo));
		}
		if (err) res.json({ ok: false, error: err });
		else res.json({ ok: true, error: null, nombreArchivo: data.docxNew });
	});
});

app.get("/file/:name", upload.none(), (req, res) => {
	const pathToFile = path.resolve(__dirname, "python/", "output/", req.params.name);
	res.download(pathToFile, "file.docx", () => {
		fs.unlink(pathToFile);
	});
});

app.listen(process.env.PORT || 3001, () => console.log("Started"));

const forward = async (req, res) => {
	try {
		const auth = cache.get(req.cookies.id_token || "");
		if (!auth) {
			res.status(401).json({ ok: false, error: "Missing cookie" });
			return;
		}
		const response = await axios({
			method: req.method,
			url: `${process.env.API_URL}${req.url}`,
			data: req.body,
			headers: {
				Authorization: `Bearer ${auth.access_token}`,
				"x-user-id": jwt_decode(auth.access_token).sub,
			},
		});
		res.json(response.data);
	} catch (error) {
		//console.error(error);
		if (error.response.status === 401) {
			res.status(401).json({ ok: false, error: "Unauthorized to access data" });
		} else if (error.response.status === 403) {
			res.status(403).json({ ok: false, error: "Permission denied" });
		} else {
			res.status(500).json({
				ok: false,
				error: "Something went wrong. Please try again, if the error persists contact us for support",
			});
		}
	}
};
