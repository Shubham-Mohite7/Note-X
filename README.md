# ✨ note-x ✨

A beautiful, modern platform for students to share, discover, and collaborate on study notes. Built with a stunning "glassmorphism" UI and packed with interactive features, note-x is designed to make learning more efficient and engaging.

This project is built entirely with vanilla **HTML, CSS, and JavaScript**, demonstrating how to create a rich, single-page application (SPA) feel without a complex framework.

## 🚀 Key Features

*   🎨 **Stunning Glassmorphism UI:** A sleek, modern interface with blur effects and a responsive design that looks great on any device.
*   🚀 **Seamless Note Sharing:** Upload your study notes in seconds and contribute to a growing library of knowledge.
*   🔍 **Advanced Search & Filtering:** Quickly find the exact notes you need with powerful filters for subject, category, grade, and more.
*   📊 **Interactive Note Analytics:** Dive deep into note quality with beautiful charts powered by Chart.js, visualizing community ratings and feedback.
*   📈 **Site-wide Dashboard:** Get a bird's-eye view of the platform's activity, including top contributors and note distribution by category.
*   🏆 **Community Leaderboard:** See who the top contributors are and get recognized for your efforts.
*   🌓 **Light & Dark Mode:** A comfortable viewing experience, day or night, with a smooth theme-switching toggle.

## 🛠️ Tech Stack

*   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
*   **Libraries:** [Chart.js](https://www.chartjs.org/) for data visualization.
*   **Fonts:** [Poppins](https://fonts.google.com/specimen/Poppins) from Google Fonts.

## 📂 Project Structure

The project is organized into three main files, keeping the structure simple and easy to navigate.

```
note-x/
├── 📄 index.html   # The main HTML file containing the structure for all views.
├── 🎨 style.css     # All styles, including animations, responsive design, and theme variables.
└── ⚙️ script.js     # All JavaScript logic for routing, dynamic rendering, and interactivity.
```

*   `index.html`: Serves as the single entry point. It contains the layout for all "pages" or "views" (Home, Search, Profile, etc.), which are toggled by JavaScript to simulate a multi-page application.
*   `style.css`: A comprehensive stylesheet that defines the entire visual identity. It uses CSS variables for easy theming (light/dark modes) and includes all responsive media queries.
*   `script.js`: The brain of the application. It handles:
    *   **View Management:** Showing and hiding different sections based on user navigation.
    *   **Dynamic Rendering:** Generating HTML for note cards, search results, and analytics from the sample data.
    *   **Event Handling:** Managing all user interactions, from form submissions to button clicks.
    *   **Chart.js Integration:** Rendering and updating all data visualizations.

## 🏁 Getting Started

This is a static web project and does not require a build process or a server to run.

1.  Clone the repository:
    ```sh
    git clone https://github.com/shubham-mohite/note-x.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd note-x
    ```
3.  Open `index.html` directly in your web browser (e.g., by double-clicking it).

## 👥 Contributors

*   Shubham Mohite
*   Hrithik R Muta
*   Nikhil Nambiar