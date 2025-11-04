document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Check cache
    const cached = localStorage.getItem("analysisData");
    const cacheTime = localStorage.getItem("analysisTime");

    // Cache validity: 10 minutes (you can change it)
    const isCacheValid =
      cached && cacheTime && Date.now() - parseInt(cacheTime) < 10 * 60 * 1000;

    let data;

    if (isCacheValid) {
      console.log("📦 Loaded analysis from cache");
      data = JSON.parse(cached);
    } else {
      console.log("🌐 Fetching fresh analysis data...");
      const res = await fetch("/api/analysis");
      data = await res.json();

      // Save data + timestamp
      localStorage.setItem("analysisData", JSON.stringify(data));
      localStorage.setItem("analysisTime", Date.now().toString());
    }

    const {
      totalStaff,
      totalStudent,
      totalBlacklist,
      totalNursery,
      totalBasic,
      totalJss,
      totalSS,
      gradeSummary,
    } = data;

    // Update dashboard values
    document.getElementById("blacklist").innerText = totalBlacklist;
    document.getElementById("staff").innerText = totalStaff;
    document.getElementById("students").innerText = totalStudent;

    // Draw charts
    barGraph(totalNursery, totalBasic, totalJss, totalSS);
    pieGraph(gradeSummary.percentages);
    gradeCount(gradeSummary.counts);
  } catch (err) {
    console.error("❌ Error loading analysis:", err);
  }
});



// dashboard.js
const form = document.getElementById('uploadForm');
const sClass = document.getElementById('Sclass');
const uploadBtn = document.querySelector('.upload-results-btn');
const uploadDialog = document.querySelector('.upload-dialog');
const dialogBackdrop = document.querySelector('.dialog-backdrop');
const alertDialog = document.querySelector('.alert-dialog');
const alertMessage = document.getElementById('alertMessage');

// Show alert dialog with message
function showAlert(message) {
  alertMessage.textContent = message;
  alertDialog.style.display = 'block';
}

// Close alert dialog
function closeAlert() {
  alertDialog.style.display = 'none';
  alertMessage.textContent = '';
}

// Show upload dialog
function showUploadDialog() {
  uploadDialog.style.display = 'block';
  dialogBackdrop.style.display = 'block';
}

// Close upload dialog
function closeUploadDialog() {
  uploadDialog.style.display = 'none';
  dialogBackdrop.style.display = 'none';
  form.reset();
  sClass.classList.remove('error');
  sClass.nextElementSibling.textContent = '';
}

// Upload button click
uploadBtn.addEventListener('click', showUploadDialog);

// Form submission

function barGraph( totalNursery,totalBasic, totalJss, totalSS){
  // Initialize Bar Chart (Student Distribution by Class)
const barChart = new Chart(document.getElementById('studentBarChart'), {
  type: 'bar',
  data: {
    labels: ['Nursery', 'Primary', 'Junior', 'Senior'],
    datasets: [{
      label: 'Students',
      data: [totalNursery, totalBasic, totalJss, totalSS], // Static data
      backgroundColor: 'rgba(79, 70, 229, 0.6)',
      borderColor: '#4f46e5',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Class'
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});
}

// Initialize Pie Chart (Grade Distribution)
function pieGraph(gradeSummary){
  const {A, B, C, D, F} = gradeSummary
  const pieChart = new Chart(document.getElementById('gradePieChart'), {
  type: 'pie',
  data: {
    labels: ['A', 'B', 'C', 'D', 'F'],
    datasets: [{
      data: [A, B, C, D, F], // Static data (percentages)
      backgroundColor: [
        '#4f46e5',
        '#06b6d4',
        '#10b981',
        '#f59e0b',
        '#dc2626'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { size: 12 }
        }
      }
    }
  }
});
}

//CALCULATING GRADE
function gradeCount(grades, ) {
  const gradeHeader = document.querySelector('.gradeCount');
  if (!gradeHeader) return console.error('Element with .gradeCount not found');

  // Loop through each grade (A, B, C, D, F)
  Object.entries(grades).forEach(([key, value]) => {
    gradeHeader.innerHTML += `
      <div class="gradeItem">
        <div class="gradeTitle">${key}</div>
        <span>${value}</span>
      </div>
    `;
  });
}
