const axios = require('axios')
const http = require('http')
const url = require('url')

require('dotenv').config({ silent: true })

const API_KEY = process.env.API_KEY
const DIRECTIONS_API = 'https://maps.googleapis.com/maps/api/directions/json'

console.log('Now accepting requests ...')

http.createServer(function (req, res) {
    let base_url = url.parse(req.url).href.split('?')[0]
    console.log()
    console.log('Request: ', base_url)
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.writeHead(200, { 'Content-Type': 'application/json' })

    if (req.url.includes('favicon')) {
        res.end()
    } else if (base_url === '/status') {
        res.write(JSON.stringify({ status: 'OK' }))
        res.end()
        console.log('Response: OK')
    } else if (base_url === '/get_directions') {
        let url = req.url.replace('/get_directions', DIRECTIONS_API)
        url = url.replace('?', '?key=' + API_KEY + '&')
        axios.get(url)
            .then(response => {
                let data = response.data
                data.status = 'OK'
                res.write(JSON.stringify(data))
                res.end()
                console.log('Response: SUCCESS')
            })
            .catch(error => {
                res.write(JSON.stringify(error))
                res.end()
                console.log('Response: ERROR')
            })
    } else {
        console.log('Response: UNKNOWN REQUEST')
        res.write(JSON.stringify({ status: 'UNKNOWN REQUEST' }))
        res.end()
    }
}).listen(9000)
