// Element selectors
let username = document.getElementById('newName');
let addmissionNo = document.getElementById('addmissionNo');
let dob = document.getElementById('dob');
let classN = document.getElementById('classN');
let male = document.getElementById('male');
let female = document.getElementById('female');
let passportInput = document.getElementById('passport'); // File input
let updateStudentForm = document.getElementById('updateStudentForm');
let studentDetailsBtn = document.getElementById('studentDetails');
let loadingCover = document.querySelector('.cover');
let loadingSpinner = document.getElementById('loading'); // Assuming .loading inside .cover

// Create error dialog modal (simple JS-based modal)
  var color =  '#dc2626'
    var text = 'Error'
function createErrorDialog() {
  // Remove existing dialog if any
  const existingDialog = document.getElementById('errorDialog');
  if (existingDialog) existingDialog.remove();

  const dialog = document.createElement('div');
  dialog.id = 'errorDialog';
  dialog.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 1000;
    max-width: 400px;
    text-align: center;
    border: 1px solid #e5e7eb;
  `;
  dialog.innerHTML = `
    <h3 style="color:${color}; margin-bottom: 1rem;">${text}</h3>
    <p id="errorMessage" style="margin-bottom: 1rem; color: #374151;"></p>
    <button onclick="this.closest('#errorDialog').remove()" style="background: #dc2626; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Close</button>
  `;
  document.body.appendChild(dialog);
  return dialog;
}

function showError(message) {
  const dialog = createErrorDialog();
  document.getElementById('errorMessage').textContent = message;
  dialog.style.display = 'block';
}

// Show loading indicator
function showLoading() {
  loadingCover.style.display = 'flex';
  loadingSpinner.style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
  loadingCover.style.display = 'none';
  loadingSpinner.style.display = 'none';
}

// GETTING STUDENT CURRENT DETAILS
studentDetailsBtn.onclick = async (e) => {
  e.preventDefault();
  const studentId = document.getElementById('studentId').value.trim();

  if (!studentId) {
    showError('Please enter a valid Student ID.');
    return;
  }

  showLoading();
  
  try {
    const response = await fetch(`/studentinfomation?studnetId=${encodeURIComponent(studentId)}`);
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    
    const student = await response.json();
    
    // Populate fields
    username.value = student.userName || '';
    addmissionNo.value = student.addmissionNo || '';
    dob.value = student.dob || '';
    classN.value = student.class || '';
    
    if (student.gender === 'MALE') {
      male.checked = true;
      female.checked = false;
    } else if (student.gender === 'FEMALE') {
      female.checked = true;
      male.checked = false;
    } else {
      male.checked = false;
      female.checked = false;
    }
    
    // If passport is an image URL, you can set it to an <img> preview if exists; otherwise, clear file input
    if (student.passport && student.passport.startsWith('http')) {
      // Assuming there's a preview img element; add if needed: <img id="passportPreview" style="max-width:100%; border-radius:4px;" />
      // document.getElementById('passportPreview').src = student.passport;
      passportInput.value = ''; // Clear file input for new upload
    }
    
  } catch (err) {
    console.error('Fetch error:', err);
    showError(`Failed to fetch student info: ${err.message}. Please check the ID and try again.`);
  } finally {
    hideLoading();
  }
};

// Handle form submission for updating student details
updateStudentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const studentId = document.getElementById('studentId').value.trim();
  const userName = username.value.trim();
  const addmissionNo = document.getElementById('addmissionNo').value.trim();
  const dobValue = dob.value;
  const classValue = classN.value;
  const gender = male.checked ? 'MALE' : (female.checked ? 'FEMALE' : '');
  const passportFile = passportInput.files[0]; // Get selected file
   const data = {studentId, userName, addmissionNo, dobValue, classValue,gender}
  // Basic client-side validation
  if (!studentId) {
    showError('Student ID is required.');
    return;
  }
  
  if (!userName) {
    showError('Name is required.');
    return;
  }
  
  if (!gender) {
    showError('Please select a gender.');
    return;
  }
  
  if (!classValue) {
    showError('Please select a class.');
    return;
  }

  showLoading();

  try {
    // // Use FormData for file upload support
    // const formData = new FormData();
    // formData.append('studentId', studentId);
    // formData.append('userName', userName);
    // formData.append('addmissionNo', addmissionNo);
    // formData.append('dob', dobValue);
    // formData.append('classN', classValue);
    // formData.append('gender', gender);
    // if (passportFile) {
    //   formData.append('passport', passportFile);
    // }

    const response = await fetch('/update-student', {
      method: 'PATCH',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      // Success: You could show a success dialog here similarly
     
      color = '#173de6ff'
      text = 'Uploaded'
      showError(" Updated successfuly")
      // Optionally reset form or redirect
      updateStudentForm.reset();
    } else {
      throw new Error(result.message || 'Update failed');
    }
    
  } catch (err) {
    console.error('Update error:', err);
    showError(`Failed to update student: ${err.message}`);
  } finally {
    hideLoading();
  }
});

