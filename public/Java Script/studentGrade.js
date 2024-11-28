let studentClass = document.querySelector('#class');
let accYear = document.querySelector('#year');


studentClass.onchange = ()=>{
    studentPerfomance(studentClass.value, accYear.value)
}

accYear.onchange = ()=>{
    studentPerfomance(studentClass.value, accYear.value)
}

window.addEventListener('load',  studentPerfomance(studentClass.value, accYear.value))
async function studentPerfomance(x, y){
    try{
        document.querySelector('.cover').style.display = 'block'
        let promise = await fetch(`/studentperfomance?class=${x}&section=${y}`)
        let result = await promise.json()
        tableDis(result)
        console.log(result)
    }
    catch(err){
        console.log(err)
    }
    finally{
         document.querySelector('.cover').style.display = 'none'
        
    }
}

  
function tableDis(result) {
    // Step 1: Aggregate data by userName
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
      user[termKey] = parseFloat(student.average) || 0; // Store term average
      user.termCount += 1;
      user.totalAverage += parseFloat(student.average) || 0; // Add to total average
  
      return acc;
    }, {});
  
    // Step 2: Calculate final total average for each student
    const finalData = Object.values(aggregated).map(student => {
      student.totalAverage = student.totalAverage / student.termCount;
      return student;
    });
  
    // Step 3: Sort by totalAverage in descending order
    finalData.sort((a, b) => b.totalAverage - a.totalAverage);
  
    // Step 4: Display data in table
    const tableBody = document.querySelector("#table tbody");
  
    if (tableBody) {
      // Loop through each row, find <td> elements, and remove the row if it has <td>s
      const rows = tableBody.querySelectorAll("tr");
      rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length > 0) {
          row.remove();  // Delete the row that contains <td> elements
        }
      });
  
      // Populate new rows with data
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
    } else {
      console.error("<tbody> not found! Ensure your table has a <tbody> element.");
    }
  }
  