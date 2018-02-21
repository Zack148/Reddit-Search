import reddit from './redditapi'

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

// Form Event Listener
searchForm.addEventListener('submit', e => {
  // Get Search Term
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value
  // Get limit
  const searchLimit = document.getElementById('limit').value
  // Check input
  if (searchTerm === '') {
    // Show Message
    showMessage('Please add a search term', 'alert-danger')
  }

  // Clear Input
  // searchInput.value = '';

  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then
  (results => {
    console.log(results);
      let output = '<div class="card-columns">'
      // Loop through posts
      results.forEach(post => {
        // check for image
        const image = post.preview ? post.preview.images[0].source.url : `https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Reddit_logo_and_wordmark.svg/1200px-Reddit_logo_and_wordmark.svg.png`
        output += `
      <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${shortText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subbreddit: ${post.subreddit}</span>
            <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
          </div>
    `
      })
      output += '</div>'
      document.getElementById('results').innerHTML = output;
    })
  e.preventDefault()
})

//Show Message
function showMessage(message, className) {
  //Create div
  const div = document.createElement('div')
  // Add Class
  div.className = `alert ${className}`
  // Add Text
  div.appendChild(document.createTextNode(message))
  //Get Parent Container
  const searchContainer = document.getElementById('search-container')
  // Get Search
  const search = document.getElementById('search')

  //Insert Message
  searchContainer.insertBefore(div, search)

  // Timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 3000)
}

//Short the text
function shortText(text,limit) {
  const shortened = text.indexOf(' ', limit)
  if(shortened == -1) return text;
  return text.substring(0, shortened)
}
