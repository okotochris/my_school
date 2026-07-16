document.addEventListener('DOMContentLoaded', () => {
    const getId = document.getElementById('getId');
    const classId = document.getElementById('classId');
    const table = document.getElementById('table');
    const loadingIndicator = document.querySelector('#loadingIndicator');

    const studentNameBtn = document.querySelector('.student-name');
    const studentClassBtn = document.querySelector('.student-class');
    const divisionBtn = document.querySelector('.division');

    const studentNameForm = document.getElementById('student-name');
    const studentClassForm = document.getElementById('student-class');
    const studentDivisionForm = document.getElementById('student-division');


    // GENERATE TABLE ROWS WITH VIEW BUTTON
   const container = document.getElementById("studentCards");

function populateCards(dataArray) {
    container.innerHTML = "";

    dataArray.forEach((data) => {

        const initials = data.userName
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

        const card = document.createElement("div");

        card.className = `
            bg-white rounded-2xl shadow-sm border border-gray-200
            p-5 hover:shadow-lg transition
        `;

        card.innerHTML = `
            <!-- Header -->
            <div class="flex justify-between items-center">

                <div class="flex items-center gap-3">

                    <div class="w-12 h-12 rounded-full bg-blue-600 text-white
                                flex items-center justify-center font-bold">
                        ${initials}
                    </div>

                    <div>
                        <h3 class="font-semibold text-lg">${data.userName}</h3>
                        <p class="text-gray-500">${data.class}</p>
                    </div>

                </div>

                <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Active
                </span>

            </div>

            <!-- Student ID -->
            <div class="mt-5">

                <p class="text-sm text-gray-500">
                    Student ID
                </p>

                <div class="flex justify-between items-center mt-1">

                    <span class="font-bold text-blue-600">
                        ${data.studentId}
                    </span>

                    <button
                        class="copy-btn p-2 rounded-lg hover:bg-gray-100"
                        data-id="${data.studentId}"
                        title="Copy Student ID">

                        📋

                    </button>

                </div>

            </div>

            <!-- Button -->
            <button
                class="view-btn mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3"
                onclick="window.location.href='/student-profile/${data.studentId}'">

                View Student

            </button>
        `;

        container.appendChild(card);

    });

}

    // FETCH STUDENTS
    async function fetchStudents(url) {
        loadingIndicator.style.display = 'block';
        try {
            const response = await fetch(url);
            const datas = await response.json();
            if(datas.length === 0) {
                alert("No students found");
               
                document.getElementById('notFound').style.display = 'block'
            } else {
                populateCards(datas);
                document.getElementById('result_count').innerText = datas.length
                document.getElementById('result_count2').innerText = datas.length
                 
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

    //
});