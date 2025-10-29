const inputforname = document.getElementById('studentID');
const getStudent = document.getElementById('getStudent');
const loading = document.querySelector('.loading');
const infoDisplay = document.querySelector('.blacklist');
const div = document.getElementById('studentName');
const table = document.getElementById('table');
const tableEmpty = document.querySelector('.table-empty');
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

// GETTING STUDENT ID AND NAME IN BLACKLIST
getStudent.onclick = async function getInfo(e) {
  e.preventDefault();
  const studentName = inputforname.value.trim();

  // Prevent fetch when input is empty
  if (!studentName) {
    inputforname.nextElementSibling.textContent = 'Enter Student Name or ID';
    inputforname.classList.add('error');
    return;
  }

  inputforname.nextElementSibling.textContent = '';
  inputforname.classList.remove('error');

  loading.style.display = 'block';
  try {
    const promise = await fetch(`/getstudentid?student_name=${encodeURIComponent(studentName)}`);
    const data = await promise.json();
    if (data.length === 0) {
      showAlert('Student not found');
      return;
    }
    docDisplay(data);
  } catch (err) {
    console.error(err);
    showAlert('An error occurred');
  } finally {
    loading.style.display = 'none';
  }
};

// DIALOG BOX THAT DISPLAY STUDENT INFO FROM DATABASE
function docDisplay(data) {
  div.replaceChildren();
  infoDisplay.style.display = 'block';

  data.forEach((student) => {
    const p = document.createElement('p');
    const idNo = document.createElement('p');
    const button = document.createElement('button');
    const container = document.createElement('div');
    
    p.textContent = student.userName.toUpperCase();
    idNo.textContent = student.studentId;
    button.textContent = 'Add';
    button.className = 'add-btn';
    button.setAttribute('aria-label', `Add ${student.userName} to blacklist`);
    container.className = 'dialogboxDisplay';
    
    container.appendChild(p);
    container.appendChild(idNo);
    container.appendChild(button);
    div.appendChild(container);

    button.onclick = () => {
      addToBlackList(student);
      addNameToTable(student);
    };
  });
}

// TEMPORARY ADDING NAME TO HTML FORM TABLE
function addNameToTable(data) {
  const tbody = table.querySelector('tbody') || table;
  const rows = tbody.querySelectorAll('tr');
  const sn = rows.length + 1;

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${sn}</td>
    <td>${data.userName.toUpperCase()}</td>
    <td>${data.studentId}</td>
    <td><span class="action remove-btn" data-id="${data.studentId}" aria-label="Remove ${data.userName} from blacklist"><span class="icon-trash">🗑️</span></span></td>
  `;
  tbody.appendChild(tr);

  // Hide empty message and show table
  if (tableEmpty) tableEmpty.style.display = 'none';
  table.style.display = 'table';
}

// ADDING NAMES TO BLACKLIST DATABASE
async function addToBlackList(data) {
  try {
    const response = await fetch('/blacklist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      showAlert(`${data.userName} has been added`);
      cancel1();
      location.reload();
    } else {
      showAlert('Failed to add student');
    }
  } catch (err) {
    console.error(err);
    showAlert('An error occurred');
  }
}

// CANCELING STUDENT DISPLAY WINDOW
function cancel1() {
  infoDisplay.style.display = 'none';
  div.replaceChildren();
}