// Opret variabler
const express = require('express')
const ip = require('ip')
const io = require("socket.io")
let playercount

//initialiser en instans - app - til din applikation  
const app = express()
const port = 6969 
playercount = 0
x = 2

players = []


app.use('/', express.static('public'))

const server = app.listen(port, () => {
    console.log('App listening on http://localhost:' + port + ' Med ip: '+ip.address())
  })

  const serverSocket = io(server)

// Lyt på connection med express
serverSocket.on('connection', socket => {
  //du får et socket.id med som identificerer den nye klient 
  console.log('a user connected ', socket.id)
  
  players.push({ 'id':socket.id})
    
  console.log('ny spiller: ' + socket.id)
  console.log('Der er nu ' + players.length + ' spillere')
  console.log(players)
    // Når der er ny connection, tjek om der er for mange spillere 
    if(playercount > x){
    
        // Tilføj ID af bruger der er connected, til et array med spillere. 
        // Send besked tilbage til klienten, om at de er kommet ind (Eventuelt med arrayet)
    
    }else{
        
        // Send nogle beskeder afhængigt af om der er plads eller ej
    }
    
    // Lyt efter om klienterne sender navne 
    socket.on('name', name =>{
        // Gem navnet i playerarray med deres socket.id
        // tjek om alle spillere har givet deres navn
        if(players.length > x){
            // vælg tilfældigt en spiller der starter 
            // Send besked til spiller der starter om at vise tegnepage
            // Send besked til alle de andre om at de skal have lyttepage
            // .emit('start','play')
            // .emit('start', 'listen')
            // serverSocket.to(socket.id).emit('start')
        }
    })
    
    // Lyt efter når klienten der spiller klaver trykker på en knap
    socket.on('piano',key =>{
        console.log('got key ' + key)
        //Send hvilken tangent der er spillet til alle de andre klienter. 
        socket.broadcast.emit('playedKey', key)
    })
    
    // Lyt efter at klienterne gætter på en sang
    socket.on('guess',guess =>{
        // Tjek om deres gæt er rigtigt
        if(guess == song){
            socket.emit('guesscheck', 'correct')
        }else{
            socket.emit('guesscheck', 'wrong')
        }
    })
    
})
