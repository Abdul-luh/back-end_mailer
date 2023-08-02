import express from "express";
import nodemailer from "nodemailer";

const EMAIL = "aabdulluhodulate@gmail.com";
const PASSWORD = "uypinyxxrykumucy";
const PORT = process.env.port || 5300;
const app = express();
app.use(express.json());

app.get("/email", (req, res) => {
	console.log(req.method);
	res.json("hello blud");
});

app.post("/email", (req, res) => {
	// const email = req.body.email;
	// const subject = req.body.subject;
	// const message = req.body.message;

	const { email, subject, menessage } = req.body;

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
