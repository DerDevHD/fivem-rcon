import Rcon from '../src/index.js';
import process from 'process'

const tRcon = new Rcon('localhost', 30120, '1234')

const stdin = process.openStdin()
stdin.resume()

stdin.on('data', (data) => {
    tRcon.command(data).then(res => {
        console.log(res.get())
    }).catch(err => {
        console.warn(err)
    })
})