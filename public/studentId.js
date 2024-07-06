let aphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let number = '1234567890'
let studentId = document.getElementById('studentId')
let GenerateId = document.getElementById('GenerateId')
GenerateId.onclick = function(){
    event.preventDefault();
    let random = '';
        for(let i = 1; i<=3; i++){
            random += aphabet[Math.floor(Math.random() * aphabet.length)]
        }
        for(let i = 1; i<=4; i++){
            random += number[Math.floor(Math.random() * number.length)]
        }
        for(let i = 1; i<=3; i++){
            random += aphabet[Math.floor(Math.random() * aphabet.length)]
        }
    studentId.value = random
    studentId.select()
    document.execCommand('copy')
}

document.getElementById('updateNameForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const currentName = document.getElementById('currentName').value;
    const newName = document.getElementById('newName').value;

    console.log('Current Name:', currentName);
    console.log('New Name:', newName);

    try {
        const response = await fetch(`/update-student-name?currentName=${encodeURIComponent(currentName)}&newName=${encodeURIComponent(newName)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        console.log('Response:', result);

        if (response.ok) {
            alert('Student name updated successfully!');
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});