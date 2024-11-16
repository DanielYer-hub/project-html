let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");

let answerValue;

const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateQuestion = () => {
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

 
  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="userAnswer" placeholder="?"\>`;

 
  switch (randomOperator) {
    case "+":
      answerValue = num1 + num2;
      break;
    case "-":
      answerValue = num1 - num2;
      break;
    case "*":
      answerValue = num1 * num2;
      break;
  }
};

const checkAnswer = () => {
  const userAnswer = parseInt(document.getElementById("userAnswer").value);

  if (userAnswer === answerValue) {
    result.innerHTML = "Correct! Next question!";
    setTimeout(() => {
      result.innerHTML = "";
      generateQuestion();
    }, 1000);
  } else {
    result.innerHTML = "Wrong answer! Let try again!";
  }
};

startBtn.addEventListener("click", () => {
  generateQuestion();
});

submitBtn.addEventListener("click", checkAnswer);
