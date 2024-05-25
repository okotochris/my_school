async function downloadResult() {
  // Get the HTML content of the result container
  var resultContainer = document.getElementById('resultContainer');
  var resultContent = resultContainer.outerHTML; // Include outer HTML to capture styles

  // Fetch and include external stylesheets
  var stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  var stylesPromises = Array.from(stylesheets).map(async stylesheet => {
    var response = await fetch(stylesheet.href);
    var cssText = await response.text();
    resultContent += '<style>' + cssText + '</style>';
  });

  // Wait for all stylesheet fetches to complete
  await Promise.all(stylesPromises);

  // Use html2pdf.js to convert the HTML content to a PDF
  var element = document.createElement('div');
  element.innerHTML = resultContent;
  document.body.appendChild(element);

  var opt = {
    margin: [0.5, 0.5, 0.5, 0.5], // Adjust margins if necessary
    filename: 'result.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate the PDF and download it
  await html2pdf().from(element).set(opt).save();

  // Clean up the temporary element
  document.body.removeChild(element);
}
