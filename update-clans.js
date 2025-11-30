const axios = require("axios");
const fs = require("fs");

// --- CONFIGURATION ---
const API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU5OTI4NjBhLTY3OGItNGI1Mi1iM2QwLTc5N2UwMTQ3MjY2OSIsImlhdCI6MTc2NDUyNTQ1OSwic3ViIjoiZGV2ZWxvcGVyLzVhMmI5ODM5LTg2YjMtYjU5My1jMmYwLTAxY2I3MDFiNzNlMyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEwMy4xMzguMTkxLjQwIl0sInR5cGUiOiJjbGllbnQifV19.CrBpP2F1Z-B6-84oVm2e_KZ38mrfg-QDafTdLWhZfgoDYAZPAPvM320_Q8pYY6vbeUOp-Ovg8P4LDdpLnQeK0w";
const CONFIG_FILE = "./config.json";
const OUTPUT_FILE = "./clans.json";

async function fetchClanData() {
  console.log("🚀 Starting Deep Data Extraction...");

  try {
    const rawConfig = fs.readFileSync(CONFIG_FILE);
    const clanList = JSON.parse(rawConfig);
    const finalData = [];

    for (const clan of clanList) {
      const formattedTag = clan.tag.replace("#", "%23");
      const url = `https://api.clashofclans.com/v1/clans/${formattedTag}`;

      try {
        process.stdout.write(`   Scanning ${clan.tag}... `);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            Accept: "application/json",
          },
        });

        const api = response.data;

        // EXTRACTING DEEP DATA (With Safety Checks ?.)
        finalData.push({
          // Identity
          tag: clan.tag,
          name: api.name || "Unknown",
          level: api.clanLevel || 1,
          badgeUrl: api.badgeUrls?.medium || "images/logo.png",
          description: api.description || "",

          // Performance
          points: api.clanPoints || 0,
          versusPoints: api.clanVersusPoints || 0,
          warWins: api.warWins || 0,
          warWinStreak: api.warWinStreak || 0,
          warFrequency: api.warFrequency || "unknown",
          warLeague: api.warLeague?.name || "Unranked",

          // Capital (Safety Check: Some clans don't have a capital yet)
          capitalHall: api.clanCapital?.capitalHallLevel || 0,

          // Recruitment
          type: api.type || "unknown",
          requiredTrophies: api.requiredTrophies || 0,
          requiredTownhall: api.requiredTownhallLevel || 1,
          members: api.members || 0,

          // Details
          location: api.location?.name || "International",
          chatLanguage: api.chatLanguage?.name || "English",
          labels: api.labels || [],

          // Socials (Manual)
          discord: clan.discord,
          facebook: clan.facebook,
        });

        console.log("✅ Data Secured");
      } catch (error) {
        console.log("❌ Failed");

        // PRINT THE REASON
        if (error.response) {
          console.log(`      > Status: ${error.response.status} (${error.response.statusText})`);
          if (error.response.status === 403) {
            console.log("      > ⚠️ YOUR IP CHANGED. You need a new API Token.");
          }
        } else {
          console.log(`      > Error: ${error.message}`);
        }

        // Fallback for errors so site doesn't crash
        finalData.push({
          tag: clan.tag,
          name: "Unknown Clan",
          level: 0,
          badgeUrl: "images/logo.png",
          warLeague: "Unranked",
          capitalHall: 0,
          points: 0,
          members: 0,
          discord: clan.discord,
          facebook: clan.facebook,
          labels: [],
        });
      }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
    console.log(`\n✨ Extraction Complete. Database updated at ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("FATAL ERROR:", err);
  }
}

fetchClanData();
