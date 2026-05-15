const pdfParse = require("pdf-parse");
const fs = require("fs");

async function check() {
    try {
        // Create a dummy buffer if possible, or just check the prototype
        const p = new pdfParse.PDFParse(new Uint8Array());
        console.log("getText type:", typeof p.getText);
    } catch (e) {
        console.log("Error during instantiation:", e.message);
    }
}
check();
