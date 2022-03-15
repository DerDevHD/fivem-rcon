import udp from 'dgram'
import { Buffer } from 'buffer'

const asCommandBuffer = (cmd, pwd) => {
    return Buffer.concat([
        Buffer.alloc(4, 0xff), 
        Buffer.from([
            'rcon',
            pwd,
            cmd
        ].join(' '))
    ]);
}
const asHumanReadableString = (buf) => {
    return Buffer.from(buf).slice(4).toString().replace('\n', '')
}

class Rcon {
    host
    port
    password
    sock
    timeout

    constructor(host, port, password) {
        this.host = host
        this.port = port
        this.password = password

        this.sock = udp.createSocket('udp4')
        this.timeout = 1500
    }

    command(command) {
        return new Promise(async (res, rej) => {
            this.sock.send(asCommandBuffer(command, this.password), this.port, this.host, async (err) => {
                if(err)
                    rej('failed to send bytes')
            })
            this.sock.once('message', async rec => {
                res(new RconResponse(rec))
                return
            })
            setTimeout(async () => rej('sending attempt timed out'), this.timeout)
        })
    }
}

class RconResponse {
    message

    constructor(raw) {
        this.message = asHumanReadableString(raw)
    }

    trimColorCodes() {
        this.message = this.message.replace(/(\^\d)+/gm, '')
        return this
    }

    toString() {
        return this.message
    }

    get() {
        this.trimColorCodes()
        return this.message.substring(6) // 'print '
    }
}

export default Rcon