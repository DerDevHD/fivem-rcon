# fivem-rcon
A small library wrapper for the rcon protocol made for FiveM

# Installation
NPM-Package via

```
$ npm i https://github.com/DerDevHD/fivem-rcon
```

# Disclaimer
I don't know who the frick came to the idea, to invent such a ~~nice~~ rcon-protocol. You can basicly find zero documentations about this.  
Thank you FiveM.

# Usage
Example case: A small implemenation for a command-line RCON application.
```js
import Rcon from 'fivem-rcon'
import process from 'process'

// first: host, second: port, third: password
const rcon = new Rcon('localhost', 30120, '1234')

const stdin = process.openStdin()
stdin.resume()

stdin.on('data', (data) => {
    rcon.command(data).then(res => {
        console.log(res.get())
    }).catch(err => {
        console.warn(err)
    })
})
```

You see, pretty simple. Just one important method, `command`, and one Promise. Nothing difficult.

## Advanced usage
You can specific a custom timeout through
```js
rcon.timeout = 5000 // sets the [sending] timeout to 5 seconds
```

###### btw we dont care about closing the socket after using it (yet)