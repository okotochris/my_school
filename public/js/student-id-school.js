document.addEventListener('DOMContentLoaded', () => {
    const getId = document.getElementById('getId');
    const classId = document.getElementById('classId');
    const table = document.getElementById('table');
    const loadingIndicator = document.querySelector('.loading');

    const studentNameBtn = document.querySelector('.student-name');
    const studentClassBtn = document.querySelector('.student-class');
    const divisionBtn = document.querySelector('.division');

    const studentNameForm = document.getElementById('student-name');
    const studentClassForm = document.getElementById('student-class');
    const studentDivisionForm = document.getElementById('student-division');

    // CLEAR TABLE
    function clearTable() {
        table.innerHTML = `
            <tr>
                <th width="400px">NAME</th>
                <th width="100px">CLASS</th>
                <th width="250px">ID</th>
                <th width="100px">Action</th>
            </tr>`;
    }

    // GENERATE TABLE ROWS WITH VIEW BUTTON
    function populateTable(dataArray) {
        clearTable();
        dataArray.forEach(data => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${data.userName.toUpperCase()}</td>
                <td>${data.class.toUpperCase()}</td>
                <td>${data.studentId.toUpperCase()}</td>
                <td>
                    <button class="view-btn" data-id="${data.studentId}">View</button>
                </td>
            `;
            table.appendChild(tr);
        });
        table.style.display = 'block';
    }

    // FETCH STUDENTS
    async function fetchStudents(url) {
        loadingIndicator.style.display = 'block';
        try {
            const response = await fetch(url);
            const datas = await response.json();
            if(datas.length === 0) {
                alert("No students found");
                clearTable();
            } else {
                populateTable(datas);
            }
        } catch (err) {
            console.error(err);
            alert("Error fetching students");
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }

    // SEARCH BY NAME
    if(getId) {
        getId.onclick = (e) => {
            e.preventDefault();
            const student_name = document.getElementById('student_name').value.trim();
            if (!student_name) return alert('Field cannot be empty');
            fetchStudents(`/getstudentid?student_name=${encodeURIComponent(student_name)}`);
        };
    }

    // SEARCH BY CLASS
    if(classId) {
        classId.onclick = (e) => {
            e.preventDefault();
            const studnetClass = document.getElementById('class').value.trim();
            if (!studnetClass) return alert('Select a class');
            fetchStudents(`/getclassid?class=${encodeURIComponent(studnetClass)}`);
        };
    }

    // TOGGLE FORMS
    function showForm(formToShow) {
        studentNameForm.style.display = 'none';
        studentClassForm.style.display = 'none';
        studentDivisionForm.style.display = 'none';
        formToShow.style.display = 'block';
    }

    if(studentNameBtn) studentNameBtn.onclick = () => showForm(studentNameForm);
    if(studentClassBtn) studentClassBtn.onclick = () => showForm(studentClassForm);
    if(divisionBtn) divisionBtn.onclick = () => showForm(studentDivisionForm);

    // NAVIGATE ON VIEW BUTTON CLICK
    table.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-btn')) {
            const studentId = e.target.dataset.id;
            window.location.href = `/student-profile/${studentId}`;
        }
    });
});