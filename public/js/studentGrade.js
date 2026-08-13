const studentClass = document.querySelector('#class');
const accYear = document.querySelector('#year');

const table = document.querySelector('#table');
const tableBody = document.querySelector('#table tbody');
const loading = document.querySelector('.loading');
const emptyMessage = document.querySelector('.table-empty');

const searchInput = document.querySelector('#studentSearch');

const totalStudents = document.querySelector('#totalStudents');
const classAverage = document.querySelector('#classAverage');
const highestAverage = document.querySelector('#highestAverage');
const topStudent = document.querySelector('#topStudent');
const passRate = document.querySelector('#passRate');

const resultStatus = document.querySelector('#resultStatus');
const tableSummary = document.querySelector('#tableSummary');

let currentStudents = [];


/* =========================================
   FILTER EVENTS
========================================= */

studentClass?.addEventListener('change', () => {
    studentPerformance(
        studentClass.value,
        accYear.value
    );
});

accYear?.addEventListener('change', () => {
    studentPerformance(
        studentClass.value,
        accYear.value
    );
});


/* =========================================
   INITIAL LOAD
========================================= */

window.addEventListener('DOMContentLoaded', () => {

    studentPerformance(
        studentClass.value,
        accYear.value
    );

});


/* =========================================
   FETCH PERFORMANCE
========================================= */

async function studentPerformance(studentClassValue, academicYear) {

    showLoading();

    try {

        const response = await fetch(
            `/studentperfomance?class=${encodeURIComponent(studentClassValue)}&section=${encodeURIComponent(academicYear)}`
        );

        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }

        const result = await response.json();

        tableDis(result);

    } catch (err) {

        console.error('Performance error:', err);

        showEmpty(
            'Unable to load performance data',
            'Please check your connection and try again.'
        );

        updateStatus('Unable to load data', false);

    } finally {

        hideLoading();

    }
}


/* =========================================
   TABLE DISPLAY
========================================= */

function tableDis(result) {

    if (!tableBody) {
        console.error(
            '<tbody> not found!'
        );
        return;
    }

    tableBody.innerHTML = '';

    if (!result || result.length === 0) {

        currentStudents = [];

        resetStatistics();

        showEmpty(
            'No performance data',
            'There are no student results available for the selected class and academic year.'
        );

        updateStatus('No data available', false);

        return;
    }

    /*
      Aggregate students by userName
    */

    const aggregated = result.reduce((acc, student) => {

        const nameKey = student.userName;

        if (!acc[nameKey]) {

            acc[nameKey] = {

                userName:
                    student.fullname ||
                    student.userName ||
                    'Unknown Student',

                class:
                    student.studentClass ||
                    'Unknown',

                section:
                    student.section ||
                    'Unknown',

                firstTerm: null,
                secondTerm: null,
                thirdTerm: null

            };

        }

        const average =
            parseFloat(student.average);

        if (Number.isNaN(average)) {
            return acc;
        }


        /*
          Normalize term names
        */

        const term =
            String(student.term || '')
                .trim()
                .toUpperCase();


        if (
            term.includes('FIRST') ||
            term.includes('1ST')
        ) {

            acc[nameKey].firstTerm = average;

        }

        else if (
            term.includes('SECOND') ||
            term.includes('2ND')
        ) {

            acc[nameKey].secondTerm = average;

        }

        else if (
            term.includes('THIRD') ||
            term.includes('3RD')
        ) {

            acc[nameKey].thirdTerm = average;

        }

        return acc;

    }, {});


    /*
      Calculate overall average
    */

    const finalData =
        Object.values(aggregated).map(student => {

            const terms = [
                student.firstTerm,
                student.secondTerm,
                student.thirdTerm
            ].filter(
                value => value !== null
            );

            const total =
                terms.length
                    ? terms.reduce(
                        (sum, value) => sum + value,
                        0
                    ) / terms.length
                    : 0;

            return {
                ...student,
                totalAverage: total
            };

        });


    /*
      Highest performers first
    */

    finalData.sort(
        (a, b) =>
            b.totalAverage -
            a.totalAverage
    );


    currentStudents = finalData;

    renderTable(finalData);

    updateStatistics(finalData);

    updateStatus(
        `${finalData.length} student${finalData.length !== 1 ? 's' : ''}`,
        true
    );

}


/* =========================================
   RENDER TABLE
========================================= */

function renderTable(students) {

    tableBody.innerHTML = '';

    if (!students.length) {

        showEmpty(
            'No students found',
            'Try searching with a different name.'
        );

        return;
    }

    hideEmpty();


    students.forEach((student, index) => {

        const row =
            document.createElement('tr');


        row.className =
            'border-b border-slate-100 hover:bg-slate-50 transition';


        row.innerHTML = `

            <td class="px-5 py-4 text-slate-400 font-medium">
                ${index + 1}
            </td>


            <td class="px-5 py-4">

                <div class="flex items-center gap-3">

                    <div
                        class="w-9 h-9 rounded-full
                               bg-blue-100
                               text-blue-700
                               flex items-center justify-center
                               font-bold text-sm"
                    >
                        ${getInitials(student.userName)}
                    </div>

                    <div>

                        <p class="font-semibold text-slate-800">
                            ${escapeHTML(student.userName)}
                        </p>

                        <p class="text-xs text-slate-400">
                            Student
                        </p>

                    </div>

                </div>

            </td>


            <td class="px-5 py-4">

                <span
                    class="inline-flex
                           px-3 py-1
                           rounded-lg
                           bg-slate-100
                           text-slate-700
                           text-xs
                           font-semibold"
                >
                    ${escapeHTML(student.class)}
                </span>

            </td>


            <td class="px-5 py-4 text-slate-600">
                ${escapeHTML(student.section)}
            </td>


            <td class="px-5 py-4 text-center">
                ${formatTerm(student.firstTerm)}
            </td>


            <td class="px-5 py-4 text-center">
                ${formatTerm(student.secondTerm)}
            </td>


            <td class="px-5 py-4 text-center">
                ${formatTerm(student.thirdTerm)}
            </td>


            <td class="px-5 py-4 text-center">
                ${formatOverall(student.totalAverage)}
            </td>

        `;

        tableBody.appendChild(row);

    });

}


/* =========================================
   TERM SCORE
========================================= */

function formatTerm(value) {

    if (value === null || value === undefined) {

        return `
            <span class="text-slate-300">
                —
            </span>
        `;

    }

    return `
        <span
            class="inline-flex
                   min-w-[55px]
                   justify-center
                   px-3 py-1
                   rounded-lg
                   bg-slate-100
                   text-slate-700
                   font-semibold"
        >
            ${Number(value).toFixed(2)}
        </span>
    `;

}


/* =========================================
   OVERALL SCORE
========================================= */

function formatOverall(value) {

    const score =
        Number(value);

    let classes =
        'bg-red-50 text-red-700';

    if (score >= 70) {

        classes =
            'bg-emerald-50 text-emerald-700';

    } else if (score >= 50) {

        classes =
            'bg-amber-50 text-amber-700';

    }

    return `
        <span
            class="inline-flex
                   min-w-[65px]
                   justify-center
                   px-3 py-1
                   rounded-full
                   font-bold
                   ${classes}"
        >
            ${score.toFixed(2)}
        </span>
    `;

}


/* =========================================
   STATISTICS
========================================= */

function updateStatistics(students) {

    if (!students.length) {

        resetStatistics();

        return;

    }


    /*
      Total students
    */

    if (totalStudents) {

        totalStudents.textContent =
            students.length;

    }


    /*
      Class average
    */

    const average =
        students.reduce(
            (sum, student) =>
                sum + student.totalAverage,
            0
        ) / students.length;


    if (classAverage) {

        classAverage.textContent =
            average.toFixed(2);

    }


    /*
      Highest average
    */

    const highest =
        students[0];


    if (highestAverage) {

        highestAverage.textContent =
            highest.totalAverage.toFixed(2);

    }


    if (topStudent) {

        topStudent.textContent =
            highest.userName;

    }


    /*
      Pass rate

      You can change 50 to whatever
      your school's pass mark is.
    */

    const passed =
        students.filter(
            student =>
                student.totalAverage >= 50
        ).length;


    const rate =
        (passed / students.length) * 100;


    if (passRate) {

        passRate.textContent =
            `${rate.toFixed(0)}%`;

    }


    /*
      Footer
    */

    if (tableSummary) {

        tableSummary.textContent =
            `Showing ${students.length} student${students.length !== 1 ? 's' : ''}`;

    }

}


/* =========================================
   SEARCH
========================================= */

searchInput?.addEventListener(
    'input',
    function () {

        const search =
            this.value
                .trim()
                .toLowerCase();


        if (!search) {

            renderTable(currentStudents);

            return;

        }


        const filtered =
            currentStudents.filter(
                student =>
                    student.userName
                        .toLowerCase()
                        .includes(search)
            );


        renderTable(filtered);

    }
);


/* =========================================
   LOADING
========================================= */

function showLoading() {

    loading.style.display =
        'block';

    emptyMessage.style.display =
        'none';

    if (table) {

        table.style.display =
            'none';

    }

}


/* =========================================
   HIDE LOADING
========================================= */

function hideLoading() {

    loading.style.display =
        'none';

    if (table) {

        table.style.display =
            'table';

    }

}


/* =========================================
   EMPTY STATE
========================================= */

function showEmpty(title, message) {

    emptyMessage.style.display =
        'block';

    emptyMessage.innerHTML = `

        <div
            class="mx-auto w-16 h-16
                   rounded-2xl bg-slate-100
                   flex items-center justify-center
                   text-3xl mb-4"
        >
            📊
        </div>

        <h3
            class="font-semibold text-lg
                   text-slate-800"
        >
            ${escapeHTML(title)}
        </h3>

        <p
            class="text-sm text-slate-500
                   max-w-md mx-auto mt-2"
        >
            ${escapeHTML(message)}
        </p>

    `;

    if (table) {

        table.style.display =
            'none';

    }

}


/* =========================================
   HIDE EMPTY
========================================= */

function hideEmpty() {

    emptyMessage.style.display =
        'none';

    if (table) {

        table.style.display =
            'table';

    }

}


/* =========================================
   STATUS
========================================= */

function updateStatus(message, success = true) {

    if (!resultStatus) return;

    resultStatus.innerHTML = `

        <span
            class="w-2 h-2 rounded-full
                   ${success
                       ? 'bg-emerald-500'
                       : 'bg-red-400'}"
        ></span>

        ${escapeHTML(message)}

    `;

}


/* =========================================
   RESET STATISTICS
========================================= */

function resetStatistics() {

    if (totalStudents)
        totalStudents.textContent = '--';

    if (classAverage)
        classAverage.textContent = '--';

    if (highestAverage)
        highestAverage.textContent = '--';

    if (topStudent)
        topStudent.textContent = 'No data yet';

    if (passRate)
        passRate.textContent = '--';

}


/* =========================================
   INITIALS
========================================= */

function getInitials(name) {

    if (!name) return '?';

    return name
        .split(' ')
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();

}


/* =========================================
   SECURITY
========================================= */

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return '';

    }

    const div =
        document.createElement('div');

    div.textContent =
        String(value);

    return div.innerHTML;

}