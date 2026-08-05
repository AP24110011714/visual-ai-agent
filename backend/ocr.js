const Tesseract = require("tesseract.js");

async function extractText(imagePath) {
    try {
        const {
            data: { text }
        } = await Tesseract.recognize(imagePath, "eng");

        return text;
    } catch (error) {
        console.error("OCR Error:", error);
        return "";
    }
}

module.exports = extractText;