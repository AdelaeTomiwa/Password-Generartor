// DOM ELEMENT
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const numberEl = document.getElementById('numbers');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
   lower : getRandomLower,
   upper : getRandomUpper,
   number : getRandomNumber,
   symbol : getRandomSymbol
};

// Generate Events

generateEl.addEventListener('click', () =>{
   const length = +lengthEl.value;
   const hasLower = lowercaseEl.checked;
   const hasUpper = uppercaseEl.checked;
   const hasNumber = numberEl.checked;
   const hasSymbol = symbolsEl.checked;

   resultEl.innerHTML = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

// COPY PASSWORD TO CLIPBOARD
clipboardEl.addEventListener('click', ()=>{
   const textArea = document.createElement('textarea');
   const password = resultEl.innerText;

   if(!password){
      return;
   }else{
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      alert('Password Copied to Clipboard')
   }
})

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length){
   // 1. Init Password Var
   // 2. Filter out unchecked out
   // 3. Loop over the length call a generator function for each type
   // 4. Add the Final password to the var and return

   let generatedPassword = '';

   const typesCount = lower + upper + number + symbol;

   // console.log('typesCount:', typesCount);

   const typesArr = [{lower}, {upper}, {number}, {symbol}].filter((item) =>Object.values(item)[0]);

   // console.log(typesArr);

   if(typesCount === 0){
      return '';
   }

   for(let i = 0; i < length; i += typesCount){
      typesArr.forEach((type) =>{
         const funcName = Object.keys(type)[0];
         // console.log(funcName);

         generatedPassword += randomFunc[funcName]();
      })
   }

   const finalPassword = generatedPassword.slice(0, length);

   return finalPassword;
}

// Generator
// Upper case
function getRandomLower(){
   return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Upper Case
function getRandomUpper(){
   return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Numbers
function getRandomNumber(){
   return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Symbol
function getRandomSymbol(){
   const symbols = '!@#$%^&*(){}[]=/,.'
   return symbols[Math.floor(Math.random() * symbols.length)];
}
