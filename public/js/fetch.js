// Global variables
let studentId = document.getElementById('studentId');
let user = document.getElementById('userName');
let Sclass = document.getElementById('Sclass');
let searchResults = []; // To store search results for selection
let getIdBtn = document.querySelector('button[onclick="student()"]'); // Assume button selector; adjust if needed

// Function to show loading indicator
function showLoading() {
    if (getIdBtn) {
        getIdBtn.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 0.5rem;">Loading <div style="width: 12px; height: 12px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div></span>';
        getIdBtn.disabled = true;
    }
}

// Function to hide loading indicator
function hideLoading() {
    if (getIdBtn) {
        getIdBtn.innerHTML = 'Get ID';
        getIdBtn.disabled = false;
    }
}

// Function to populate fields with selected student data
function populateStudent(data) {
    studentId.value = data.studentId;
    user.value = data.userName.toUpperCase();
    Sclass.value = data.class;
    console.log(data.class);
}

// Function to show results list with improved UI
function showResultsList(data) {
    searchResults = data;
    
    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'resultsList';
    resultsDiv.className = 'student-modal';
    resultsDiv.innerHTML = `
        <div class="modal-overlay" onclick="closeResultsList()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Select Student</h3>
                <button class="close-btn" onclick="closeResultsList()">&times;</button>
            </div>
            <div class="modal-body">
                <ul class="results-list">
                    ${data.map((stu, index) => `
                        <li class="result-item" onclick="selectStudent(${index})" tabindex="0" onkeydown="if(event.key==='Enter') selectStudent(${index})">
                            <div class="student-info">
                                <div class="student-name">${stu.userName}</div>
                                <div class="student-id">ID: ${stu.studentId}</div>
                            </div>
                            <div class="student-class">Class: ${stu.class}</div>
                            <div class="select-arrow">→</div>
                        </li>
                    `).join('')}
                </ul>
                ${data.length === 0 ? '<p class="no-results">No students found.</p>' : ''}
            </div>
            <div class="modal-footer">
                <button class="cancel-btn" onclick="closeResultsList()">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(resultsDiv);
    
    // Add global styles for the modal (only once)
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .student-modal {
                animation: fadeIn 0.2s ease-out;
            }
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
            }
            .modal-content {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                max-width: 500px;
                width: 90%;
                max-height: 70vh;
                overflow: hidden;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
                background: linear-gradient(135deg, #1a73e8, #1557b0);
                color: white;
            }
            .modal-header h3 {
                margin: 0;
                font-size: 1.3rem;
                font-weight: 600;
            }
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s;
            }
            .close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .modal-body {
                padding: 0;
                max-height: calc(70vh - 120px);
                overflow-y: auto;
            }
            .results-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .result-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 20px;
                border-bottom: 1px solid #f0f0f0;
                cursor: pointer;
                transition: background 0.2s;
            }
            .result-item:hover,
            .result-item:focus {
                background: #f8f9fa;
                outline: none;
            }
            .student-info {
                flex: 1;
            }
            .student-name {
                font-weight: 600;
                color: #333;
                margin-bottom: 2px;
            }
            .student-id {
                font-size: 0.9rem;
                color: #666;
            }
            .student-class {
                font-size: 0.9rem;
                color: #1a73e8;
                margin-right: 10px;
            }
            .select-arrow {
                color: #1a73e8;
                font-weight: bold;
            }
            .no-results {
                text-align: center;
                padding: 40px 20px;
                color: #666;
                font-style: italic;
            }
            .modal-footer {
                padding: 15px 20px;
                border-top: 1px solid #eee;
                text-align: right;
            }
            .cancel-btn {
                background: #6c757d;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.2s;
            }
            .cancel-btn:hover {
                background: #5a6268;
            }
            /* Mobile Responsiveness */
            @media (max-width: 480px) {
                .modal-content {
                    width: 95%;
                    max-height: 80vh;
                }
                .modal-header {
                    padding: 15px;
                }
                .result-item {
                    padding: 12px 15px;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 5px;
                }
                .student-class, .select-arrow {
                    align-self: flex-end;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to select student from list
function selectStudent(index) {
    const data = searchResults[index];
    populateStudent(data);
    closeResultsList();
}

// Function to close results list
function closeResultsList() {
    const modal = document.getElementById('resultsList');
    if (modal) {
        modal.remove();
    }
    // Remove styles if empty (optional, but cleans up)
    const style = document.getElementById('modal-styles');
    if (style && !document.querySelector('.student-modal')) {
        style.remove();
    }
}

// Fetching student info from database
const student = async () => {
    let userName = document.getElementById('userName').value.trim();
    if (userName === '') {
        alert('Enter student name');
        return false;
    }
    
    showLoading();
    
    try {
        const userInfo = await fetch(`/getstudentid?student_name=${encodeURIComponent(userName)}`);
        const userData = await userInfo.json();
        
        hideLoading();
        
        // Assigning value from database to corresponding input field
        if (userData) {
            if (userData.message) {
                studentId.value = userData.message;
                alert(`${userName} is not registered`);
            } else if (userData.length === 0) {
                alert(`${userName} is not registered`);
            } else if (userData.length === 1) {
                populateStudent(userData[0]);
            } else {
                // Multiple results: show list
                showResultsList(userData);
            }
        }
    } catch (err) {
        hideLoading();
        console.error(`${err} Unable to retrieve data`);
        alert('Error fetching student data. Please try again.');
    }
};