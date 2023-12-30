
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

      // Create a Blob from the HTML content
      var blob = new Blob([resultContent], { type: 'text/html' });

      // Create a download link
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'result.html';

      // Append the link to the DOM and trigger a click event
      document.body.appendChild(a);
      a.click();

      // Remove the link from the DOM
      document.body.removeChild(a);
    }