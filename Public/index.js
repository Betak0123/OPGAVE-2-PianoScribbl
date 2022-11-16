let clientSocket
let currentPage = '#lobby'
let navnSenderKnap, klaver, guessButton
let audio
let audioloaded = false

// function preload(){
//    audio = loadSound('./assets/24-piano-keys/1A.mp3')
// }

function setup(){
    noCanvas()

    //Connect til server
    clientSocket = io.connect()
    initVars()
    shiftPage('#playPage')
    // Lyt på connection, og tjek om de er kommet ind. 
    clientSocket.on('Connection', message => {
        if(message = true){
            // vis namepage
        }else{
            // vis disconnected page
        }
    })


    // function mousePressed(){
    //     if (audioloaded == false){
    //         console.log('Initialiserede lyd')
    //         audio = loadSound('./assets/24-piano-keys/1A.mp3')
    //         audioloaded = true
    //     }
    // }



    // //Når knap navnsenderknappen bliver trykket på sendes der besked til server, besked indeholder navn og socket.id
    // navnSenderKnap.elt.addEventListener('click', ()=>{
    //         //send navnsenderknap.input.value
    //         clientSocket.emit('name',navnsenderknap.value)
    // })
        
    
    // eventlistener der lytter når man spiller klaveret.'

    let test = selectAll('.key').map( key => {
        // console.log(key.elt.id)
        key.mousePressed( k => {
            // resume()
            clientSocket.emit('piano', key.elt.id)
            document.querySelector('#audio').play()
            console.log('assets/24-piano-keys/'+key.elt.id+'.mp3')
            // audio.src = 'assets/24-piano-keys/'+key.elt.id+'.mp3'
            // console.log(audio.src)



        })
    })

    //    guessButton.addEventListener('click', ()=>{
    //        clientSocket.emit('guess', guessInput.value)
    //    })
    
    // Lyt på når klienten der spiller, trykker på tangenterne.
    clientSocket.on('pianoKey', key => {
        // Lav en kæmpe switch-statement der spiller et lydklip afhængigt af hvilken key der er blevet spillet
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
}