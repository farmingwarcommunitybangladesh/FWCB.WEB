const axios = require("axios");
const fs = require("fs");

// --- CONFIGURATION ---
const API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImI4ZDY3MTEwLWViMzQtNDdlNS05MGRmLTFiYmFlYjdlMGM3NCIsImlhdCI6MTc2NDQ0NzgxMywic3ViIjoiZGV2ZWxvcGVyLzVhMmI5ODM5LTg2YjMtYjU5My1jMmYwLTAxY2I3MDFiNzNlMyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEwMy4xMzguMTkxLjQwIl0sInR5cGUiOiJjbGllbnQifV19.ByJEydj0IKYNezZxd9MIrgv93D-DCgcIR9_2glcwc23e5feeZ3y8CoCl0P-JBiBKZTPUKQx9D0yEcvSZSGKBMQ";
const CONFIG_FILE = "./config.json";
const OUTPUT_FILE = "./clans.json";

// --- MAIN FUNCTION ---
async function fetchClanData() {
  console.log("🚀 Starting FWCB Clan Update...");

  try {
    // 1. Read the list of clans we want to track
    const rawConfig = fs.readFileSync(CONFIG_FILE);
    const clanList = JSON.parse(rawConfig);

    const finalData = [];

    // 2. Loop through every clan and ask Supercell for data
    for (const clan of clanList) {
      // URL encode the tag (replace # with %23)
      const formattedTag = clan.tag.replace("#", "%23");
      const url = `https://api.clashofclans.com/v1/clans/${formattedTag}`;

      try {
        process.stdout.write(`   Fetching ${clan.tag}... `);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            Accept: "application/json",
          },
        });

        const apiData = response.data;

        // 3. Merge API data with our Config data
        finalData.push({
          tag: clan.tag,
          name: apiData.name, // Live Name
          level: apiData.clanLevel, // Live Level
          points: apiData.clanPoints, // Live Points
          members: apiData.members, // Live Member Count
          badgeUrl: apiData.badgeUrls.medium, // Live Logo
          warLeague: apiData.warLeague ? apiData.warLeague.name : "Unranked",
          capitalHall: apiData.clanCapital ? apiData.clanCapital.capitalHallLevel : 0,
          description: apiData.description,
          // Keep our manual links
          discord: clan.discord,
          facebook: clan.facebook,
        });

        console.log("✅ Done!");
      } catch (error) {
        console.log("❌ Failed!");
        console.error(`   Error for ${clan.tag}: ${error.message}`);
        // If API fails, keep basic config data so site doesn't break
        finalData.push({
          tag: clan.tag,
          name: "Unknown Clan",
          level: 0,
          badgeUrl: "images/logo.png", // Fallback
          discord: clan.discord,
          facebook: clan.facebook,
        });
      }
    }

    // 4. Save to a new JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
    console.log(`\n✨ Success! Updated ${finalData.length} clans. saved to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("FATAL ERROR:", err);
  }
}

fetchClanData();
