document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("article-form");
  const articlesContainer = document.getElementById("articles");

  let articles = JSON.parse(localStorage.getItem("articles")) || [];

  function saveArticles() {
    localStorage.setItem("articles", JSON.stringify(articles));
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.getElementById("toast-container").appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function renderArticles() {
    articlesContainer.innerHTML = "";
    articles.forEach((article, index) => {
      const articleDiv = document.createElement("div");
      articleDiv.className = "article-card";
      articleDiv.innerHTML = `
        <h3>${article.title}</h3>
        <p><strong>Datum:</strong> ${article.date || "Okänd"}</p>
        <p>${article.content.length > 60 ? article.content.slice(0, 60) + "..." : article.content}</p>
        <button onclick="viewArticle(${index})">Läs mer</button>
        <button class="delete-btn" onclick="deleteArticle(${index})">Radera</button>
      `;
      articlesContainer.appendChild(articleDiv);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const content = document.getElementById("content").value;

    const newArticle = { title, date, content };
    articles.unshift(newArticle);
    saveArticles();
    renderArticles();
    form.reset();
    showToast("Artikel publicerad!");
  });

  window.deleteArticle = function (index) {
    if (confirm("Är du säker på att du vill radera artikeln?")) {
      articles.splice(index, 1);
      saveArticles();
      renderArticles();
      showToast("Artikel raderad.");
    }
  };

  window.viewArticle = function(index) {
    localStorage.setItem("viewArticleIndex", index);
    window.location.href = "article.html";
  };

  renderArticles();
});
