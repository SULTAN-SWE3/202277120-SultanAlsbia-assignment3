const themeBtn = document.getElementById("themeBtn");
const saveNameBtn = document.getElementById("saveNameBtn");
const visitorNameInput = document.getElementById("visitorName");
const greetingMessage = document.getElementById("greetingMessage");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.getElementById("emptyState");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const revealElements = document.querySelectorAll(".reveal");

const THEME_KEY = "portfolio-theme";
const NAME_KEY = "portfolio-visitor-name";

function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function updateGreeting(name = "") {
  const greeting = getTimeGreeting();
  const cleanName = name.trim();

  greetingMessage.textContent = cleanName
    ? `${greeting}, ${cleanName}. Welcome back to my portfolio.`
    : `${greeting}. Welcome to my portfolio.`;
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  themeBtn.textContent = isDark ? "Use Light Theme" : "Use Dark Theme";
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark" ? "dark" : "light");

themeBtn.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(nextTheme);
});

const savedName = localStorage.getItem(NAME_KEY) || "";
visitorNameInput.value = savedName;
updateGreeting(savedName);

saveNameBtn.addEventListener("click", () => {
  const name = visitorNameInput.value.trim();

  if (!name) {
    localStorage.removeItem(NAME_KEY);
    updateGreeting("");
    return;
  }

  localStorage.setItem(NAME_KEY, name);
  updateGreeting(name);
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;

    tabButtons.forEach((tabButton) => {
      const isActive = tabButton === button;
      tabButton.classList.toggle("active", isActive);
      tabButton.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === `panel-${selectedTab}`;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

projectSearch.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const searchText = card.dataset.search;
    const matches = searchText.includes(query);
    card.hidden = !matches;

    if (matches) {
      visibleCount += 1;
    }
  });

  emptyState.hidden = visibleCount !== 0;
});

function showFormFeedback(message, type) {
  formFeedback.textContent = message;
  formFeedback.className = `form-feedback is-${type}`;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const userMessage = document.getElementById("userMessage").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !userMessage) {
    showFormFeedback("Please complete all fields before sending your message.", "error");
    return;
  }

  if (!emailPattern.test(email)) {
    showFormFeedback("Please enter a valid email address.", "error");
    return;
  }

  if (userMessage.length < 10) {
    showFormFeedback("Your message should be at least 10 characters long.", "error");
    return;
  }

  showFormFeedback(`Thank you, ${name}. Your message has been sent successfully.`, "success");
  contactForm.reset();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
