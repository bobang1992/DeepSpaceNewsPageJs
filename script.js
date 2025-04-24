// Fetch articles from localStorage and display them
document.addEventListener("DOMContentLoaded", function() {
    const articlesContainer = document.getElementById('articles-container');
    
    // Retrieve articles from localStorage
    const articles = JSON.parse(localStorage.getItem('articles')) || [];

    // Function to display articles
    function displayArticles() {
        articlesContainer.innerHTML = ''; // Clear container before re-rendering
        articles.forEach((article, index) => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article-card');
            articleDiv.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <button class="delete-btn" onclick="deleteArticle(${index})">Delete</button>
            `;
            articlesContainer.appendChild(articleDiv);
        });
    }

    // Call function to display articles
    displayArticles();

    // Event listener to add a new article
    const articleForm = document.getElementById('article-form');
    articleForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (title && content) {
            const newArticle = {
                title: title,
                content: content
            };

            // Add new article to localStorage
            articles.push(newArticle);
            localStorage.setItem('articles', JSON.stringify(articles));

            // Reset the form and re-display the articles
            articleForm.reset();
            displayArticles();
            showToast('Article added successfully!');
        }
    });

    // Function to delete an article
    window.deleteArticle = function(index) {
        // Remove the article from the array
        articles.splice(index, 1);

        // Update localStorage
        localStorage.setItem('articles', JSON.stringify(articles));

        // Re-display the articles
        displayArticles();
        showToast('Article deleted successfully!');
    };

    // Function to show a toast message
    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});
