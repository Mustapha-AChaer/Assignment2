const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
let questionEl = document.getElementById('question')
let answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

// Keep track of current card

let currentActiveCard = 0;

//Store DOM cards
const cardsEL = [];

//Store card data 


// const cardsData = [
//     {
//         question: 'What should a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'   
//     },
//     {
//         question: 'Example of a Case Sensitive Variable',
//         answer: 'thisIsAVariable' 
//     }
// ];


//store card data
const cardsData = getCardsData();
//Make all cards
function createCards(){
    cardsData.forEach((data,index) => createCard(data,index))
}

//make a card
function createCard(data, index){
    const card = document.createElement('div')
    card.classList.add('card')

    if(index===0){
        card.classList.add('active')
    }

    card.innerHTML = `
    <div class="inner-card">
             <div class="inner-card-front">
                 <p>
                     ${data.question}
                 </p>
             </div>
             <div class="inner-card-back">
                 <p>
                     ${data.answer}
                 </p>
             </div>
         </div>
    `

    card.addEventListener('click', ()=> card.classList.toggle('show-answer'))
    cardsEL.push(card)
    cardsContainer.appendChild(card)

    updateCurrentText();
}

//gives you what card your currently on
function updateCurrentText(){
    currentEl.innerText= `${currentActiveCard + 1}/${cardsEL.length}`
}

//get cards from local storage
function getCardsData (){
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}

//Add cards to local storage
function setCardsData(cards){
    localStorage.setItem('cards',JSON.stringify(cards))
    window.location.reload()

}

createCards();


//event listeners
nextBtn.addEventListener('click', ()=> {
    cardsEL[currentActiveCard].className = 'card left'
    currentActiveCard += 1

    if(currentActiveCard > cardsEL.length - 1){
        currentActiveCard = cardsEL.length - 1
    }

    cardsEL[currentActiveCard].className = 'card active'

    updateCurrentText();
})

prevBtn.addEventListener('click', ()=> {
    cardsEL[currentActiveCard].className = 'card right'
    currentActiveCard -= 1

    if(currentActiveCard < 0){
        currentActiveCard = 0
    }

    cardsEL[currentActiveCard].className = 'card active'

    updateCurrentText();
})

showBtn.addEventListener('click',()=>addContainer.classList.add('show'))
hideBtn.addEventListener('click', ()=> addContainer.classList.remove('show'))

//Add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value

    if(question.trim() && answer.trim()){
        const newCard = {question: question, answer: answer}
        createCard(newCard)

        questionEl = '';
        answerEl = '';

        addContainer.classList.remove('show')

        cardsData.push(newCard);
        setCardsData(cardsData)
    }
    
})

//clear local storage and cards 
clearBtn.addEventListener('click', ()=>{
    localStorage.clear();
    cardsContainer.innerHTML= ''
    window.location.reload
})