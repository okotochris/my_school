
document.addEventListener("DOMContentLoaded", async () => {
  const newsGrid = document.querySelector(".news-grid");

  try {
    const response = await fetch("/api/news");
    const data = await response.json();
    console.log(data)
    // Store full articles globally for easy access in click handlers
    window.__LATEST_NEWS = data.articles || [];

    newsGrid.innerHTML = "";

    if (window.__LATEST_NEWS.length > 0) {
      window.__LATEST_NEWS.slice(0, 9).forEach((article, index) => {
        const imageUrl = article.image || "https://via.placeholder.com/400x250?text=School+News";
        const title = article.title || "Untitled Article";
        const description = article.description || "Click below to read the full article.";
        const link = `/news_details?id=${index}`; // Use index as a simple ID
        const date = new Date(article.pubDate || article.dateTime).toLocaleDateString();
        const author = (Array.isArray(article.creator) ? article.creator[0] : article.creator) || "MySchoolResult";

        const card = document.createElement("article");
        card.classList.add("news-card");

        card.innerHTML = `
          <img src="${imageUrl}" alt="${title}" class="news-image" />
          <div class="news-content">
            <h3>${title}</h3>
            <p>${description.length > 150 ? description.slice(0, 150) + "..." : description}</p>
            <p class="news-meta">🗓️ ${date} | ✍️ ${author}</p>
            <a href="${link}" class="news-link" data-article-index="${index}">Read More</a>
          </div>
        `;

        newsGrid.appendChild(card);
      });
    } else {
      newsGrid.innerHTML = "<p>No recent school news available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error loading news:", error);
    newsGrid.innerHTML = "<p>⚠️ Unable to load news right now. Please try again later.</p>";
  }
});

// Cache full article to localStorage when "Read More" is clicked
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[data-article-index]');
  if (!link) return;

  const index = parseInt(link.dataset.articleIndex, 10);
  const articles = window.__LATEST_NEWS || [];
  const article = articles[index];

  if (article) {
    try {
      localStorage.setItem(`selectedArticle_${index}`, JSON.stringify(article));
      console.log(`Cached article ${index} to localStorage`);
    } catch (err) {
      console.error("Error caching article:", err);
    }
  }
});

