const themeBtn = document.getElementById("themeBtn");
const themeStatus = document.getElementById("themeStatus");
const welcomeToggleBtn = document.getElementById("welcomeToggleBtn");
const welcomePanel = document.getElementById("welcomePanel");
const visitorNameInput = document.getElementById("visitorName");
const saveNameBtn = document.getElementById("saveNameBtn");
const greetingMessage = document.getElementById("greetingMessage");
const visitTimer = document.getElementById("visitTimer");
const savedTrackLabel = document.getElementById("savedTrackLabel");
const trackButtons = document.querySelectorAll(".track-button");
const trackMessage = document.getElementById("trackMessage");
const categoryFilter = document.getElementById("categoryFilter");
const sortProjects = document.getElementById("sortProjects");
const projectList = document.getElementById("projectList");
const projectEmptyState = document.getElementById("projectEmptyState");
const repoStatus = document.getElementById("repoStatus");
const repoList = document.getElementById("repoList");
const reloadReposBtn = document.getElementById("reloadReposBtn");
const githubUsername = document.getElementById("githubUsername");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const revealElements = document.querySelectorAll(".reveal");

const STORAGE_KEYS = {
  theme: "assignment3-theme",
  name: "assignment3-name",
  track: "assignment3-track",
  welcomeVisible: "assignment3-welcome-visible",
};

const GITHUB_USER = "sultan-swe3";

const appState = {
  theme: localStorage.getItem(STORAGE_KEYS.theme) || "light",
  visitorName: localStorage.getItem(STORAGE_KEYS.name) || "",
  track: localStorage.getItem(STORAGE_KEYS.track) || "all",
  welcomeVisible: localStorage.getItem(STORAGE_KEYS.welcomeVisible) !== "hidden",
  category: "all",
  sortBy: "newest",
};

const projects = [
  {
    title: "Assignment 1 Portfolio",
    category: "web",
    track: "beginner",
    date: "2026-02-20",
    description: "A responsive portfolio foundation built with semantic HTML and clean CSS structure.",
    link: "#top",
  },
  {
    title: "Assignment 2 Interactive Portfolio",
    category: "javascript",
    track: "advanced",
    date: "2026-03-15",
    description: "The second portfolio version added local storage, client-side validation, and dynamic page interaction.",
    link: "#projects",
  },
  {
    title: "Landing Page Redesign",
    category: "ui",
    track: "beginner",
    date: "2026-01-30",
    description: "A layout practice project focused on visual hierarchy, spacing, and mobile responsiveness.",
    link: "#projects",
  },
  {
    title: "JavaScript Dashboard Concept",
    category: "javascript",
    track: "advanced",
    date: "2026-04-05",
    description: "A dashboard prototype that organizes information panels and interactive controls for future expansion.",
    link: "#github",
  },
];

function getGreetingByTime() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  appState.theme = isDark ? "dark" : "light";
  localStorage.setItem(STORAGE_KEYS.theme, appState.theme);
  themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeStatus.textContent = isDark ? "Dark" : "Light";
}

function updateGreeting() {
  const greeting = getGreetingByTime();
  const cleanName = appState.visitorName.trim();
  greetingMessage.textContent = cleanName
    ? `${greeting}, ${cleanName}. Your preferences have been restored.`
    : `${greeting}. Save your name to personalize the portfolio.`;
}

function setWelcomeVisibility(isVisible) {
  welcomePanel.hidden = !isVisible;
  appState.welcomeVisible = isVisible;
  localStorage.setItem(STORAGE_KEYS.welcomeVisible, isVisible ? "visible" : "hidden");
  welcomeToggleBtn.textContent = isVisible ? "Hide Welcome" : "Show Welcome";
  welcomeToggleBtn.setAttribute("aria-expanded", String(isVisible));
}

function getTrackMessage(track) {
  if (track === "beginner") {
    return "Beginner mode is active. Simpler layout and foundation projects are now prioritized.";
  }

  if (track === "advanced") {
    return "Advanced mode is active. Projects with stronger JavaScript and interaction logic are highlighted first.";
  }

  return "Viewing all projects. Use the filter and sort controls below to explore the portfolio.";
}

function setTrack(track) {
  appState.track = track;
  localStorage.setItem(STORAGE_KEYS.track, track);
  savedTrackLabel.textContent = track.charAt(0).toUpperCase() + track.slice(1);
  trackMessage.textContent = getTrackMessage(track);

  trackButtons.forEach((button) => {
    const isActive = button.dataset.track === track;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderProjects();
}

function sortProjectData(projectData) {
  const sortedProjects = [...projectData];

  if (appState.sortBy === "title") {
    sortedProjects.sort((first, second) => first.title.localeCompare(second.title));
    return sortedProjects;
  }

  sortedProjects.sort((first, second) => {
    const firstDate = new Date(first.date);
    const secondDate = new Date(second.date);
    return appState.sortBy === "oldest" ? firstDate - secondDate : secondDate - firstDate;
  });

  return sortedProjects;
}

function getFilteredProjects() {
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = appState.category === "all" || project.category === appState.category;
    const matchesTrack = appState.track === "all" || project.track === appState.track;
    return matchesCategory && matchesTrack;
  });

  return sortProjectData(filteredProjects);
}

function renderProjects() {
  const filteredProjects = getFilteredProjects();

  projectList.innerHTML = filteredProjects
    .map((project) => {
      const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const featuredClass = appState.track !== "all" && project.track === appState.track ? "featured" : "";

      return `
        <article class="project-card ${featuredClass}">
          <span class="pill">${project.category}</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-meta">
            <span>Track: ${project.track}</span>
            <span>Date: ${formattedDate}</span>
          </div>
          <p class="project-actions"><a href="${project.link}">View section</a></p>
        </article>
      `;
    })
    .join("");

  projectEmptyState.hidden = filteredProjects.length > 0;
}

function setRepoStatus(message, type = "") {
  repoStatus.textContent = message;
  repoStatus.className = type ? `status-banner is-${type}` : "status-banner";
}

async function loadRepositories() {
  setRepoStatus("Loading repositories...");
  repoList.innerHTML = "";

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`);

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    const visibleRepositories = repositories
      .filter((repo) => !repo.fork)
      .slice(0, 4);

    if (visibleRepositories.length === 0) {
      setRepoStatus("No public repositories were found for this account.", "error");
      return;
    }

    repoList.innerHTML = visibleRepositories
      .map((repo) => {
        const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return `
          <article class="repo-card">
            <span class="pill">${repo.language || "Code"}</span>
            <h3>${repo.name}</h3>
            <p>${repo.description || "Public repository without a description."}</p>
            <div class="repo-meta">
              <span>Updated: ${updatedDate}</span>
              <span>Stars: ${repo.stargazers_count}</span>
            </div>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Open on GitHub</a>
          </article>
        `;
      })
      .join("");

    setRepoStatus("Repositories loaded successfully.", "success");
  } catch (error) {
    setRepoStatus("Unable to load GitHub data right now. Please try again later.", "error");
  }
}

function showFormFeedback(message, type) {
  formFeedback.textContent = message;
  formFeedback.className = `form-feedback is-${type}`;
}

function validateContactForm() {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const reason = document.getElementById("contactReason").value;
  const message = document.getElementById("contactMessage").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !reason || !message) {
    showFormFeedback("Please complete every field before sending the form.", "error");
    return false;
  }

  if (name.length < 3) {
    showFormFeedback("Please enter a name with at least 3 characters.", "error");
    return false;
  }

  if (!emailPattern.test(email)) {
    showFormFeedback("Please enter a valid email address.", "error");
    return false;
  }

  if (message.length < 20) {
    showFormFeedback("Your message must contain at least 20 characters.", "error");
    return false;
  }

  showFormFeedback(`Thank you, ${name}. Your ${reason} message passed validation and is ready to send.`, "success");
  return true;
}

function startVisitTimer() {
  const sessionStart = Date.now();

  setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - sessionStart) / 1000);
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    visitTimer.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function initializeRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

themeBtn.addEventListener("click", () => {
  setTheme(appState.theme === "dark" ? "light" : "dark");
});

welcomeToggleBtn.addEventListener("click", () => {
  setWelcomeVisibility(!appState.welcomeVisible);
});

saveNameBtn.addEventListener("click", () => {
  appState.visitorName = visitorNameInput.value.trim();

  if (appState.visitorName) {
    localStorage.setItem(STORAGE_KEYS.name, appState.visitorName);
  } else {
    localStorage.removeItem(STORAGE_KEYS.name);
  }

  updateGreeting();
});

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTrack(button.dataset.track);
  });
});

categoryFilter.addEventListener("change", (event) => {
  appState.category = event.target.value;
  renderProjects();
});

sortProjects.addEventListener("change", (event) => {
  appState.sortBy = event.target.value;
  renderProjects();
});

reloadReposBtn.addEventListener("click", () => {
  loadRepositories();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validateContactForm()) {
    contactForm.reset();
  }
});

function initializeApp() {
  githubUsername.textContent = GITHUB_USER;
  visitorNameInput.value = appState.visitorName;
  categoryFilter.value = appState.category;
  sortProjects.value = appState.sortBy;
  setTheme(appState.theme);
  setWelcomeVisibility(appState.welcomeVisible);
  updateGreeting();
  setTrack(appState.track);
  renderProjects();
  startVisitTimer();
  initializeRevealAnimations();
  loadRepositories();
}

initializeApp();
