const Tesseract = require("tesseract.js");

async function extractText(image) {

    const result = await Tesseract.recognize(
        image,
        "eng"
    );

    return result.data.text;

}

module.exports = extractText;