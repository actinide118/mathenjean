

var AdmZip = require("adm-zip");

// creating archives
var zip = new AdmZip();

// add file directly
var content = "inner content of the file";
zip.addFile("/tt/test.txt", Buffer.from(content, "utf8"), "entry comment goes here");
// add local file
//zip.addLocalFile("/home/me/some_picture.png");
// get everything as a buffer
var willSendthis = zip.toBuffer();
// or write everything to disk
zip.writeZip(/*target file name*/ "./files.zip");
