const pdfParse = require("pdf-parse");
console.log("pdfParse type:", typeof pdfParse);
console.log("pdfParse keys:", Object.keys(pdfParse));
if (pdfParse.PDFParse) {
    console.log("PDFParse exists");
} else {
    console.log("PDFParse does not exist");
}
