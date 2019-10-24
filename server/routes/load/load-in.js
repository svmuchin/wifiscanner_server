const stream = require('stream')
const createError = require('http-errors')

const size = process.env.LOAD_TEST_SIZE

module.exports = async (req, res, next) => {
    const echoStream = new stream.Writable()

    echoStream._write = function (chunk, encoding, done) {
        echoStream.received += chunk.length
        if (echoStream.received > size) {
            echoStream.destroy()
            next(createError(400))
        }
        done()
    }
    echoStream.received = 0

    req.on('end', () => {
        res.send({ total: echoStream.received })
    })

    req.pipe(echoStream)
}
