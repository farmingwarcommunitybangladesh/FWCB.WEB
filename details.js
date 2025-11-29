// FWCB Professional Details Script

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Get the Clan Tag from the URL (e.g., details.html?tag=#RY2J98PL)
  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag");
  const container = document.getElementById("clan-details-content");

  if (!tag) {
    window.location.href = "clans.html";
    return;
  }

  try {
    // 2. Fetch the database
    const response = await fetch("clans.json");
    const allClans = await response.json();

    // 3. Find the specific clan
    const clan = allClans.find((c) => c.tag === tag);

    if (!clan) {
      container.innerHTML =
        "<div style='text-align:center; padding:50px; color:white;'><h2>Clan not found</h2><a href='clans.html' style='color:#64ffda'>Go Back</a></div>";
      return;
    }

    // 4. Clean up the Game Description (Remove <c33> color codes)
    const cleanDescription = clan.description ? clan.description.replace(/<[^>]*>/g, "") : "No description available.";

    // 5. Generate Deep Link to Open Game directly
    const clanLink = `https://link.clashofclans.com/en?action=OpenClanProfile&tag=${clan.tag.replace("#", "")}`;

    // 6. Render the details
    container.innerHTML = `
            <div class="clan-details-container">
                <div class="clan-card-detail">
                    <div class="clan-card-header-detail">
                        <div class="clan-logo-detail" style="background-image: url('${clan.badgeUrl}'); background-color: rgba(0,0,0,0.2);"></div>
                        <div class="clan-info-header">
                            <h2 class="clan-name-detail">${clan.name}</h2>
                            <p class="clan-tag">${clan.tag}</p>
                            <div class="clan-level-detail">Level ${clan.level}</div>
                        </div>
                    </div>
                    
                    <div style="padding: 20px 30px; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <p style="color: #cbd5e1; white-space: pre-wrap; font-family: sans-serif;">${cleanDescription}</p>
                    </div>

                    <div class="clan-stats-grid">
                        <div class="stat-item">
                            <img src="images/cwl.webp" alt="CWL" class="stat-icon">
                            <div class="stat-content">
                                <span class="stat-label">CWL League</span>
                                <span class="stat-value">${clan.warLeague}</span>
                            </div>
                        </div>
                        
                        <div class="stat-item">
                            <img src="images/Capital.webp" alt="Clan Capital" class="stat-icon">
                            <div class="stat-content">
                                <span class="stat-label">Clan Capital</span>
                                <span class="stat-value">Hall Lv ${clan.capitalHall}</span>
                            </div>
                        </div>

                         <div class="stat-item">
                            <!-- Using a generic icon or reused asset -->
                            <div style="font-size: 24px;">🏆</div>
                            <div class="stat-content">
                                <span class="stat-label">Clan Points</span>
                                <span class="stat-value">${clan.points}</span>
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
                            Open in Clash of Clans
                        </a>
                        ${
                          clan.discord
                            ? `
                        <a href="${clan.discord}" target="_blank" class="btn-contact-leader" style="background-color: #5865F2; border:none; color:white;">
                            Join Discord
                        </a>`
                            : ""
                        }
                        ${
                          clan.facebook
                            ? `
                        <a href="${clan.facebook}" target="_blank" class="btn-contact-leader" style="background-color: #1877F2; border:none; color:white;">
                            Facebook
                        </a>`
                            : ""
                        }
                    </div>
                </div>
            </div>
        `;
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Error loading clan details.</p>";
  }
});
