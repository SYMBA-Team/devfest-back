import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
	destination: process.env.STATIC,
	filename: function (req, file, callback) {
		var name = Date.now() + path.extname(file.originalname);
		callback(null, name);
	},
});
const upload = multer({ storage });
export default upload;
