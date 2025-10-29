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

// Initialize Bar Chart (Student Distribution by Class)
const barChart = new Chart(document.getElementById('studentBarChart'), {
  type: 'bar',
  data: {
    labels: ['Nursery', 'Primary', 'Junior', 'Senior'],
    datasets: [{
      label: 'Students',
      data: [300, 450, 350, 134], // Static data
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

// Initialize Pie Chart (Grade Distribution)
const pieChart = new Chart(document.getElementById('gradePieChart'), {
  type: 'pie',
  data: {
    labels: ['A', 'B', 'C', 'D', 'F'],
    datasets: [{
      data: [30, 25, 20, 15, 10], // Static data (percentages)
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