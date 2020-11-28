var weather = require('weather-js')
const express = require('express')
var app = express()

var http = require('http').createServer(app);
const port = 9000

var io = require('socket.io')(http)

var cors = require(`cors`)
app.use(cors())
app.set("view engine","html")
app.use(express.static('public'))



app.get('/', (req, res) => {
    res.send('index')
})

io.on('connection', (socket) => {       //when connected
  var data
  socket.on('city',(a)=>{
    weather.find({search: `${a}`, degreeType: 'C'}, function(err, result) {
      if(err) console.log(err);
     
      data = result[0]
      socket.emit('data',data)
    });
  })
  socket.on('disconnect', () => {       //when disconnected
    //console.log('user disconnected')    
  })
})

http.listen(port, () => {
  console.log('listening on : '+ port)
})