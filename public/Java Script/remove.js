
    document.addEventListener('DOMContentLoaded', () => {
        const removeButtons = document.querySelectorAll('.remove-btn');
        
        removeButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const studentId = this.getAttribute('data-id');
                
                const confirmDelete = confirm('Are you sure you want to remove this student?');
                if (confirmDelete) {
                    try {
                        const response = await fetch(`/blacklist/${studentId}`, {
                            method: 'DELETE'
                        });
                        
                        if (response.ok) {
                            alert('Student removed successfully!');
                            // Optionally, remove the row from the DOM
                            this.closest('tr').remove();
                        } else {
                            alert('Failed to remove student');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('An error occurred while trying to remove the student.');
                    }
                }
            });
        });
    });

