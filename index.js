const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');  

const app = express();


app.use(cors());

app.use(bodyParser.json());
const upload = multer({ storage: multer.memoryStorage() });


const isValidBase64 = (str) => {
    try {
        Buffer.from(str, 'base64').toString('binary');
        return true;
    } catch {
        return false;
    }
};


app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;
    const userId = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const rollNumber = 'ABCD123';

    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;

    data.forEach((item) => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
            if (item === item.toLowerCase() && (!highestLowercase || item > highestLowercase)) {
                highestLowercase = item;
            }
        }
    });


    const fileValid = file_b64 ? isValidBase64(file_b64) : false;
    const fileMimeType = fileValid ? 'image/png' : null;
    const fileSizeKb = fileValid ? Buffer.byteLength(file_b64, 'base64') / 1024 : null;

    res.status(200).json({
        is_success: true,
        user_id: userId,
        email,
        roll_number: rollNumber,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

module.exports = app;
