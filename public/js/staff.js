const form = document.getElementById('staffForm');
const alertDialog = document.querySelector('.alert-dialog');
const alertMessage = document.getElementById('alertMessage');

// Show alert dialog with message
function showAlert(message) {
  alertMessage.textContent = message;
  alertDialog.style.display = 'block';
}

// Close alert dialog
function closeAlert() {
  alertDialog.style.display = 'none';
  alertMessage.textContent = '';
}

// Form submission
form.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Basic validation
  if (!data.user_name || !data.email || !data.password) {
    showAlert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('/admin_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      showAlert('Staff added successfully');
      form.reset();
      setTimeout(() => location.reload(), 1500);
    } else {
      showAlert('Failed to add staff');
    }
  } catch (err) {
    console.error(err);
    showAlert('An error occurred');
  }
};

// Delete staff
document.querySelectorAll('.delete-btn').forEach(item => {
  item.addEventListener('click', async () => {
    const id = item.dataset.id;
    try {
      const response = await fetch(`/deletestaff?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        showAlert('Staff deleted successfully');
        item.closest('tr').remove();
        const totalCount = document.querySelector('.total-count');
        const currentCount = parseInt(totalCount.textContent.match(/\d+/)[0]) - 1;
        totalCount.textContent = `Total Staff: ${currentCount}`;
        if (currentCount === 0) {
          document.querySelector('.table-wrapper').innerHTML = '<div class="table-empty">No staff available</div>';
        }
      } else {
        showAlert('Failed to delete staff');
      }
    } catch (err) {
      console.error(err);
      showAlert('Error: ' + err.message);
    }
  });
});