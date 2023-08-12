const fs = require("fs")
const path = require("path")

// ==== READABLE STREAM ====
let readChunkCount = 0
const readStream = fs.createReadStream(path.join(__dirname, "./readme.txt"), { highWaterMark: 10 * 1024 }) // 1024 bytes
// Messing with options on the createReadStream:
// ==== highWaterMark ====
// highWaterMark means how many bytes of data should I read into the buffer before passing it on to the "data" emitter
// Default setting - highWaterMark is set to Readme.txt is 4433kb in size and the default high water mark is 64kb so the readable stream takes 70 chunks to get through file(4433/64 = 69.2)
// If we reduce the high water mark to 10kb then the readable stream should take aprox443
// ==== start/end ====
// These specify a range of bytes to read from the file. start=10 and end=11 yields only "um" being read from the file which is the 10th and 11th letters of Lorem ipsUM dolor sit amet

const writeStream = fs.createWriteStream(path.join(__dirname, "./readmeOut.txt")) // Does not emit "data"

readStream.on("data", (chunk) => {
	console.log(`Chunk`)
	console.log(chunk)
	readChunkCount++
})

// writeStream.write(chunk)
// OR
readStream.pipe(writeStream) // Can only pipe on a readable stream or duplex

readStream.on("close", (chunk) => {
	console.log("readChunkCount :", readChunkCount)
})
