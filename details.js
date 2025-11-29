// FWCB DETAILS SCRIPT
// Renders specific clan data from clans.json

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag");
  const container = document.getElementById("clan-details-content");

  if (!tag) {
    window.location.href = "clans.html";
    return;
  }

  try {
    // Fetch Database
    const response = await fetch("clans.json");
    if (!response.ok) throw new Error("Failed to load database");

    const allClans = await response.json();
    const clan = allClans.find((c) => c.tag === tag);

    if (!clan) {
      container.innerHTML = `
                <div style="text-align:center; padding:50px; color:white;">
                    <h2>Clan Not Found</h2>
                    <p style="color: var(--text-muted);">The requested unit data could not be located.</p>
                    <a href="clans.html" class="btn-neon" style="margin-top:20px;">Return to Grid</a>
                </div>`;
      return;
    }

    // Clean Description
    const cleanDescription = clan.description ? clan.description.replace(/<[^>]*>/g, "") : "No description available.";

    const clanLink = `https://link.clashofclans.com/en?action=OpenClanProfile&tag=${clan.tag.replace("#", "")}`;

    // Render Mission Control Interface
    container.innerHTML = `
            <div class="clan-details-container">
                <div class="clan-card-detail">
                    
                    <div class="clan-card-header-detail">
                        <div class="clan-logo-detail" style="background-image: url('${clan.badgeUrl}'); background-color: rgba(0,0,0,0.2);"></div>
                        <div class="clan-info-header">
                            <h2 class="clan-name-detail">${clan.name}</h2>
                            <p class="clan-tag" style="display:inline-block; font-size: 1.1rem;">${clan.tag}</p>
                            <div class="clan-level-detail">Level ${clan.level}</div>
                        </div>
                    </div>
                    
                    <div style="padding: 30px; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <h4 style="color: var(--accent-cyan); margin-bottom: 10px;">Clan Description</h4>
                        <p style="color: #cbd5e1; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${cleanDescription}</p>
                    </div>

                    <div class="clan-stats-grid">
                        <div class="stat-item">
                            <img src="images/cwl.webp" class="stat-icon" alt="League">
                            <div class="stat-content">
                                <span class="stat-label">War League</span>
                                <span class="stat-value">${clan.warLeague}</span>
                            </div>
                        </div>
                        
                        <div class="stat-item">
                            <img src="images/Capital.webp" class="stat-icon" alt="Capital">
                            <div class="stat-content">
                                <span class="stat-label">Capital Hall</span>
                                <span class="stat-value">Level ${clan.capitalHall}</span>
                            </div>
                        </div>

                         <div class="stat-item">
                            <div style="font-size: 24px;">🏆</div>
                            <div class="stat-content">
                                <span class="stat-label">Clan Points</span>
                                <span class="stat-value">${clan.points.toLocaleString()}</span>
                            </div>
                        </div>

                        <div class="stat-item">
                             <div style="font-size: 24px;">👥</div>
                            <div class="stat-content">
                                <span class="stat-label">Members</span>
                                <span class="stat-value">${clan.members}/50</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="clan-actions">
                        <a href="${clanLink}" target="_blank" class="btn-visit-clan">
                            <i class="ri-gamepad-line"></i> Open in Game
                        </a>
                        ${
                          clan.discord
                            ? `
                        <a href="${clan.discord}" target="_blank" class="btn-contact-leader" style="background-color: #5865F2; border:none; color:white;">
                            <i class="ri-discord-fill"></i> Discord
                        </a>`
                            : ""
                        }
                        ${
                          clan.facebook
                            ? `
                        <a href="${clan.facebook}" target="_blank" class="btn-contact-leader" style="background-color: #1877F2; border:none; color:white;">
                            <i class="ri-facebook-circle-fill"></i> Facebook
                        </a>`
                            : ""
                        }
                    </div>
                </div>
            </div>
        `;

    // Mobile Menu Reuse (if viewing details directly)
    const mobileMenuToggle = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector(".nav-links");
    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
    }
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p style='text-align:center; padding:50px; color:red;'>Error loading clan details. Please refresh.</p>";
  }
});
