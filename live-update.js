// আপনার API Key টি নিচের ফাঁকা জায়গায় ("") বসান
const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBhYmYwZTE0LTdkZjEtNGM2Mi1hY2M1LWRhOGI4NThlYjI3NCIsImlhdCI6MTc3NzYxMjU5OSwic3ViIjoiZGV2ZWxvcGVyL2Q4OTI1OGFlLTNhODctOTkyYS04NDE3LWYyMmEzZTBlZDNiZCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEwMy4xNzAuMTczLjM0Il0sInR5cGUiOiJjbGllbnQifV19.ZIe-Yc71Nh2ZuVOvqDNAnOjtv_vH3EbfVNEe2LWGKEiFjjhA8wigDxnIEF4I0bl-NcBnDDaZ7ig6PNptAbvTww";

// আপনার ক্ল্যান ট্যাগগুলোর লিস্ট
const CLAN_TAGS = [
    "%23RY2J98PL", "%2320G0Q0J20", "%232G0JRQVOC", "%2329PCY892U", 
    "%232GJJ9YLQL", "%232YP80VGLU", "%23Y2G2C2RL", "%232GYRPL999", 
    "%232Q0LVQUYL", "%2320CV0Y92U", "%232GLOYLCCC", "%232RU229RCQ", 
    "%23PUVRUOGG", "%232Q8RPY2UY", "%23280P00J8P", "%238J8P88CP", 
    "%232YU2PCUR2", "%232QJ2QLCOR", "%23QG0GG0QP", "%239JVV8RC8", 
    "%23J9RCY8UG", "%23RCCGRPY8", "%23229L2GJ0RU", "%23Q2UJ8LPP", 
    "%232LCLQPJYR", "%2320QJQ0JCR", "%232JRRPRU89", "%23G90LJCGY"
];

// ডেটা নিয়ে আসার ফাংশন
async function fetchClanData() {
    const clansContainer = document.getElementById('clans-container'); // আপনার HTML এর কন্টেইনার ID
    if (!clansContainer) return;
    
    clansContainer.innerHTML = '<p>Loading live clan data...</p>';
    
    try {
        let clansData = [];
        
        for (let tag of CLAN_TAGS) {
            // Proxy URL ব্যবহার করা হয়েছে CORS error এড়াতে
            const url = `https://corsproxy.io/?https://api.clashofclans.com/v1/clans/${tag}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                clansData.push(data);
            }
        }
        
        displayClans(clansData, clansContainer);
        
    } catch (error) {
        console.error("Error fetching clan data:", error);
        clansContainer.innerHTML = '<p>Failed to load live data. Please try again later.</p>';
    }
}

// ওয়েবসাইটে ডেটা দেখানোর ফাংশন
function displayClans(clans, container) {
    container.innerHTML = ''; // ক্লিয়ার লোডিং টেক্সট
    
    clans.forEach(clan => {
        const clanCard = document.createElement('div');
        clanCard.className = 'clan-card'; // আপনার CSS ক্লাসের নাম
        
        clanCard.innerHTML = `
            <img src="${clan.badgeUrls.medium}" alt="${clan.name} Badge" class="clan-badge">
            <h3>${clan.name}</h3>
            <p><strong>Tag:</strong> ${clan.tag}</p>
            <p><strong>Level:</strong> ${clan.clanLevel}</p>
            <p><strong>Members:</strong> ${clan.members}/50</p>
            <p><strong>Location:</strong> ${clan.location ? clan.location.name : 'Unknown'}</p>
        `;
        
        container.appendChild(clanCard);
    });
}

// পেজ লোড হলে ফাংশনটি চালু হবে
document.addEventListener('DOMContentLoaded', fetchClanData);
