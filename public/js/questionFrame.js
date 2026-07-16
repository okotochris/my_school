
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
    question: "Who is the current president of Nigeria?",
    options: [
      { text: "Muhammadu Buhari", image: '/image-url' },
      { text: "Bola Ahmed Tinubu", image: '/image-url' },
      { text: "Goodluck Jonathan", image: '/image-url' },
      { text: "Atiku Abubakar", image: '/image-url' },
    ],
    answer: 'Bola Ahmed Tinubu'
  },
  {
    question: "What is the capital city of Nigeria?",
    options: [
      { text: "Lagos", image: '/image-url' },
      { text: "Abuja", image: '/image-url' },
      { text: "Kano", image: '/image-url' },
      { text: "Port Harcourt", image: '/image-url' },
    ],
    answer: 'Abuja'
  },
  {
    question: "How many states are in Nigeria?",
    options: [
      { text: "30", image: '/image-url' },
      { text: "36", image: '/image-url' },
      { text: "42", image: '/image-url' },
      { text: "25", image: '/image-url' },
    ],
    answer: '36'
  },
  {
    question: "What is the official language of Nigeria?",
    options: [
      { text: "French", image: '/image-url' },
      { text: "English", image: '/image-url' },
      { text: "Arabic", image: '/image-url' },
      { text: "Yoruba", image: '/image-url' },
    ],
    answer: 'English'
  },
  {
    question: "Who is the first president of Nigeria?",
    options: [
      { text: "Nnamdi Azikiwe", image: '/image-url' },
      { text: "Obafemi Awolowo", image: '/image-url' },
      { text: "Tafawa Balewa", image: '/image-url' },
      { text: "Yakubu Gowon", image: '/image-url' },
    ],
    answer: 'Nnamdi Azikiwe'
  },

  // ==================== STANDARD LEVEL (6-20) ====================
  {
    question: "Nigeria gained independence in what year?",
    options: [
      { text: "1957", image: '/image-url' },
      { text: "1960", image: '/image-url' },
      { text: "1963", image: '/image-url' },
      { text: "1970", image: '/image-url' },
    ],
    answer: '1960'
  },
  {
    question: "What is the longest river in Nigeria?",
    options: [
      { text: "River Benue", image: '/image-url' },
      { text: "River Niger", image: '/image-url' },
      { text: "River Osun", image: '/image-url' },
      { text: "River Kaduna", image: '/image-url' },
    ],
    answer: 'River Niger'
  },
  {
    question: "Who was the first military head of state in Nigeria?",
    options: [
      { text: "Yakubu Gowon", image: '/image-url' },
      { text: "Johnson Aguiyi-Ironsi", image: '/image-url' },
      { text: "Murtala Muhammed", image: '/image-url' },
      { text: "Olusegun Obasanjo", image: '/image-url' },
    ],
    answer: 'Johnson Aguiyi-Ironsi'
  },
  {
    question: "What is the national anthem of Nigeria called?",
    options: [
      { text: "Arise, O Compatriots", image: '/image-url' },
      { text: "Nigeria, We Hail Thee", image: '/image-url' },
      { text: "God Bless Nigeria", image: '/image-url' },
      { text: "One Nigeria", image: '/image-url' },
    ],
    answer: 'Arise, O Compatriots'
  },
  {
    question: "Which is the most populated city in Nigeria?",
    options: [
      { text: "Abuja", image: '/image-url' },
      { text: "Kano", image: '/image-url' },
      { text: "Lagos", image: '/image-url' },
      { text: "Ibadan", image: '/image-url' },
    ],
    answer: 'Lagos'
  },
  {
    question: "The Nigerian flag has how many colours?",
    options: [
      { text: "One", image: '/image-url' },
      { text: "Two", image: '/image-url' },
      { text: "Three", image: '/image-url' },
      { text: "Four", image: '/image-url' },
    ],
    answer: 'Two'
  },
  {
    question: "What does the green colour on the Nigerian flag represent?",
    options: [
      { text: "Peace", image: '/image-url' },
      { text: "Agriculture", image: '/image-url' },
      { text: "Unity", image: '/image-url' },
      { text: "Strength", image: '/image-url' },
    ],
    answer: 'Agriculture'
  },
  {
    question: "Which of these is not one of the three major ethnic groups in Nigeria?",
    options: [
      { text: "Hausa", image: '/image-url' },
      { text: "Igbo", image: '/image-url' },
      { text: "Yoruba", image: '/image-url' },
      { text: "Ijaw", image: '/image-url' },
    ],
    answer: 'Ijaw'
  },
  {
    question: "The Central Bank of Nigeria was established in what year?",
    options: [
      { text: "1958", image: '/image-url' },
      { text: "1960", image: '/image-url' },
      { text: "1970", image: '/image-url' },
      { text: "1980", image: '/image-url' },
    ],
    answer: '1958'
  },
  {
    question: "What is the currency of Nigeria?",
    options: [
      { text: "Dollar", image: '/image-url' },
      { text: "Cedi", image: '/image-url' },
      { text: "Naira", image: '/image-url' },
      { text: "Rand", image: '/image-url' },
    ],
    answer: 'Naira'
  },
  {
    question: "Which state is known as the 'Centre of Excellence'?",
    options: [
      { text: "Abuja", image: '/image-url' },
      { text: "Lagos", image: '/image-url' },
      { text: "Kano", image: '/image-url' },
      { text: "Enugu", image: '/image-url' },
    ],
    answer: 'Lagos'
  },
  {
    question: "Nigeria is in which continent?",
    options: [
      { text: "Asia", image: '/image-url' },
      { text: "Europe", image: '/image-url' },
      { text: "Africa", image: '/image-url' },
      { text: "South America", image: '/image-url' },
    ],
    answer: 'Africa'
  },
  {
    question: "The Nigerian Civil War is also known as?",
    options: [
      { text: "Biafran War", image: '/image-url' },
      { text: "Independence War", image: '/image-url' },
      { text: "Oil War", image: '/image-url' },
      { text: "Unity War", image: '/image-url' },
    ],
    answer: 'Biafran War'
  },
  {
    question: "What is the highest mountain in Nigeria?",
    options: [
      { text: "Olumo Rock", image: '/image-url' },
      { text: "Chappal Waddi", image: '/image-url' },
      { text: "Idanre Hills", image: '/image-url' },
      { text: "Zuma Rock", image: '/image-url' },
    ],
    answer: 'Chappal Waddi'
  },
  {
    question: "Who wrote the book 'Things Fall Apart'?",
    options: [
      { text: "Chinua Achebe", image: '/image-url' },
      { text: "Wole Soyinka", image: '/image-url' },
      { text: "Chimamanda Adichie", image: '/image-url' },
      { text: "Cyprian Ekwensi", image: '/image-url' },
    ],
    answer: 'Chinua Achebe'
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
