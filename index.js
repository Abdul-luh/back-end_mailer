import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const EMAIL = "aabdulluhodulate@gmail.com";
const PASSWORD = "uypinyxxrykumucy";
const PORT = process.env.port || 5300;
const app = express();
app.use(express.json());

const whitelist = [
	"localhost:3000",
	"https://incandescent-naiad-f30e25.netlify.app/",
	"",
];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		}
	},
	origin: true,
	allowedHeaders: ["Content-Type", "Authorization"],
	methods: ["GET", "POST", "PUT"],
	credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
	console.log(req.method);
	res.send("hello blud! put a to request using '/email/' route");
});
app.get("/email", (req, res) => {
	console.log(req.method);
	res.send("A post request should be made using this route route");
});

app.post("/", (req, res) => {
	// const email = req.body.email;
	// const subject = req.body.subject;
	// const message = req.body.message;

	const { email, subject, message } = req.body;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: EMAIL,
			pass: PASSWORD,
		},
	});

	console.log(email, subject, message);

	if (!email && !subject && !message)
		return res.status(400).json("non available");

	const mailOption = {
		from: email,
		to: EMAIL,
		subject: `Message from ${email}: ${subject}`,
		text: message,
	};

	transporter.sendMail(mailOption, (err, info) => {
		if (err) {
			console.log(err);
			return res.status(401).json("there is an error");
		}
		console.log(info.response);
		res.json("response");
	});
	// res.json("email sent");
	console.log(req.method);
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
