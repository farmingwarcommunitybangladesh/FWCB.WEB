// FWCB Professional Script V2
// Includes: Live Data, Search, and Filtering

let globalClansData = []; // Store data globally for filtering

document.addEventListener("DOMContentLoaded", () => {
  fetchClans();
  setupMobileMenu();
  setupScrollButton();
});

async function fetchClans() {
  const clanListContainer = document.getElementById("clan-list");
  if (!clanListContainer) return;

  try {
    // Inject Search Bar HTML dynamically
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.innerHTML = `
            <div class="filter-wrapper">
                <input type="text" id="clanSearch" placeholder="Search clan name..." onkeyup="filterClans()">
                <select id="leagueFilter" onchange="filterClans()">
                    <option value="all">All Leagues</option>
                    <option value="Champion">Champion & Above</option>
                    <option value="Master">Master League</option>
                    <option value="Crystal">Crystal League</option>
                    <option value="Gold">Gold League</option>
                </select>
            </div>
            <div id="resultCount" style="margin-top: 10px; color: #8892b0; font-size: 0.9em;"></div>
        `;
    // Insert search bar before the list
    clanListContainer.parentNode.insertBefore(searchContainer, clanListContainer);

    // Show Loading
    clanListContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64ffda;">
                <div class="spinner" style="margin-bottom: 15px; font-size: 2em;">↻</div>
                <p>Syncing live data from Clash of Clans...</p>
            </div>
        `;

    // Fetch Data
    const response = await fetch("clans.json");
    if (!response.ok) throw new Error("Could not load clan data");

    globalClansData = await response.json();

    // Default Sort: Level
    globalClansData.sort((a, b) => b.level - a.level);

    // Initial Render
    renderClans(globalClansData);
  } catch (error) {
    console.error(error);
    clanListContainer.innerHTML = `<p class="error">Error loading data.</p>`;
  }
}

// New Function: Render specific data
function renderClans(data) {
  const container = document.getElementById("clan-list");
  const countLabel = document.getElementById("resultCount");

  if (data.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px;">No clans found matching your search.</div>`;
    if (countLabel) countLabel.innerText = "0 clans found";
    return;
  }

  if (countLabel) countLabel.innerText = `${data.length} clans found`;
  container.innerHTML = data.map(createClanCard).join("");
}

// New Function: Filter Logic
window.filterClans = function () {
  const searchText = document.getElementById("clanSearch").value.toLowerCase();
  const leagueFilter = document.getElementById("leagueFilter").value;

  const filtered = globalClansData.filter((clan) => {
    // Name Search
    const matchesName = clan.name.toLowerCase().includes(searchText) || clan.tag.toLowerCase().includes(searchText);

    // League Filter
    let matchesLeague = true;
    if (leagueFilter !== "all") {
      matchesLeague = clan.warLeague.includes(leagueFilter);
    }

    return matchesName && matchesLeague;
  });

  renderClans(filtered);
};

function createClanCard(clan) {
  const badge = clan.badgeUrl || "images/logo.png";
  // Determine league icon based on text
  let leagueIcon = "images/cwl.webp"; // Default

  return `
        <div class="clan-card" onclick="window.location.href='details.html?tag=${encodeURIComponent(clan.tag)}'" style="cursor: pointer;">
            <div class="clan-card-content">
                <div class="clan-card-header">
                    <div class="clan-logo" style="background-image: url('${badge}'); background-size: contain; background-repeat: no-repeat; background-color: transparent;"></div>
                    <div>
                        <h4 class="clan-name">${clan.name}</h4>
                        <p style="font-size:0.8em; color:#8892b0; font-family: monospace;">${clan.tag}</p>
                    </div>
                </div>
                <div class="clan-stats">
                    <p style="display:flex; align-items:center; gap:8px; color: #ccd6f6;">
                        <img src="${leagueIcon}" width="20"> 
                        <span>${clan.warLeague}</span>
                    </p>
                    <p style="display:flex; align-items:center; gap:8px; color: #ccd6f6;">
                        <img src="images/Capital.webp" width="20"> 
                        <span>Capital Hall ${clan.capitalHall}</span>
                    </p>
                </div>
            </div>
            <div class="clan-level-vertical">
                <div class="clan-level-text-vertical">
                    <span>L</span><span>V</span><span>L</span>
                </div>
                <div class="clan-level-number">${clan.level}</div>
            </div>
        </div>
    `;
}

// Mobile Menu
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

// Scroll Button
function setupScrollButton() {
  const homeButton = document.querySelector(".home-button");
  if (!homeButton) return;
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) homeButton.classList.add("show");
    else homeButton.classList.remove("show");
  });
}
