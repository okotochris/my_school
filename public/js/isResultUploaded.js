let checkTimer = null;

// Run this when term is selected
document.getElementById("Sterm").onchange = () => {
    startCheck();
};

function startCheck() {
    // Start timer ONLY once
    if (checkTimer === null) {
        checkTimer = setInterval(isUploaded, 5000); // check after 2 seconds
    }
}

async function isUploaded() {
    const sClass = document.getElementById('Sclass').value;
    const sSection = document.getElementById('section').value;
    const studentId = document.getElementById('studentId').value;
    const term = document.getElementById('Sterm').value;
     // Ensure all fields are filled before checking
     console.log("checking..")
    if (!sClass || !sSection || !studentId || !term) {

    }
    else{
         try {
        const res = await fetch(`/api/is_uploaded?sClass=${sClass}&sSection=${sSection}&id=${studentId}&term=${term}`);

        // RESULT EXISTS
        if (res.status === 200) {
            showPopup();
            clearTimeout(checkTimer);
            checkTimer = null;
            return;
        }

        // RESULT NOT UPLOADED (404)
        if (res.status === 404) {
            clearTimeout(checkTimer);
            checkTimer = null;
            return;
        }

    } catch (err) {
        console.log("Network error:", err);
        // clearTimeout(checkTimer);
        // checkTimer = null;
    }
    }
}

function showPopup() {
    document.getElementById("responseBox").style.display = "block";
}


