const randomBytesReadableStream = require('random-bytes-readable-stream')

const size = process.env.LOAD_TEST_SIZE

module.exports = async (req, res) => randomBytesReadableStream({ size }).pipe(res)
