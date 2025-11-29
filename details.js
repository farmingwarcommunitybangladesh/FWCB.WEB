// Clan data with exact levels from script.js
const clansData = [
    {name:"Black Daku 1",logo:"blackdaku1.jpeg",tag:"#RY2J98PL",cwl_league:"Crystal I",raid_medals:"1200-1600",clan_capital:10,clan_level:26,facebook_link:"https://www.facebook.com/habibcocbd"},
    {name:"WAR HERO™",logo:"warhero.jpg",tag:"#20G0Q0J20",cwl_league:"Master I",raid_medals:"1200-1600",clan_capital:10,clan_level:24,facebook_link:"https://www.facebook.com/whziiihad"},
    {name:"ICØNIC BØYS",logo:"iconicboys.jpeg",tag:"#2G0JRQVOC",cwl_league:"Master III",raid_medals:"1200-1600",clan_capital:10,clan_level:14,facebook_link:"https://www.facebook.com/zubairmuhammadzami.003"},
    {name:"BLACK DAIMOND",logo:"blackdiamond.jpeg",tag:"#29PCY892U",cwl_league:"Master II",raid_medals:"1200-1600",clan_capital:10,clan_level:21,facebook_link:"https://www.facebook.com/habibcocbd"},
    {name:"ROYAL FIGHTER",logo:"royalfighter.jpeg",tag:"#2GJJ9YLQL",cwl_league:"Crystal I",raid_medals:"1200-1600",clan_capital:10,clan_level:20,facebook_link:"https://www.facebook.com/habibcocbd"},
    {name:"silent killer",logo:"silentkiller.jpeg",tag:"#2YP80VGLU",cwl_league:"Master III",raid_medals:"1200-1600",clan_capital:10,clan_level:16,facebook_link:"https://www.facebook.com/habibcocbd"},
    {name:"GANGSTAR 2K15™",logo:"gangstar.jpeg",tag:"#Y2G2C2RL",cwl_league:"Gold I",raid_medals:"1200-1600",clan_capital:10,clan_level:37,facebook_link:"https://www.facebook.com/talapatara.sepa.i.819104"},
    {name:"SARKER EMPIRE",logo:"sarkerempire.jpeg",tag:"#2GYRPL999",cwl_league:"Crystal II",raid_medals:"1200-1600",clan_capital:10,clan_level:25,facebook_link:"https://www.facebook.com/SaifullahCoC"},
    {name:"Abdullah's clan",logo:"abdullahsclan.jpeg",tag:"#2Q0LVQUYL",cwl_league:"Silver I",raid_medals:"1200-1600",clan_capital:10,clan_level:27,facebook_link:"https://www.facebook.com/md.abdullah.298871?mibextid=ZbWKwL"},
    {name:"BANGLADASH CLAN",logo:"bangladeshclan.jpeg",tag:"#20CV0Y92U",cwl_league:"Champion II",raid_medals:"1200-1600",clan_capital:10,clan_level:16,facebook_link:"https://www.facebook.com/share/1Chg6DCMbv/"},
    {name:"Miracle Vibes",logo:"miraclevibes.jpeg",tag:"#2GLOYLCCC",cwl_league:"Master I",raid_medals:"1200-1600",clan_capital:10,clan_level:16,facebook_link:"https://www.facebook.com/shahin.imam.399"},
    {name:"SHOWTIME",logo:"showtime.jpeg",tag:"#2RU229RCQ",cwl_league:"Crystal III",raid_medals:"1200-1600",clan_capital:10,clan_level:10,facebook_link:"https://www.facebook.com/shahin.imam.399"},
    {name:"BD DEATH SAW",logo:"bddeathsaw.jpeg",tag:"#PUVRUOGG",cwl_league:"Champion I",raid_medals:"1200-1600",clan_capital:10,clan_level:18,facebook_link:"https://www.facebook.com/shahriar.arifen.2025"},
    {name:"AVENGERS",logo:"AVENGERS.jpeg",tag:"#2Q8RPY2UY",cwl_league:"Master II",raid_medals:"1200-1600",clan_capital:10,clan_level:29,facebook_link:"https://www.facebook.com/share/1CoDaaARsX/"},
    {name:"BANGLADESH",logo:"bangladesh.jpeg",tag:"#280P00J8P",cwl_league:"Crystal I",raid_medals:"1200-1600",clan_capital:10,clan_level:31,facebook_link:"https://www.facebook.com/share/1Chg6DCMbv/"},
    {name:"Bangladesh",logo:"Bangladesh (2).jpeg",tag:"#8J8P88CP",cwl_league:"Gold III",raid_medals:"1200-1600",clan_capital:10,clan_level:30,facebook_link:"https://www.facebook.com/share/14KvZyWpeuA/"},
    {name:"BD Army 71",logo:"bdarmy71.jpeg",tag:"#2YU2PCUR2",cwl_league:"Master III",raid_medals:"1200-1600",clan_capital:10,clan_level:19,facebook_link:"https://www.facebook.com/share/1B6iGR4D5Z/"},
    {name:"THE AVENGERS",logo:"theavengers.jpeg",tag:"#2QJ2QLCOR",cwl_league:"Champion III",raid_medals:"1200-1600",clan_capital:10,clan_level:20,facebook_link:"https://www.facebook.com/firoz.nur"},
    {name:"BUI Clashers",logo:"buiclasher.jpeg",tag:"#QG0GG0QP",cwl_league:"Crystal II",raid_medals:"1200-1600",clan_capital:10,clan_level:26,facebook_link:"https://www.facebook.com/mhmd.nylwy.hsyn"},
    {name:"Blue Star",logo:"bluestar.jpeg",tag:"#9JVV8RC8",cwl_league:"Gold I",raid_medals:"1200-1600",clan_capital:10,clan_level:16,facebook_link:"https://www.facebook.com/Robiul4483"},
    {name:"CHATKHIL clan",logo:"chatkhilclan.jpeg",tag:"#J9RCY8UG",cwl_league:"Master I",raid_medals:"1200-1600",clan_capital:10,clan_level:21,facebook_link:"https://www.facebook.com/pu1996"},
    {name:"BD FIGHTER",logo:"bdfighter.jpeg",tag:"#RCCGRPY8",cwl_league:"Crystal II",raid_medals:"1200-1600",clan_capital:10,clan_level:18,facebook_link:"https://www.facebook.com/pu1996"},
    {name:"Noakhali Clan",logo:"noakhaliclan.jpeg",tag:"#229L2GJ0RU",cwl_league:"Champion III",raid_medals:"1200-1600",clan_capital:10,clan_level:22,facebook_link:"https://www.facebook.com/pu1996"},
    {name:"CTG SUPER CLAN",logo:"ctgsuperclan.jpeg",tag:"#Q2UJ8LPP",cwl_league:"Master II",raid_medals:"1200-1600",clan_capital:10,clan_level:20,facebook_link:"https://www.facebook.com/muhammad.arfatuddin.11"},
    {name:"The Lion Empire",logo:"thelionempire.jpeg",tag:"#2LCLQPJYR",cwl_league:"Gold I",raid_medals:"1200-1600",clan_capital:10,clan_level:16,facebook_link:"https://www.facebook.com/shahin.imam.399"},
    {name:"Angry Bøy's™",logo:"angryboys.jpeg",tag:"#20QJQ0JCR",cwl_league:"Master II",raid_medals:"1200-1600",clan_capital:10,clan_level:20,facebook_link:"https://www.facebook.com/sajidur2017"},
    {name:"BD CLASHER",logo:"bdclasher.jpg",tag:"#2JRRPRU89",cwl_league:"Champion I",raid_medals:"1200-1600",clan_capital:10,clan_level:23,facebook_link:"https://www.facebook.com/profile.php?id=61551719798176"},
    {name:"THE DARK DIVINE",logo:"thedarkdivine.jpg",tag:"#G90LJCGY",cwl_league:"Crystal I",raid_medals:"1200-1600",clan_capital:10,clan_level:20,facebook_link:"https://www.facebook.com/share/17RvUPAVa2/"}
];

// Get clan tag from URL
const params = new URLSearchParams(window.location.search);
const tag = params.get('tag');
const clan = clansData.find(c => c.tag === tag);
const container = document.getElementById('clan-details-content');

if (!clan) {
    container.innerHTML = "<p>Clan not found.</p>";
} else {
    // Clash of Clans clan search link
    const clanLink = `https://link.clashofclans.com/en?action=OpenClanProfile&tag=${encodeURIComponent(clan.tag.replace('#',''))}`;
    container.innerHTML = `
        <div class="clan-details-container">
            <div class="clan-card-detail">
                <div class="clan-card-header-detail">
                    <div class="clan-logo-detail" style="background-image: url('images/${clan.logo}');"></div>
                    <div class="clan-info-header">
                        <h2 class="clan-name-detail">${clan.name}</h2>
                        <p class="clan-tag">${clan.tag}</p>
                        <div class="clan-level-detail">Level ${clan.clan_level}</div>
                    </div>
                </div>
                
                <div class="clan-stats-grid">
                    <div class="stat-item">
                        <img src="images/cwl.webp" alt="CWL" class="stat-icon">
                        <div class="stat-content">
                            <span class="stat-label">CWL League</span>
                            <span class="stat-value">${clan.cwl_league}</span>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <img src="images/raid.jpg" alt="Raid Medals" class="stat-icon">
                        <div class="stat-content">
                            <span class="stat-label">Raid Medals</span>
                            <span class="stat-value">${clan.raid_medals}</span>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <img src="images/Capital.webp" alt="Clan Capital" class="stat-icon">
                        <div class="stat-content">
                            <span class="stat-label">Clan Capital</span>
                            <span class="stat-value">${clan.clan_capital}</span>
                        </div>
                    </div>
                </div>
                
                <div class="clan-actions">
                    <a href="${clanLink}" target="_blank" class="btn-visit-clan">
                        <i class="fas fa-external-link-alt"></i> Visit Clan
                    </a>
                    <a href="${clan.facebook_link}" target="_blank" class="btn-contact-leader">
                        <i class="fab fa-facebook"></i> Contact Leader
                    </a>
                </div>
            </div>
        </div>
    `;
}