// FWCB CORE SCRIPT
// Handles: Global UI, Clans Page Data Fetching, Search & Filter

let globalClansData = []; // Store data for filtering

document.addEventListener("DOMContentLoaded", () => {
  fetchClans();
  setupMobileMenu();
  setupScrollButton();
});

// --- CLANS PAGE LOGIC ---
async function fetchClans() {
  const clanListContainer = document.getElementById("clan-list");
  const commandBarContainer = document.getElementById("command-bar-container");

  // Only run if we are on the Clans page
  if (!clanListContainer) return;

  try {
    // 1. Inject the Command Input (Search Bar)
    if (commandBarContainer) {
      commandBarContainer.innerHTML = `
                <div class="filter-wrapper">
                    <i class="ri-search-line" style="color: var(--text-muted); align-self: center;"></i>
                    <input type="text" id="clanSearch" placeholder="Search clan name or tag..." onkeyup="filterClans()">
                    <select id="leagueFilter" onchange="filterClans()">
                        <option value="all">All Divisions</option>
                        <option value="Champion">Champion League</option>
                        <option value="Master">Master League</option>
                        <option value="Crystal">Crystal League</option>
                        <option value="Gold">Gold League</option>
                    </select>
                </div>
                <div id="resultCount" style="margin-top: 15px; color: var(--accent-cyan); font-size: 0.85em; text-align: center;"></div>
            `;
    }

    // 2. Show Loading State
    clanListContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--accent-cyan);">
                <div class="spinner"></div>
                <p style="margin-top: 20px;">Establishing secure connection...</p>
            </div>
        `;

    // 3. Fetch Data
    const response = await fetch("clans.json");
    if (!response.ok) throw new Error("Connection failed");

    globalClansData = await response.json();

    // 4. Sort: Level (Highest First)
    globalClansData.sort((a, b) => b.level - a.level);

    // 5. Initial Render
    renderClans(globalClansData);
  } catch (error) {
    console.error(error);
    clanListContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: #ff6b6b;">
                <h3>Connection Error</h3>
                <p>Unable to retrieve clan data. Please try again.</p>
            </div>
        `;
  }
}

function renderClans(data) {
  const container = document.getElementById("clan-list");
  const countLabel = document.getElementById("resultCount");

  if (data.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No units found matching criteria.</div>`;
    if (countLabel) countLabel.innerText = "0 units found";
    return;
  }

  if (countLabel) countLabel.innerText = `${data.length} units active`;
  container.innerHTML = data.map(createClanCard).join("");
}

// Global Filter Function
window.filterClans = function () {
  const searchText = document.getElementById("clanSearch").value.toLowerCase();
  const leagueFilter = document.getElementById("leagueFilter").value;

  const filtered = globalClansData.filter((clan) => {
    const matchesName = clan.name.toLowerCase().includes(searchText) || clan.tag.toLowerCase().includes(searchText);
    let matchesLeague = true;

    if (leagueFilter !== "all") {
      matchesLeague = clan.warLeague.includes(leagueFilter);
    }

    return matchesName && matchesLeague;
  });

  renderClans(filtered);
};

// Generate Holographic Card HTML
function createClanCard(clan) {
  const badge = clan.badgeUrl || "images/logo.png";
  let leagueIcon = "images/cwl.webp";

  return `
        <div class="clan-card" onclick="window.location.href='details.html?tag=${encodeURIComponent(clan.tag)}'">
            <div class="clan-level-badge">${clan.level}</div>

            <div class="clan-card-header">
                <div class="clan-logo" style="background-image: url('${badge}'); background-size: contain; background-repeat: no-repeat; background-color: transparent;"></div>
                <div class="clan-info">
                    <h4 class="clan-name">${clan.name}</h4>
                    <span class="clan-tag">${clan.tag}</span>
                </div>
            </div>

            <div class="clan-stats">
                <div class="stat-row">
                    <img src="${leagueIcon}" alt="League">
                    <span>${clan.warLeague}</span>
                </div>
                <div class="stat-row">
                    <img src="images/Capital.webp" alt="Capital">
                    <span>Hall Lv ${clan.capitalHall}</span>
                </div>
            </div>
        </div>
    `;
}

// --- GLOBAL UI LOGIC ---

function setupMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-links");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
      }
    });
  }
}

function setupScrollButton() {
  const homeButton = document.querySelector(".home-button");
  if (!homeButton) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      homeButton.style.opacity = "1";
      homeButton.style.transform = "translateY(0)";
    } else {
      homeButton.style.opacity = "0";
      homeButton.style.transform = "translateY(20px)";
    }
  });
}
