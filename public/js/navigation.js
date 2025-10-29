 document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.ejs') {
            document.getElementById('result').href = '/#result-checker';
            document.getElementById('home').href = '/';
        }
        });