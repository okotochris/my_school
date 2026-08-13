const inputforname = document.getElementById('studentID');
const getStudent = document.getElementById('getStudent');

const loading = document.querySelector('.loading');
const infoDisplay = document.querySelector('.blacklist');

const div = document.getElementById('studentName');
const table = document.getElementById('table');
const tableEmpty = document.querySelector('.table-empty');

const alertDialog = document.querySelector('.alert-dialog');
const alertMessage = document.getElementById('alertMessage');


// ========================================
// MODAL HELPERS
// ========================================

function showModal(element) {
  element.classList.remove('hidden');
  element.classList.add('flex');
}

function hideModal(element) {
  element.classList.add('hidden');
  element.classList.remove('flex');
}


// ========================================
// ALERT
// ========================================

function showAlert(message) {
  alertMessage.textContent = message;

  showModal(alertDialog);
}


function closeAlert() {
  hideModal(alertDialog);

  alertMessage.textContent = '';
}


// ========================================
// LOADING
// ========================================

function showLoading() {
  showModal(loading);
}


function hideLoading() {
  hideModal(loading);
}


// ========================================
// GET STUDENT
// ========================================

getStudent.onclick = async function (e) {

  e.preventDefault();

  const studentName = inputforname.value.trim();


  // Validate input
  if (!studentName) {

    inputforname.nextElementSibling.textContent =
      'Enter Student Name or ID';

    inputforname.classList.add(
      'border-red-500',
      'ring-2',
      'ring-red-500/10'
    );

    inputforname.focus();

    return;
  }


  // Remove error
  inputforname.nextElementSibling.textContent = '';

  inputforname.classList.remove(
    'border-red-500',
    'ring-2',
    'ring-red-500/10'
  );


  showLoading();


  try {

    const response = await fetch(
      `/getstudentid?student_name=${encodeURIComponent(studentName)}`
    );


    if (!response.ok) {
      throw new Error('Failed to find student');
    }


    const data = await response.json();


    if (!Array.isArray(data) || data.length === 0) {

      showAlert('No student was found with that name or ID.');

      return;
    }


    docDisplay(data);


  } catch (error) {

    console.error(error);

    showAlert(
      'Unable to search for the student. Please try again.'
    );

  } finally {

    hideLoading();

  }
};


// ========================================
// DISPLAY SEARCH RESULTS
// ========================================

function docDisplay(data) {

  div.replaceChildren();


  data.forEach((student) => {

    const container = document.createElement('div');

    container.className =
      'flex items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-200 transition';


    // Student information
    const information = document.createElement('div');

    information.className = 'min-w-0';


    const name = document.createElement('p');

    name.className =
      'font-semibold text-slate-900 truncate';

    name.textContent =
      student.fullname.toUpperCase();


    const id = document.createElement('p');

    id.className =
      'text-sm text-slate-500 mt-1';

    id.textContent =
      `Student ID: ${student.studentId}`;


    information.appendChild(name);
    information.appendChild(id);


    // Add button
    const button = document.createElement('button');

    button.type = 'button';

    button.className =
      'flex-shrink-0 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition';


    button.innerHTML = `
      <span class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>

        Add
      </span>
    `;


    button.setAttribute(
      'aria-label',
      `Add ${student.userName} to blacklist`
    );


    button.onclick = async () => {

      await addToBlackList(
        student,
        button
      );

    };


    container.appendChild(information);
    container.appendChild(button);

    div.appendChild(container);

  });


  showModal(infoDisplay);
}


// ========================================
// ADD STUDENT TO BLACKLIST
// ========================================

async function addToBlackList(student, button) {

  // Prevent double clicking
  button.disabled = true;

  button.innerHTML = `
    <span class="flex items-center gap-2">
      <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Adding...
    </span>
  `;


  try {

    const response = await fetch('/blacklist', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(student),

    });


    const result = await response.json();


    if (!response.ok) {

      throw new Error(
        result.message || 'Failed to add student'
      );

    }


    // SUCCESS
    addNameToTable(student);


    cancel1();


    inputforname.value = '';


    showAlert(
      `${student.fullname} has been added to the blacklist.`
    );


  } catch (error) {

    console.error(error);

    showAlert(
      error.message || 'Unable to add student to blacklist.'
    );


    // Restore button
    button.disabled = false;

    button.innerHTML = `
      <span class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>

        Add
      </span>
    `;

  }

}


// ========================================
// ADD STUDENT TO TABLE
// ========================================

function addNameToTable(student) {

  if (!table) return;


  // If table doesn't have tbody, create one
  let tbody = table.querySelector('tbody');


  if (!tbody) {

    tbody = document.createElement('tbody');

    tbody.className = 'divide-y divide-slate-100';

    table.appendChild(tbody);

  }


  const rows = tbody.querySelectorAll('tr');

  const sn = rows.length + 1;


  const tr = document.createElement('tr');

  tr.className =
    'hover:bg-slate-50/80 transition';


  tr.innerHTML = `

    <!-- Number -->
    <td class="px-6 py-5">

      <span class="text-sm font-medium text-slate-400">
        ${String(sn).padStart(2, '0')}
      </span>

    </td>


    <!-- Student -->
    <td class="px-6 py-5">

      <div class="flex items-center gap-3">

        <div
          class="w-10 h-10 rounded-full bg-blue-50
                 text-blue-700 flex items-center
                 justify-center font-bold text-sm"
        >
          ${getInitials(student.userName)}
        </div>

        <div>

          <p class="font-semibold text-slate-800">
            ${escapeHtml(student.userName.toUpperCase())}
          </p>

          <span class="text-xs text-red-500">
            Result access restricted
          </span>

        </div>

      </div>

    </td>


    <!-- Student ID -->
    <td class="px-6 py-5">

      <span
        class="inline-flex px-3 py-1.5 rounded-lg
               bg-slate-100 text-slate-700
               text-sm font-medium font-mono"
      >
        ${escapeHtml(student.studentId)}
      </span>

    </td>


    <!-- Action -->
    <td class="px-6 py-5 text-right">

      <button
        type="button"
        class="remove-btn inline-flex items-center
               gap-2 px-4 py-2 rounded-lg
               border border-red-200
               text-red-600 hover:bg-red-50
               hover:border-red-300 transition"
        data-id="${escapeHtml(student.studentId)}"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142
               A2 2 0 0116.138 21H7.862
               a2 2 0 01-1.995-1.858L5 7
               m5 4v6m4-6v6M9 7V4
               a1 1 0 011-1h4a1 1 0 011 1v3
               m-9 0h12"
          />
        </svg>

        Remove

      </button>

    </td>
  `;


  tbody.appendChild(tr);


  // Hide empty state
  if (tableEmpty) {

    tableEmpty.style.display = 'none';

  }


  table.style.display = 'table';


  // Update statistic
  updateBlacklistCount();

}


// ========================================
// UPDATE BLACKLIST COUNT
// ========================================

function updateBlacklistCount() {

  const tbody = table?.querySelector('tbody');

  if (!tbody) return;


  const count = tbody.querySelectorAll('tr').length;


  // Find the statistic number
  const numbers = document.querySelectorAll(
    '.text-3xl.font-bold'
  );


  if (numbers.length > 0) {

    numbers[0].textContent = count;

  }

}


// ========================================
// CLOSE STUDENT MODAL
// ========================================

function cancel1() {

  hideModal(infoDisplay);

  div.replaceChildren();

}


// ========================================
// HELPERS
// ========================================

function getInitials(name) {

  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

}


function escapeHtml(value) {

  const div = document.createElement('div');

  div.textContent = value ?? '';

  return div.innerHTML;

}