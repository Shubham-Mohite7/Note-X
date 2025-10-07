// --- Sample Data (in a real app, this would come from a server) ---
const notes = [
    {
        id: 1,
        title: 'Calculus I Cheat Sheet',
        uploader: 'Sarah K.',
        avgRating: 4.5,
        content: 'A comprehensive one-page cheat sheet covering limits, derivatives, and basic integrals. Perfect for last-minute exam prep.',
        reviews: [
            { name: 'Mark', rating: 5, text: 'Saved me for my final!' },
            { name: 'Emily', rating: 4, text: 'Great summary, but could use more examples for chain rule.' }
        ],
        analytics: { quality: [5, 4, 5, 4, 4], distribution: [0, 1, 5, 12, 18] }
    },
    {
        id: 2,
        title: 'History of Ancient Rome',
        uploader: 'Mike P.',
        category: 'University',
        avgRating: 4.8,
        content: 'Detailed notes on the Roman Republic and the transition to the Roman Empire, including key figures like Caesar and Augustus.',
        reviews: [
            { name: 'David', rating: 5, text: 'Incredibly detailed and well-organized.' }
        ],
        analytics: { quality: [5, 5, 5, 4, 5], distribution: [0, 0, 2, 10, 25] }
    },
    {
        id: 3,
        title: 'Intro to Python Programming',
        uploader: 'Chris L.',
        category: 'University',
        avgRating: 4.9,
        content: 'Beginner-friendly notes on Python syntax, data types, loops, and functions. Includes simple code snippets.',
        reviews: [
            { name: 'Jessica', rating: 5, text: 'The best intro notes I have found!' },
            { name: 'Tom', rating: 5, text: 'Clear, concise, and accurate.' }
        ],
        analytics: { quality: [5, 4, 5, 5, 5], distribution: [0, 0, 1, 8, 32] }
    },
    {
        id: 4,
        title: 'Organic Chemistry Reactions',
        uploader: 'Emily R.',
        category: 'High School',
        avgRating: 4.2,
        content: 'A summary of major reaction mechanisms in introductory organic chemistry, including SN1, SN2, E1, and E2.',
        reviews: [
            { name: 'Ben', rating: 4, text: 'Good overview, but a bit dense.' }
        ],
        analytics: { quality: [4, 4, 5, 3, 4], distribution: [1, 3, 9, 11, 7] }
    },
    {
        id: 5,
        title: 'World War II Summary',
        uploader: 'Mike P.',
        category: 'High School',
        avgRating: 4.6,
        content: 'A summary of the major events and figures of World War II.',
        reviews: [
            { name: 'Ben', rating: 5, text: 'Great for a quick review.' }
        ],
        analytics: { quality: [5, 4, 5, 4, 4], distribution: [0, 1, 4, 10, 9] }
    }
];

// --- Function to render notes ---
const notesGrid = document.getElementById('notes-grid');
function renderNotes(notesToRender = notes, targetElement = notesGrid) {
    notesGrid.innerHTML = ''; // Clear existing notes
    notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.dataset.noteId = note.id; // Store note ID on the element
        card.style.setProperty('--delay', `${index * 100}ms`); // Staggered animation delay
        card.innerHTML = `
            <h3>${note.title}</h3>
            <p><em>By: ${note.uploader}</em></p>
            <div class="star-rating">${'★'.repeat(Math.round(note.avgRating))}${'☆'.repeat(5 - Math.round(note.avgRating))}</div>
        `;

        // Add tilt effect listener
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10; // Adjust divisor for sensitivity
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });

        card.addEventListener('click', () => showNoteDetail(note.id));

        notesGrid.appendChild(card);
    });
}

// --- Event Listeners ---

// 1. Handle Note Upload Form
const uploadForm = document.getElementById('upload-form');
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission
    const title = document.getElementById('note-title').value;
    const file = document.getElementById('note-file').files[0];
    console.log('Uploading Note:');
    console.log('Title:', title);
    console.log('File:', file.name);
    alert(`Note "${title}" ready for upload! (Check console for details)`);
    uploadForm.reset();
});

// 2. Handle Review Submission Form
const reviewForm = document.getElementById('review-form');
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reviewerName = document.getElementById('reviewer-name').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const reviewText = document.getElementById('review-text').value;

    // Dynamically add the new review to the page
    const reviewsSection = document.getElementById('reviews');
    const newReviewDiv = document.createElement('div');
    newReviewDiv.className = 'review';
    newReviewDiv.innerHTML = `
        <p><strong>${reviewerName}:</strong> <span class="star-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span></p>
        <p>"${reviewText}"</p>
    `;
    reviewsSection.appendChild(newReviewDiv);

    alert('Thank you for your review!');
    reviewForm.reset();
});

// 3. Handle Cursor Spotlight Effect
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.body.style.setProperty('--cursor-y', `${e.clientY}px`);
});

// 4. Navigation Logic
const homeView = document.getElementById('home-view');
const noteDetailView = document.getElementById('note-detail-view');
const searchView = document.getElementById('search-view');
const profileView = document.getElementById('profile-view');
const dashboardView = document.getElementById('dashboard-view');
const navHome = document.getElementById('nav-home');
const navUpload = document.getElementById('nav-upload');
const navSearch = document.getElementById('nav-search');
const navDashboard = document.getElementById('nav-dashboard');
const navProfile = document.getElementById('nav-profile');
const logo = document.getElementById('logo');

function hideAllViews() {
    homeView.classList.add('hidden');
    noteDetailView.classList.add('hidden');
    searchView.classList.add('hidden');
    profileView.classList.add('hidden');
    dashboardView.classList.add('hidden');
}

function showHome() {
    hideAllViews();
    homeView.classList.remove('hidden');
}

function showNoteDetail(noteId) {
    homeView.classList.add('hidden');
    noteDetailView.classList.remove('hidden');

    const note = notes.find(n => n.id === noteId);
    if (!note) {
        showHome();
        return;
    }

    // Populate detail view with note data
    document.getElementById('detail-title').textContent = note.title;
    document.getElementById('detail-uploader').innerHTML = `<em>Uploaded by: ${note.uploader}</em>`;
    document.getElementById('detail-avg-rating').innerHTML = `${'★'.repeat(Math.round(note.avgRating))}${'☆'.repeat(5 - Math.round(note.avgRating))} (${note.avgRating} average)`;
    document.getElementById('detail-content').textContent = note.content;

    // Populate reviews
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
    note.reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        reviewDiv.innerHTML = `
            <p><strong>${review.name}:</strong> <span class="star-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span></p>
            <p>"${review.text}"</p>
        `;
        reviewsList.appendChild(reviewDiv);
    });

    // Render charts with specific note data
    renderCharts(note.analytics);

    window.scrollTo(0, 0); // Scroll to top of page
}

function showSearchView() {
    hideAllViews();
    searchView.classList.remove('hidden');
    document.getElementById('search-input').focus();
    // Initially render all notes, or you could leave it empty
    renderSearchResults(notes);
}

function showProfileView() {
    hideAllViews();
    profileView.classList.remove('hidden');
    document.getElementById('signin-email').focus();
}
function showDashboardView() {
    hideAllViews();
    dashboardView.classList.remove('hidden');
    renderDashboard();
    window.scrollTo(0, 0);
}

// --- Auth Form Functionality ---
const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    console.log(`Signing in with email: ${email}`);
    alert('Sign-in functionality is under construction. Check the console!');
    signInForm.reset();
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    console.log(`Signing up with name: ${name} and email: ${email}`);
    alert('Sign-up functionality is under construction. Check the console!');
    signUpForm.reset();
});

// --- Search Functionality ---
const searchInput = document.getElementById('search-input');
const subjectInput = document.getElementById('search-subject');
const categoryInput = document.getElementById('search-category');
const gradeInput = document.getElementById('search-grade');
const searchResultsGrid = document.getElementById('search-results-grid');
const searchForm = document.getElementById('search-form');

// Prevent form submission on Enter key
searchForm.addEventListener('submit', e => e.preventDefault());

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const subjectTerm = subjectInput.value.toLowerCase();
    const categoryTerm = categoryInput.value;
    const gradeTerm = gradeInput.value;

    const filteredNotes = notes.filter(note => {
        const matchesSearch = searchTerm === '' ||
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm) ||
            note.uploader.toLowerCase().includes(searchTerm);

        const matchesSubject = subjectTerm === '' ||
            note.subject.toLowerCase().includes(subjectTerm);

        const matchesCategory = categoryTerm === '' ||
            note.category === categoryTerm;

        const matchesGrade = gradeTerm === '' ||
            note.grade === gradeTerm;

        return matchesSearch && matchesSubject && matchesCategory && matchesGrade;
    });

    renderSearchResults(filteredNotes);
}

[searchInput, subjectInput, categoryInput, gradeInput].forEach(input => input.addEventListener('input', applyFilters));

function renderSearchResults(results, targetElement = searchResultsGrid) {
    targetElement.innerHTML = '';
    if (results.length === 0) {
        const message = '<p>No notes found matching your search.</p>';
        targetElement.innerHTML = message;
        return;
    }
    results.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.dataset.noteId = note.id;
        card.style.setProperty('--delay', `${index * 50}ms`); // Faster animation for results
        card.innerHTML = `
            <h3>${note.title}</h3>
            <p><em>By: ${note.uploader}</em></p>
            <div class="star-rating">${'★'.repeat(Math.round(note.avgRating))}${'☆'.repeat(5 - Math.round(note.avgRating))}</div>
        `;
        card.addEventListener('click', () => showNoteDetail(note.id));
        targetElement.appendChild(card);
    });
}

navHome.addEventListener('click', (e) => { e.preventDefault(); showHome(); });
logo.addEventListener('click', (e) => { e.preventDefault(); showHome(); });
navUpload.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
    document.getElementById('upload-note').scrollIntoView({ behavior: 'smooth' });
});
navSearch.addEventListener('click', (e) => { e.preventDefault(); showSearchView(); });
navDashboard.addEventListener('click', (e) => { e.preventDefault(); showDashboardView(); });
navProfile.addEventListener('click', (e) => { e.preventDefault(); showProfileView(); });



// --- Chart.js Data Visualization ---
let radarChartInstance, barChartInstance, dashboardChartInstance;

function renderCharts(analyticsData) {
    if (radarChartInstance) radarChartInstance.destroy();
    if (barChartInstance) barChartInstance.destroy();

    // 1. Radar Chart
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    radarChartInstance = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Clarity', 'Depth', 'Accuracy', 'Structure', 'Examples'],
            datasets: [{
                label: 'Note Quality Score',
                data: analyticsData.quality,
                fill: true,
                backgroundColor: 'rgba(10, 104, 71, 0.2)',
                borderColor: 'rgb(10, 104, 71)',
                pointBackgroundColor: 'rgb(10, 104, 71)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(10, 104, 71)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: { color: '#ddd' },
                    grid: { color: '#ddd' },
                    pointLabels: { font: { size: 14, family: "'Poppins', sans-serif" } },
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            }
        }
    });

    // 2. Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    barChartInstance = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
            datasets: [{
                label: 'Rating Distribution',
                data: analyticsData.distribution,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
}

// --- Dashboard Analytics Rendering ---
function renderDashboard() {
    // Calculate stats
    const totalNotes = notes.length;
    const totalRating = notes.reduce((sum, note) => sum + note.avgRating, 0);
    const averageRating = (totalRating / totalNotes).toFixed(1);

    const uploaderCounts = notes.reduce((acc, note) => {
        acc[note.uploader] = (acc[note.uploader] || 0) + 1;
        return acc;
    }, {});
    const topUploader = Object.keys(uploaderCounts).reduce((a, b) => uploaderCounts[a] > uploaderCounts[b] ? a : b, 'N/A');

    const highestRatedNote = notes.reduce((max, note) => (note.avgRating > max.avgRating) ? note : max, notes[0]);

    // Update stat cards
    document.getElementById('total-notes-stat').textContent = totalNotes;
    document.getElementById('average-rating-stat').textContent = averageRating;
    document.getElementById('top-uploader-stat').textContent = topUploader;
    document.getElementById('highest-rated-stat').textContent = highestRatedNote.title;

    // Calculate data for the chart
    const categoryCounts = notes.reduce((acc, note) => {
        const category = note.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const chartLabels = Object.keys(categoryCounts);
    const chartData = Object.values(categoryCounts);

    // Render the dashboard chart
    if (dashboardChartInstance) dashboardChartInstance.destroy();
    const dashboardCtx = document.getElementById('dashboardChart').getContext('2d');
    dashboardChartInstance = new Chart(dashboardCtx, {
        type: 'doughnut',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Notes per Category',
                data: chartData,
                backgroundColor: [
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Notes Distribution by Category'
                }
            }
        }
    });
}

// --- Leaderboard Rendering ---
function renderLeaderboard() {
    const uploaderCounts = notes.reduce((acc, note) => {
        acc[note.uploader] = (acc[note.uploader] || 0) + 1;
        return acc;
    }, {});

    // Sort uploaders by count and take the top 5
    const sortedUploaders = Object.entries(uploaderCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear previous entries

    if (sortedUploaders.length === 0) {
        leaderboardList.innerHTML = '<li>No contributions yet. Be the first!</li>';
        return;
    }

    sortedUploaders.forEach(([uploader, count], index) => {
        const listItem = document.createElement('li');
        // Get initials for the avatar
        const initials = uploader.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        listItem.innerHTML = `
            <div class="leaderboard-user">
                <span class="leaderboard-rank">${index + 1}</span>
                <div class="leaderboard-avatar">${initials}</div>
                <span class="leaderboard-name">${uploader}</span>
            </div>
            <span class="leaderboard-count">${count} Note${count > 1 ? 's' : ''}</span>
        `;
        leaderboardList.appendChild(listItem);
    });
}

// --- Initial Page Load ---
renderNotes(notes, notesGrid);
showHome();
renderLeaderboard();