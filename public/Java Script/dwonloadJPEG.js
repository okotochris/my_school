async function downloadResultAsJPG() {
    // Hide all elements with class 'button'
    var buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.style.display = 'none';
    });

    var resultContainer = document.getElementById('resultContainer');

    // Create a temporary container to hold the result content
    var tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '0';
    tempContainer.style.left = '0';
    tempContainer.style.width = 'auto';
    tempContainer.style.backgroundColor = '#fff';
    tempContainer.innerHTML = resultContainer.outerHTML;

    document.body.appendChild(tempContainer);

    try {
        // Ensure the container is fully visible and in the viewport
        window.scrollTo(0, 0);

        // Use dom-to-image to capture the content with highest quality
        var blob = await domtoimage.toBlob(tempContainer, { quality: 1 }); // Set quality to highest (1)
        var url = URL.createObjectURL(blob);

        // Create a link element to download the image
        var link = document.createElement('a');
        link.href = url;
        link.download = 'result.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Release the object URL
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating image:', error);
    } finally {
        // Remove the temporary container
        document.body.removeChild(tempContainer);

        // Show all elements with class 'button' again
        buttons.forEach(button => {
            button.style.display = 'block';
        });
    }
}
