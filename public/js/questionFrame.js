
// === ALL DECLARATIONS FIRST ===
let display = document.querySelector(".form");
let questionIndex = 0;
let score = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 30 * 60; // 30 minutes

const questions = [
  // ==================== BASIC LEVEL (1-5) ====================
 {
  question: "What is 345 + 278?",
  options: [
    { text: "613", image: '/image-url' },
    { text: "623", image: '/image-url' },
    { text: "633", image: '/image-url' },
    { text: "643", image: '/image-url' },
  ],
  answer: '623'
},

{
  question: "What is 800 - 365?",
  options: [
    { text: "425", image: '/image-url' },
    { text: "435", image: '/image-url' },
    { text: "445", image: '/image-url' },
    { text: "455", image: '/image-url' },
  ],
  answer: '435'
},

{
  question: "What is 24 × 6?",
  options: [
    { text: "124", image: '/image-url' },
    { text: "134", image: '/image-url' },
    { text: "144", image: '/image-url' },
    { text: "154", image: '/image-url' },
  ],
  answer: '144'
},

{
  question: "What is 144 ÷ 12?",
  options: [
    { text: "10", image: '/image-url' },
    { text: "11", image: '/image-url' },
    { text: "12", image: '/image-url' },
    { text: "13", image: '/image-url' },
  ],
  answer: '12'
},

{
  question: "Which fraction is equal to 1/2?",
  options: [
    { text: "2/3", image: '/image-url' },
    { text: "3/6", image: '/image-url' },
    { text: "4/5", image: '/image-url' },
    { text: "5/8", image: '/image-url' },
  ],
  answer: '3/6'
},

{
  question: "What is 3/4 + 1/4?",
  options: [
    { text: "1/2", image: '/image-url' },
    { text: "3/4", image: '/image-url' },
    { text: "1", image: '/image-url' },
    { text: "2", image: '/image-url' },
  ],
  answer: '1'
},

{
  question: "What is 5/6 - 2/6?",
  options: [
    { text: "1/6", image: '/image-url' },
    { text: "2/6", image: '/image-url' },
    { text: "3/6", image: '/image-url' },
    { text: "4/6", image: '/image-url' },
  ],
  answer: '3/6'
},

{
  question: "What is 0.5 as a fraction?",
  options: [
    { text: "1/2", image: '/image-url' },
    { text: "1/3", image: '/image-url' },
    { text: "2/3", image: '/image-url' },
    { text: "3/4", image: '/image-url' },
  ],
  answer: '1/2'
},

{
  question: "What is 25% of 100?",
  options: [
    { text: "15", image: '/image-url' },
    { text: "20", image: '/image-url' },
    { text: "25", image: '/image-url' },
    { text: "30", image: '/image-url' },
  ],
  answer: '25'
},

{
  question: "How many centimetres are in 1 metre?",
  options: [
    { text: "10 cm", image: '/image-url' },
    { text: "50 cm", image: '/image-url' },
    { text: "100 cm", image: '/image-url' },
    { text: "1,000 cm", image: '/image-url' },
  ],
  answer: '100 cm'
},

{
  question: "How many sides does a pentagon have?",
  options: [
    { text: "4", image: '/image-url' },
    { text: "5", image: '/image-url' },
    { text: "6", image: '/image-url' },
    { text: "7", image: '/image-url' },
  ],
  answer: '5'
},

{
  question: "What is the perimeter of a square with each side measuring 6 cm?",
  options: [
    { text: "12 cm", image: '/image-url' },
    { text: "18 cm", image: '/image-url' },
    { text: "24 cm", image: '/image-url' },
    { text: "36 cm", image: '/image-url' },
  ],
  answer: '24 cm'
},

{
  question: "What is the area of a rectangle that is 8 cm long and 5 cm wide?",
  options: [
    { text: "13 cm²", image: '/image-url' },
    { text: "26 cm²", image: '/image-url' },
    { text: "40 cm²", image: '/image-url' },
    { text: "45 cm²", image: '/image-url' },
  ],
  answer: '40 cm²'
},

{
  question: "A right angle is equal to how many degrees?",
  options: [
    { text: "45°", image: '/image-url' },
    { text: "90°", image: '/image-url' },
    { text: "180°", image: '/image-url' },
    { text: "360°", image: '/image-url' },
  ],
  answer: '90°'
},

{
  question: "What is the place value of 7 in 5,742?",
  options: [
    { text: "Ones", image: '/image-url' },
    { text: "Tens", image: '/image-url' },
    { text: "Hundreds", image: '/image-url' },
    { text: "Thousands", image: '/image-url' },
  ],
  answer: 'Hundreds'
},

{
  question: "What is the next number in this sequence: 5, 10, 15, 20, ___?",
  options: [
    { text: "22", image: '/image-url' },
    { text: "23", image: '/image-url' },
    { text: "25", image: '/image-url' },
    { text: "30", image: '/image-url' },
  ],
  answer: '25'
},

{
  question: "A farmer has 48 oranges and shares them equally among 6 children. How many oranges does each child receive?",
  options: [
    { text: "6", image: '/image-url' },
    { text: "7", image: '/image-url' },
    { text: "8", image: '/image-url' },
    { text: "9", image: '/image-url' },
  ],
  answer: '8'
},

{
  question: "What is 2.5 + 1.5?",
  options: [
    { text: "3.0", image: '/image-url' },
    { text: "3.5", image: '/image-url' },
    { text: "4.0", image: '/image-url' },
    { text: "4.5", image: '/image-url' },
  ],
  answer: '4.0'
},

{
  question: "If a book costs ₦500, how much will 4 books cost?",
  options: [
    { text: "₦1,500", image: '/image-url' },
    { text: "₦2,000", image: '/image-url' },
    { text: "₦2,500", image: '/image-url' },
    { text: "₦3,000", image: '/image-url' },
  ],
  answer: '₦2,000'
},

{
  question: "What is the average of 10, 20 and 30?",
  options: [
    { text: "15", image: '/image-url' },
    { text: "20", image: '/image-url' },
    { text: "25", image: '/image-url' },
    { text: "30", image: '/image-url' },
  ],
  answer: '20'
}
];

// Initialize userAnswers array
userAnswers = new Array(questions.length).fill(null);

document.getElementById('totalQues').innerText = `/${questions.length}`;

// === FUNCTIONS BELOW ===

function displayQuestion(q) {
  document.getElementById('q-number').innerText = questionIndex + 1;
  document.getElementById("question").innerText = q.question;

  const container = document.getElementById("options");
  container.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = `option flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-blue-300 text-lg cursor-pointer`;

    const imageHTML = opt.image && opt.image !== '/image-url' 
      ? `<img src="${opt.image}" alt="${opt.text}" class="w-12 h-12 object-cover rounded-lg">` 
      : '';

    div.innerHTML = `
      <div class="w-8 h-8 flex-shrink-0 rounded-xl border-2 border-gray-300 flex items-center justify-center font-bold text-gray-500">
        ${String.fromCharCode(65 + i)}
      </div>
      ${imageHTML}
      <p class="flex-1">${opt.text}</p>
    `;

    if (userAnswers[questionIndex] === opt.text) {
      div.classList.add("selected");
    }

    div.onclick = () => selectOption(div, opt.text);
    container.appendChild(div);
  });
}

function selectOption(element, selectedText) {
  document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
  element.classList.add("selected");
  userAnswers[questionIndex] = selectedText;
}

function previous() {
  if (questionIndex > 0) {
    questionIndex--;
    showQuestion();
  }
}

function next() {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    showQuestion();
  } else {
    submitQuiz();
  }
}

function showQuestion() {
  displayQuestion(questions[questionIndex]);
  updateNavButtons();
}

function updateNavButtons() {
  document.getElementById("prevBtn").disabled = questionIndex === 0;
  const nextBtn = document.querySelector("#next-btn");
  nextBtn.textContent = questionIndex === questions.length - 1 ? "Submit" : "Next";
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timeLeft--;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    document.querySelector("#time").innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function calculateScore() {
  score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });
}

function submitQuiz() {
  clearInterval(timerInterval);
  
  calculateScore();
 
 const quizData = {
    score: score,
    total: questions.length,
    percentage: Math.round((score / questions.length) * 100),
    userAnswers: userAnswers,
    timeLeft: timeLeft,
    completedAt: new Date().toISOString(),
    subject: "Quiz"
  };
  sessionStorage.setItem('quizData', JSON.stringify(quizData))
  window.location.href = '/myschool/quiz/exam/summary'
}

function showFailedQuestions() {
  const container = document.createElement("div");
  container.className = "mt-10 px-6 max-w-3xl mx-auto";

  const failed = questions.filter((q, i) => userAnswers[i] !== q.answer);

  if (failed.length === 0) {
    container.innerHTML = `<p class="text-green-600 text-2xl text-center">🎉 Perfect Score!</p>`;
  } else {
    container.innerHTML = `<h3 class="text-2xl font-semibold mb-6 text-red-600">Review Incorrect Answers:</h3>`;
    
    failed.forEach(q => {
      const div = document.createElement("div");
      div.className = "mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl";
      div.innerHTML = `
        <h4 class="font-medium mb-3">${q.question}</h4>
        <p class="text-red-600"><strong>Correct Answer:</strong> ${q.answer}</p>
      `;
      container.appendChild(div);
    });
  }

  display.appendChild(container);
}

function restartQuiz() {
  questionIndex = 0;
  score = 0;
  userAnswers = new Array(questions.length).fill(null);
  timeLeft = 30 * 60;
  showQuestion();
  startTimer();
}
function endExam(){
  if(confirm('Exam will be automaticaly submited')){
    submitQuiz()
  }
}
// === START THE QUIZ ===
showQuestion();
startTimer();
