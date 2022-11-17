let clientSocket
let currentPage = '#lobby'
let navnSenderKnap, klaver, guessButton
let audio
let audioloaded = false
let monoSynth
// Alle Simons variabler bare kopieret ind.
let nameInput, nameButton, myName, rejectButton, lobbyText, timer, stone, scissor, paper, player1, player1Choice, player2, player2Choice, winner, restartButton, songGuessButton, songGuess
let song = 'megalovania'


// function preload(){
//    audio = loadSound('./assets/24-piano-keys/1A.mp3')
// }

function setup(){
    noCanvas()
    if (getAudioContext().state !== 'running') {
        console.log('click to start audio');
      } else {
        console.log('audio is enabled');
      }
    monoSynth = new p5.MonoSynth();
    //Connect til server
    clientSocket = io.connect()
    initVars()
    shiftPage('#name')
    // Lyt på connection, og tjek om de er kommet ind. 
    clientSocket.on('Connection', message => {
        if(message = true){
            // vis namepage
        }else{
            // vis disconnected page
        }
    })



    nameButton.mousePressed(()=>{
        if(nameInput.value() != ''){
          clientSocket.emit('name', nameInput.value())
          myName.html(nameInput.value())
          lobbyText.html('Venter på spillere')
          shiftPage('#lobby')
        }else{
          confirm('indtast et navn')
        }
    })    

    songGuessButton.mousePressed(()=>{
        console.log(songGuess.value())
        if(songGuess.value() == 'megalovania'){
            confirm('You guessed right!')
        }else{
            confirm('You guessed wrong')
        }
    })
    
    // eventlistener der lytter når man spiller klaveret.'

    let test = selectAll('.key').map( key => {
        // console.log(key.elt.id)
        key.mousePressed( k => {
            userStartAudio();

            clientSocket.emit('piano', key.elt.id)
            select('#'+key.elt.id).addClass('playing')
            setTimeout(()=>{
                select('#' + key.elt.id).removeClass('playing')
            }, 250)
            
            monoSynth.play(key.elt.id.replace("Z","#"), 1, 0, 0.3);
            console.log('Spillede key: '+key.elt.id.replace("#","Z"))
        })
    })
    
    // Lyt på når klienten der spiller, trykker på tangenterne.
    clientSocket.on('playedKey', key => {
        userStartAudio();
        console.log('modtog key: ' + key)
        select('#E'+key).addClass('playing')
            setTimeout(()=>{
                select('#E' + key).removeClass('playing')
            }, 250)
        monoSynth.play(key.replace("Z","#"), 1, 0, 0.3);
    })
    
    
    clientSocket.on('start', message =>{
        shiftPage(message)
        console.log('Du modtog at du skulle starte, og du er på pagen: '+ message)
    })

    clientSocket.on('playSong', sang =>{
        song.html(sang)
        console.log('Du skal gætte sangen: '+ sang)
    })


}

function shiftPage(pageId){
    select(currentPage).removeClass('show')
    select(pageId).addClass('show')
    currentPage = pageId
  }


function initVars(){
    navnSenderKnap = select('#navnSenderKnap')
    audio = select('#audio')

    // Hiver fat i alle Simons Objekter
    nameInput = select('#nameInput')
    nameButton = select('#nameButton')
    myName = select('#myName')
    rejectButton = select('#rejectButton')
    lobbyText = select('#lobbyText')
    timer = select('#timer')
    stone = select('#stone')
    scissor = select('#scissor')
    paper = select('#paper')
    player1 = select('#player1')
    player1Choice = select('#player1Choice')
    player2 = select('#player2')
    player2Choice = select('#player2Choice')
    winner = select('#winner')
    restartButton = select('#restartButton')
    song = select('#song')
    songGuessButton = select('#songGuessButton')
    songGuess = select('#songGuess')
}