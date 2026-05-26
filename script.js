// ===== Auth =====
const PASSWORD = "123";
const loginScreen = document.getElementById("login");
const hubScreen = document.getElementById("hub");
const form = document.getElementById("login-form");
const pwInput = document.getElementById("password");
const errorEl = document.getElementById("error");

function showHub() {
  loginScreen.classList.remove("active");
  hubScreen.classList.add("active");
  sessionStorage.setItem("jaxhub_auth", "1");
}
function showLogin() {
  hubScreen.classList.remove("active");
  loginScreen.classList.add("active");
  sessionStorage.removeItem("jaxhub_auth");
  pwInput.value = "";
}

if (sessionStorage.getItem("jaxhub_auth") === "1") showHub();
else loginScreen.classList.add("active");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pwInput.value === PASSWORD) {
    errorEl.textContent = "";
    showHub();
  } else {
    errorEl.textContent = "Wrong password. Try again.";
    pwInput.value = "";
  }
});

document.getElementById("logout").addEventListener("click", showLogin);

// ===== Tabs =====
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ===== Games =====
const games = [
  { icon: "🎯", title: "Krunker", desc: "Fast-paced FPS in the browser.", url: "https://krunker.io/" },
  { icon: "🟡", title: "Pacman", desc: "Classic maze chase.", url: "./Games/Pacman/index.html" },
  { icon: "🧱", title: "Tetris", desc: "Stack blocks and clear lines.", url: "./Games/tetris.html" },
];

const cheats = [
  {
    icon: "📝",
    title: "EdPuzzle Answers",
    desc: "Auto-answer EdPuzzle questions.",
    code: "javascript:(()=>{const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/gh/ading2210/edpuzzle-answers@latest/script.js';document.body.appendChild(script);})();",
  },
  {
    icon: "🎭",
    title: "TabMask",
    desc: "Mask your browser tab title.",
    code: "javascript:(()=>{fetch('https://raw.githubusercontent.com/bananaontop/TabMask/main/Ignore.js').then(r=>r.text()).then(c=>eval(c)).catch(e=>alert('Failed to fetch code.',e));})();",
  },
];

// ===== Render grids =====
const gamesGrid = document.getElementById("games-grid");
const cheatsGrid = document.getElementById("cheats-grid");

games.forEach((g) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<div class="icon">${g.icon}</div><h3>${g.title}</h3><p>${g.desc}</p>`;
  card.addEventListener("click", () => openGame(g));
  gamesGrid.appendChild(card);
});

cheats.forEach((c) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="icon">${c.icon}</div>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
    <button class="copy-btn" data-code="${c.code.replace(/"/g, '&quot;')}">Copy Code</button>
  `;
  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("copy-btn")) {
      navigator.clipboard.writeText(c.code).then(() => {
        const btn = e.target;
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = original; }, 2000);
      });
    } else {
      window.location.href = c.code;
    }
  });
  cheatsGrid.appendChild(card);
});

// ===== Viewer =====
const viewer = document.getElementById("viewer");
const viewerTitle = document.getElementById("viewer-title");
const viewerFrame = document.getElementById("viewer-frame");
const viewerClose = document.getElementById("viewer-close");

function openGame(g) {
  viewerTitle.textContent = g.title;
  // remove any text panel if present
  const existing = viewer.querySelector(".cheat-output");
  if (existing) existing.remove();
  viewerFrame.style.display = "";
  viewerFrame.src = g.url;
  viewer.classList.remove("hidden");
}

function openText(title, text) {
  viewerTitle.textContent = title;
  viewerFrame.src = "";
  viewerFrame.style.display = "none";
  let panel = viewer.querySelector(".cheat-output");
  if (!panel) {
    panel = document.createElement("div");
    panel.className = "cheat-output";
    viewer.appendChild(panel);
  }
  panel.textContent = text;
  viewer.classList.remove("hidden");
}

viewerClose.addEventListener("click", () => {
  viewerFrame.src = "";
  viewer.classList.add("hidden");
});

// ===== Dock =====
document.getElementById("dock-games").addEventListener("click", () => {
  document.querySelectorAll(".dock-item").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  document.getElementById("dock-games").classList.add("active");
  document.getElementById("games").classList.add("active");
});

document.getElementById("dock-cheats").addEventListener("click", () => {
  document.querySelectorAll(".dock-item").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  document.getElementById("dock-cheats").classList.add("active");
  document.getElementById("cheats").classList.add("active");
});
