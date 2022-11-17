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
names = []
Navne = 0

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
        if(Navne >= 2){
            Navne = 0
            names = []
        }
        names.push({ 'id':socket.id})
        names.name = name
        // Gem navnet i playerarray med deres socket.id
        // tjek om alle spillere har givet deres navn
        // let thisPlayer = players.find( p => p.id == socket.id )
        // //indsæt navnet i objektet i players array 
        // thisPlayer.name = name
        //registrer at vi har modtaget et navn til - læg 1 til navnetæller
        Navne ++
        console.log('Fik navn: ' + name, ' Vi har nu ' + Navne + ' navn(e)')   

        if(Navne > 1){
            // vælg tilfældigt en spiller der starter
            // Send besked til spiller der starter om at vise tegnepage
            console.log('der er mere end to spillere og spiller 1 har id:'+names[0].id)
            serverSocket.to(names[0].id).emit('start','#playPage')
            // Send besked til alle de andre om at de skal have lyttepage
            serverSocket.to(names[1].id).emit('start','#listenPage')
            // Giv dem der spiller en sang at spille
            serverSocket.to(names[0]).emit('playsong','Megalovania')
        }
    })
    
    // Lyt efter når klienten der spiller klaver trykker på en knap
    socket.on('piano', key =>{
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
