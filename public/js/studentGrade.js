let studentClass = document.querySelector('#class');
let accYear = document.querySelector('#year');

studentClass.onchange = () => {
  studentPerformance(studentClass.value, accYear.value);
};

accYear.onchange = () => {
  studentPerformance(studentClass.value, accYear.value);
};

window.addEventListener('load', () => studentPerformance(studentClass.value, accYear.value));

async function studentPerformance(x, y) {
  try {
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.table-empty').style.display = 'none';
    let promise = await fetch(`/studentperfomance?class=${x}&section=${y}`);
    let result = await promise.json();
    tableDis(result);
  } catch (err) {
    console.error(err);
  } finally {
    document.querySelector('.loading').style.display = 'none';
  }
}

function tableDis(result) {
  const tableBody = document.querySelector("#table tbody");
  const emptyMessage = document.querySelector('.table-empty');

  if (!tableBody) {
    console.error("<tbody> not found! Ensure your table has a <tbody> element.");
    return;
  }

  tableBody.innerHTML = ''; // Clear existing rows

  if (!result || result.length === 0) {
    emptyMessage.style.display = 'block';
    return;
  }

  // Aggregate data by userName
  const aggregated = result.reduce((acc, student) => {
    const termKey = `${student.term} Average`;

    if (!acc[student.userName]) {
      acc[student.userName] = {
        userName: student.userName,
        class: student.class || "Unknown",
        section: student.section || "Unknown",
        "FIRST TERM Average": 0,
        "SECOND TERM Average": 0,
        "THIRD TERM Average": 0,
        totalAverage: 0,
        termCount: 0,
      };
    }

    const user = acc[student.userName];
    user[termKey] = parseFloat(student.average) || 0;
    user.termCount += 1;
    user.totalAverage += parseFloat(student.average) || 0;

    return acc;
  }, {});

  // Calculate final total average for each student
  const finalData = Object.values(aggregated).map(student => {
    student.totalAverage = student.termCount > 0 ? student.totalAverage / student.termCount : 0;
    return student;
  });

  // Sort by totalAverage in descending order
  finalData.sort((a, b) => b.totalAverage - a.totalAverage);

  // Populate table
  finalData.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.userName}</td>
      <td>${student.class}</td>
      <td>${student.section}</td>
      <td>${student["FIRST TERM Average"].toFixed(2)}</td>
      <td>${student["SECOND TERM Average"].toFixed(2)}</td>
      <td>${student["THIRD TERM Average"].toFixed(2)}</td>
      <td>${student.totalAverage.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });
}