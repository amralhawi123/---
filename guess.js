// setting guess name
let gameName = "أسئلة دينية";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
// document.querySelector("footer").innerHTML = `(يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ إِنَّ اللَّـهَ مَعَ الصَّابِرِينَ). [البقرة، آية: 153]`
document.querySelector("footer").innerHTML = `${gameName} - أُنشئت بواسطة الزيرو - تعديل بواسطة الحاوي`;

// mange asks
let askArea = document.querySelector(".asks")
let askNumber = document.querySelector(".qus-to-guess span")
askToGuess = ''
const qustions = ["ما اسم السورة التي فيها تم ذكر الأضحية وصلاة العيد؟",
 "سورة في القرءان ورد فيها سجدتين وأسمها على أسم أحد أركان الإسلام الخمسة؟" ,
  "ما هي السورة التي تعرف باسم سورة النساء الصغرى؟",
   "من هو أول نبي قام بعمل دفاتر للدولة وكان يفسر الأحلام وله أحد عشرة أخا؟",
"لأي مكان كانت هجرة المسلمين الأولى؟",
"من هو أول من قام بفريضة الصيام؟",
"من هو النبي الذي لقب بذي النون؟",
"من أول من يدخل باب الجنة؟",
"ما هي أول صلاة صلاها النبي صلى الله عليه وسلم؟",
"ما هي أول الأعمال التي ترفع إلى الله؟",
"من أول من جاهد في سبيل الله؟",
"ما هو أول شئ خلقه الله؟"]
askToGuess = qustions[Math.floor(Math.random() * qustions.length)]
askArea.innerHTML = askToGuess
const indexOfAsk = qustions.indexOf(askToGuess)
askNumber.innerHTML = `السؤال ${indexOfAsk + 1 } :- `
// console.log(indexOfAsk)



// setting guess options
let numberOfTries = 5;
let currentTry = 1;
let numberOfHints = 1

// Mange words
let wordstoguess = ""
const words = ["الكوثر" ,"الحج" ,  "الطلاق", "يوسف", "الحبشة",
 "ادم", "يونس", "محمد","الظهر","الصلاة","إدريس", "القلم"]

wordstoguess = words[indexOfAsk]
const indexOfAns = words.indexOf(wordstoguess)
let numberOfLetters = wordstoguess.length;

let messageArea = document.querySelector(".message")

// Mange Hints
document.querySelector(".hint span").innerHTML = numberOfHints
const hintButton = document.querySelector(".hint")
hintButton.addEventListener(("click"), getHint)

function generatinputs(){
    const inputsContainer = document.querySelector(".inputs");
    // create number of traies
    for (let i = 1; i <= numberOfTries ; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>محاولة ${i}</span>`;

        if (i !== 1) tryDiv.classList.add(`disapled-inputs`)

        // create inputs
        for (let j = 1; j <= numberOfLetters ; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input)
        }

        inputsContainer.appendChild(tryDiv)
    }

    inputsContainer.children[0].children[1].focus()

    // Disapled all inputs expect one input
    const inputInDisapelDiv = document.querySelectorAll(".disapled-inputs input")
    inputInDisapelDiv.forEach((input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input")
    inputs.forEach((input,index) => {
        //conver input to uppercase
        input.addEventListener("input", function(){
            this.value = this.value
            const nextinput = inputs[index+1]
            nextinput && nextinput.focus()
        })
        input.addEventListener("keydown", function(e){
            const currentIndex = Array.from(inputs).indexOf(e.target)
            // on click arrow right
            if(e.key === "ArrowRight"){
                const nextinput = currentIndex - 1
                nextinput < inputs.length && inputs[nextinput].focus()
            }
            // on click arrow left 
            if(e.key === "ArrowLeft"){
                const previnput = currentIndex + 1
                previnput >= 0 && inputs[previnput].focus()
            }
        })
    });

}

const guessButton = document.querySelector(".check")
guessButton.addEventListener("click", handleGuess)
console.log(wordstoguess)

let rightIcon = `<i class="fa-solid fa-circle-check"></i>`
let wrongIcon = `<i class="fa-solid fa-circle-xmark"></i>`

function handleGuess (){
    let sucessGuess = true;
    for (let i = 1; i <= numberOfLetters ; i++) {
        const inputFild = document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const letter = inputFild.value 
        const acutalletter = wordstoguess[i-1]
        
        // Game Logic
        if(letter === acutalletter && indexOfAns === indexOfAsk && wordstoguess.length === numberOfLetters){
            //Letter is correct and in place.
            inputFild.classList.add("yes-in-place")
        } else if(wordstoguess.includes(letter) && letter !== ""){
            // Letter is correct but not in place.
            inputFild.classList.add("not-in-place")
            sucessGuess = false
        } else if(indexOfAns !== indexOfAsk){
            // answer is wrong.
            inputFild.classList.add("wrong")
            sucessGuess = false
        } else{
            // Letter is wrong.
            inputFild.classList.add("wrong")
            sucessGuess = false
        }
    }

    // check if you win or lose
    if(sucessGuess){
        document.querySelector(".modal").classList.add("show")
        messageArea.innerHTML = `${rightIcon} رائع , الإجابة هي <span>${wordstoguess}</span>`
        messageArea.style.backgroundColor = "#18ba89"
        // disabled all divs
        let allTrais = document.querySelectorAll(".inputs > div")
        allTrais.forEach((tryDiv) => (tryDiv.classList.add("disapled-inputs")))
        
        // disabled guess and hint button
        guessButton.disabled =true 
        hintButton.disabled = true

        setTimeout(() => {
            document.querySelector(".modal").classList.remove("show")
        }, 3000);
        
    } else{
        // add disabled to currnt try
        document.querySelector(`.try-${currentTry}`).classList.add("disapled-inputs")
        const currentTryinput = document.querySelectorAll(`.try-${currentTry} input`)
        currentTryinput.forEach((input) => (input.disabled = true))
        
        // currenty +1
        currentTry++;
        
        // remov disabled to currnt try
        const nextTryinput = document.querySelectorAll(`.try-${currentTry} input`)
        nextTryinput.forEach((input) => (input.disabled = false))
        
        const el = document.querySelector(`.try-${currentTry}`)
        if(el){
            document.querySelector(`.try-${currentTry}`).classList.remove("disapled-inputs")
            el.children[1].focus()
        } else{
            guessButton.disabled =true
            hintButton.disabled = true

            document.querySelector(".modal").classList.add("show")
            messageArea.innerHTML = `${wrongIcon} إجابة خاطئة , الإجابة الصحيحة هي <span>${wordstoguess}</span>`
            messageArea.style.backgroundColor = "red"

            setTimeout(() => {
                document.querySelector(".modal").classList.remove("show")
            }, 3000);
        }
    }
}


// for hint
function getHint(){
    if(numberOfHints > 0){
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints
    }
    if(numberOfHints === 0){
        hintButton.disabled = true
    }

    const enableInput = document.querySelectorAll("input:not([disabled])")
    const emptyEnableInput = Array.from(enableInput).filter((input) => input.value === "")
    if(emptyEnableInput.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnableInput.length)
        const randomInput = emptyEnableInput[randomIndex]
        const indexToFill = Array.from(enableInput).indexOf(randomInput)
        if(indexToFill !== -1){
            randomInput.value = wordstoguess[indexToFill].toUpperCase()
        }
    }
}

document.addEventListener(("keydown"), handleBacKspace)

function handleBacKspace(e){
    if(e.key === "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])")
        const currentIndex = Array.from(inputs).indexOf(document.activeElement)
        if(currentIndex > 0){
            const currntInput= inputs[currentIndex]
            const prevInput=inputs[currentIndex - 1]
            currntInput.value = "";
            prevInput.value = "";
            prevInput.focus()
        }
    }
}

window.onload = function(){
    generatinputs()
}