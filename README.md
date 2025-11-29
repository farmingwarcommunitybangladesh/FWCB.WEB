# FWCB Community Website

The official website for the Farming War Community Bangladesh (FWCB), a network of 25+ Clash of Clans clans.

## 🚀 Architecture
This project uses a **Static Site Generation (SSG)** approach.
- **Frontend:** HTML5, CSS3, Vanilla JS.
- **Data Source:** Clash of Clans Official API.
- **Automation:** Node.js script fetches live data and generates a static JSON database.

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/farmingwarcommunitybangladesh/FWCB.WEB.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure API**
   - Ensure `config.json` contains the list of clan tags to track.
   - Note: The API Token in `update-clans.js` is IP-locked. If running from a new location, generate a new key at [developer.clashofclans.com](https://developer.clashofclans.com).

## ⚡ How to Update Clan Data
To update Clan Levels, Badges, and Stats:

1. Open a terminal in the project folder.
2. Run the update script:
   ```bash
   node update-clans.js
   ```
3. This generates a new `clans.json`.
4. Commit and push the changes to GitHub.

## 📂 Project Structure
- `index.html` - Landing page.
- `clans.json` - **The Database** (Do not edit manually).
- `config.json` - Static data (Social links & Tags).
- `update-clans.js` - The Automation Engine.
- `script.js` - Main frontend logic.

---
**Maintained by:** FWCB Tech Team