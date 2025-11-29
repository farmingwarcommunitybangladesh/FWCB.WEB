// 20 Clans Data
const clansData = [
    {name:"Black Daku 1",logo:"blackdaku1.jpeg",tag:"#RY2J98PL",cwl_league:"Crystal League I",raid_medals:"1200-1600",clan_capital:10,clan_level:26},
    {name:"WAR HERO™",logo:"warhero.jpg",tag:"#20G0Q0J20",cwl_league:"Master I",raid_medals:"1200-1600",clan_capital:10,clan_level:24},
    {name:"ICØNIC BØYS",logo:"iconicboys.jpeg",tag:"#2G0JRQVOC",cwl_league:"Master III",raid_medals:"1200-1600",clan_capital:10,clan_level:14},
    {name:"BLACK DAIMOND",logo:"blackdiamond.jpeg",tag:"#29PCY892U",cwl_league:"Master II",raid_medals:"1200-1600",clan_capital:10,clan_level:21},
    {name:"ROYAL FIGHTER",logo:"royalfighter.jpeg",tag:"#2GJJ9YLQL",cwl_league:"Crystal I",raid_medals:"1200-1600",clan_capital:10,clan_level:20},
    {name:"silent killer",logo:"silentkiller.jpeg",tag:"#2YP80VGLU",cwl_league:"Master III",raid_medals:"1200-1600",clan_capital:10,clan_level:16},
    {name:"GANGSTAR 2K15™",logo:"gangstar.jpeg",tag:"#Y2G2C2RL",cwl_league:"Gold I",raid_medals:"1200-1600",clan_capital:10,clan_level:37},
    {name:"SARKER EMPIRE",logo:"sarkerempire.jpeg",tag:"#2GYRPL999",cwl_league:"Crystal II",raid_medals:"1200-1600",clan_capital:10,clan_level:25},
    {name:"Abdullah's clan",logo:"abdullahsclan.jpeg",tag:"#2Q0LVQUYL",cwl_league:"Silver I",raid_medals:"1200-1600",clan_capital:10,clan_level:27},
    {name:"BANGLADASH CLAN",logo:"bangladeshclan.jpeg",tag:"#20CV0Y92U",cwl_league:"Champion II",raid_medals:"1200-1600",clan_capital:10,clan_level:16},
    {name:"Miracle Vibes",logo:"miraclevibes.jpeg",tag:"#2GLOYLCCC",cwl_league:"Master I",raid_medals:"1200-1600",clan_capital:10,clan_level:16},
    {name:"SHOWTIME",logo:"showtime.jpeg",tag:"#2RU229RCQ",cwl_league:"Crystal III",raid_medals:"1200-1600",clan_capital:10,clan_level:10},
    {name:"BD DEATH SAW",logo:"bddeathsaw.jpeg",tag:"#PUVRUOGG",cwl_league:"Champion I",raid_medals:"1200-1600",clan_capital:10,clan_level:18},
    {name:"AVENGERS",logo:"AVENGERS.jpeg",tag:"#2Q8RPY2UY",cwl_league:"Master II",raid_medals:"1200-1600",clan_capital:10,clan_level:29},
    {name:"BANGLADESH",logo:"bangladesh.jpeg",tag:"#280P00J8P",cwl_league:"Crystal I",raid_medals:"1200-1600",clan_capital:10,clan_level:31},
    {name:"Bangladesh",logo:"Bangladesh (2).jpeg",tag:"#8J8P88CP",cwl_league:"Gold III",raid_medals:"1200-1600",clan_capital:10,clan_level:30},
    {name:"BD Army 71",logo:"bdarmy71.jpeg",tag:"#2YU2PCUR2",cwl_league:"Master III",raid_medals:"1200-1600",clan_capital:10,clan_level:19},
    {name:"THE AVENGERS",logo:"theavengers.jpeg",tag:"#2QJ2QLCOR",cwl_league:"Champion III",raid_medals:"1200-1600",clan_capital:10,clan_level:20},
    {name:"BUI Clashers",logo:"buiclasher.jpeg",tag:"#QG0GG0QP",cwl_league:"Crystal II",raid_medals:"1200-1600",clan_capital:10,clan_level:26},
    {name:"Blue Star",logo:"bluestar.jpeg",tag:"#9JVV8RC8",cwl_league:"Gold I",raid_medals:"1200-1600",clan_capital:10,clan_level:38},
    {name:"BD FIGHTER",logo:"bdfighter.jpeg",tag:"#RCCGRPY8",cwl_league:"Crystal II",raid_medals:"1200-1600",clan_capital:10,clan_level:33},
    {name:"Noakhali Clan",logo:"noakhaliclan.jpeg",tag:"#229L2GJ0RU",cwl_league:"Champion III",raid_medals:"1200-1600",clan_capital:7,clan_level:10},
    {name:"CTG SUPER CLAN",logo:"ctgsuperclan.jpeg",tag:"#Q2UJ8LPP",cwl_league:"Master II",raid_medals:"1200-1600",clan_capital:8,clan_level:19},
    {name:"The Lion Empire",logo:"thelionempire.jpeg",tag:"#2LCLQPJYR",cwl_league:"Gold I",raid_medals:"1200-1600",clan_capital:10,clan_level:19},
    {name:"Angry Bøy's™",logo:"angryboys.jpeg",tag:"#20QJQ0JCR",cwl_league:"Master II",raid_medals:"1200-1600",clan_capital:7,clan_level:13},
    {name:"BD CLASHER",logo:"bdclasher.jpg",tag:"#2JRRPRU89",cwl_league:"Champion I",raid_medals:"1200-1600",clan_capital:7,clan_level:10},
    {name:"THE DARK DIVINE",logo:"thedarkdivine.jpg",tag:"#G90LJCGY",cwl_league:"Crystal League I",raid_medals:"1200-1600",clan_capital:10,clan_level:20}
];

// Generate Clan Cards
// ...existing code...
function createClanCard(clan) {
    return `
        <div class="clan-card">
            <div class="clan-card-content">
                <div class="clan-card-header">
                    <div class="clan-logo" style="background-image: url('images/${clan.logo}');"></div>
                    <div>
                        <h4 class="clan-name">${clan.name}</h4>
                        <p style="font-size:0.8em; color:#777;">Tag: <strong>${clan.tag}</strong></p>
                    </div>
                </div>
                <div class="clan-stats">
                    <p><img src="images/cwl.webp" width="18" style="vertical-align:middle; margin-right:5px;">
                       <span class="stat-label">CWL League:</span> ${clan.cwl_league}</p>
                    <p><img src="images/raid.jpg" width="18" style="vertical-align:middle; margin-right:5px; border-radius: 3px;">
                       <span class="stat-label">Avg. Raid Medals:</span> ${clan.raid_medals}</p>
                    <p><img src="images/Capital.webp" width="18" style="vertical-align:middle; margin-right:5px;">
                       <span class="stat-label">Clan Capital:</span> ${clan.clan_capital}</p>
                    <button onclick="window.location.href='details.html?tag=${encodeURIComponent(clan.tag)}'"
                        style="background-color:#2ecc71; color:white; border:none; padding:8px; border-radius:4px; margin-top:10px; cursor:pointer;">
                        View Details
                    </button>
                </div>
            </div>
            <div class="clan-level-vertical">
                <div class="clan-level-text-vertical">
                    <span>C</span>
                    <span>L</span>
                    <span>A</span>
                    <span>N</span>
                    <span class="space"></span>
                    <span>L</span>
                    <span>E</span>
                    <span>V</span>
                    <span>E</span>
                    <span>L</span>
                </div>
                <div class="clan-level-number">${clan.clan_level}</div>
            </div>
        </div>
    `;
}
// ...existing code...

const clanListContainer = document.getElementById('clan-list');
clanListContainer.innerHTML = clansData.map(createClanCard).join('');

// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});