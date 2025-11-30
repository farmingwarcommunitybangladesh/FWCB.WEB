document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag");
  const container = document.getElementById("clan-details-content");

  if (!tag) {
    window.location.href = "clans.html";
    return;
  }

  try {
    const response = await fetch("clans.json");
    const allClans = await response.json();
    const clan = allClans.find((c) => c.tag === tag);

    if (!clan) {
      container.innerHTML = "<div style='text-align:center; padding:50px; color:white;'><h2>Clan Not Found</h2></div>";
      return;
    }

    const cleanDescription = clan.description ? clan.description.replace(/<[^>]*>/g, "") : "No description.";
    const clanLink = `https://link.clashofclans.com/en?action=OpenClanProfile&tag=${clan.tag.replace("#", "")}`;

    // Format Labels (The tags like "Clan Wars", "Friendly")
    const labelsHtml =
      clan.labels && clan.labels.length > 0
        ? `<div class="label-container">${clan.labels
            .map((l) => `<span class="clan-label"><img src="${l.iconUrls.small}"> ${l.name}</span>`)
            .join("")}</div>`
        : "";

    // Format Type (e.g., "inviteOnly" -> "Invite Only")
    const formatType = (str) => (str ? str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()) : "Open");

    container.innerHTML = `
            <div class="clan-details-container">
                <div class="clan-card-detail">
                    
                    <!-- Header -->
                    <div class="clan-card-header-detail">
                        <div class="clan-logo-detail" style="background-image: url('${clan.badgeUrl}'); background-color: rgba(0,0,0,0.2);"></div>
                        <div class="clan-info-header">
                            <h2 class="clan-name-detail">${clan.name}</h2>
                            <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                                <span class="clan-tag">${clan.tag}</span>
                                <span class="clan-level-detail">Level ${clan.level}</span>
                                <span class="location-badge"><i class="ri-map-pin-2-fill"></i> ${clan.location}</span>
                            </div>
                            ${labelsHtml}
                        </div>
                    </div>
                    
                    <!-- Description -->
                    <div style="padding: 30px; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <h4 style="color: var(--accent-cyan); margin-bottom: 10px; font-family:'Orbitron'">Briefing</h4>
                        <p style="color: #cbd5e1; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${cleanDescription}</p>
                    </div>

                    <!-- DATA GRID START -->
                    <div class="stats-mega-grid">
                        
                        <!-- Col 1: Performance -->
                        <div class="data-column">
                            <h5 class="col-title"><i class="ri-sword-fill"></i> War Performance</h5>
                            <div class="data-row">
                                <span>War League</span>
                                <strong style="color:#f1c40f">${clan.warLeague}</strong>
                            </div>
                            <div class="data-row">
                                <span>Total Wins</span>
                                <strong>${clan.warWins}</strong>
                            </div>
                            <div class="data-row">
                                <span>Win Streak</span>
                                <strong style="color:var(--accent-cyan)">${clan.warWinStreak} 🔥</strong>
                            </div>
                            <div class="data-row">
                                <span>Frequency</span>
                                <strong style="text-transform:capitalize">${clan.warFrequency}</strong>
                            </div>
                        </div>

                        <!-- Col 2: Requirements -->
                        <div class="data-column">
                            <h5 class="col-title"><i class="ri-door-lock-fill"></i> Requirements</h5>
                            <div class="data-row">
                                <span>Entry Type</span>
                                <strong>${formatType(clan.type)}</strong>
                            </div>
                            <div class="data-row">
                                <span>Req. Trophies</span>
                                <strong>${clan.requiredTrophies}</strong>
                            </div>
                            <div class="data-row">
                                <span>Req. TownHall</span>
                                <strong>Level ${clan.requiredTownhall || 1}</strong>
                            </div>
                            <div class="data-row">
                                <span>Language</span>
                                <strong>${clan.chatLanguage}</strong>
                            </div>
                        </div>

                        <!-- Col 3: Capital & Points -->
                        <div class="data-column">
                            <h5 class="col-title"><i class="ri-building-4-fill"></i> Capital & Stats</h5>
                            <div class="data-row">
                                <span>Capital Hall</span>
                                <strong>Level ${clan.capitalHall}</strong>
                            </div>
                            <div class="data-row">
                                <span>Members</span>
                                <strong>${clan.members} / 50</strong>
                            </div>
                            <div class="data-row">
                                <span>Home Points</span>
                                <strong>${clan.points.toLocaleString()}</strong>
                            </div>
                            <div class="data-row">
                                <span>Versus Points</span>
                                <strong>${clan.versusPoints.toLocaleString()}</strong>
                            </div>
                        </div>

                    </div>
                    <!-- DATA GRID END -->
                    
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
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Error loading details.</p>";
  }
});
