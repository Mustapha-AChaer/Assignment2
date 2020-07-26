const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settingsd = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')


// lists of words for game 
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalution',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// Inti word
let randomWord;

//init scroe
let score = 0;

// Init time 
let time = 10;

//intialize difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
//focus on text on start
text.focus(); 

// start counting down
const timeInterval = setInterval( updateTime , 1000)

// Generate Random word from array 
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)]
}

//function update score 
function updateScore(){
    score++
    scoreEl.innerHTML = score
}

//Add word to DOM
function addWordTODom(){
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}
addWordTODom()

//updateTime
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's'

    if(time === 0){
        clearInterval(timeInterval)
        //End Game
        gameOver()
    }
}

//GameOver function
function gameOver (){
    
   endgameEl.innerHTML =`<h1>Time ran out</h1>
   <p>Your final score is ${score}</p>
   <button onclick="location.reload()">Reload</button>`
    
        endgameEl.style.display = 'flex';
    
}

text.addEventListener('input', e => {
    const insertedText = e.target.value 
    if(insertedText === randomWord){
        addWordTODom()
        updateScore()

//clear the input
        e.target.value = '';
        if(difficulty === 'hard'){
            time += 2
        } else if(difficulty === 'medium'){
            time +=3
        }else{
            time +=5
        }
       updateTime()
    }
})

//settings btn click
settingsBtn.addEventListener('click', () => 
settings.classList.toggle('hide'))

//settings form
settingsForm.addEventListener('change' , e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})