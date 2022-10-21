
function myloadFunc(){
      document.querySelector('#loader').style.display = 'none';
}


let question = document.querySelector('.question'); 
let  nextbtn = document.querySelector('#nextbtn');
let  input = document.querySelectorAll('input');
let   mcq = document.querySelectorAll('.mcq');
const sec =  document.querySelector('section');;
const  quizbuttons =  document.querySelector('.quizbuttons');
const   check =  document.querySelector('#check');
const    back =  document.querySelector('.back');
let ansmodal =  document.querySelector('.ansmodal');
let   anscontent =  document.querySelector('.anscontent');

let total = 10;
let count = 0;
let score = 0;
const loadQuestion = async () => {
      
   const query = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple");
   const queryobj = await query.json();

   const data = queryobj.results;

   quiz();

   function quiz (){ 

   if(count === total){
     endQuiz();      
   }

   else{
   question.innerHTML = data[count].question;
   let possibleAnswers = data[count].incorrect_answers;   

   possibleAnswers.splice(Math.floor(Math.random() * 3), 0, data[count].correct_answer);

   for (let  i = 0; i < possibleAnswers.length; i++) {
       mcq[i].innerHTML = possibleAnswers[i];   
          
   }
   
   console.log(data[count].correct_answer);

   }
   } 

   nextbtn.addEventListener('click', () => {
    
      for (let index = 0; index <  input.length; index++) {
   
         if(input[index].checked){
            if(mcq[index].innerHTML === data[count].correct_answer){
               score++;
            }
         }
      }      

      count++;
      quiz();
      reset();
   })
   

    check.addEventListener('click', () => { 
      document.querySelector('.correctans').innerHTML = `${data[count].correct_answer}`;
      ansmodal.classList.remove('modaldisplay');        
      anscontent.classList.add('modalanim');               

   });

   back.addEventListener('click', () => { 

      ansmodal.classList.add('modaldisplay');          

   });


   function reset(){
      input.forEach( inp => {
         if(inp.checked = false);
      })

   }

   function endQuiz(){
     
     quizbuttons.style.display = 'none';
     sec.style.justifyContent = 'flex-start';
      sec.innerHTML = `
         <h2>Thank You for playing the Quiz </h2>
         <h4 class="answer">Correct Answers:  ${score}/${total} </h4> 
      `;

   }
   
}



loadQuestion(); 



