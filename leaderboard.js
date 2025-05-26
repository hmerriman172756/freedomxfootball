const API_ENDPOINT = "YOUR_API_GATEWAY_ENDPOINT"; // Replace with your API Gateway URL, e.g., https://<api-id>.execute-api.<region>.amazonaws.com/<stage>/leaderboard

async function fetchLeaderboard(division, tableId) {
    try {
        const response = await fetch(`${API_ENDPOINT}?division=${division}`);
        const data = await response.json();
        
        const tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = ''; // Clear existing rows
        
        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.rank}</td>
                <td>${entry.player}</td>
                <td>${entry.points}</td>
                <td>${entry.wins}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error(`Error fetching leaderboard for ${division}:`, error);
        const tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = '<tr><td colspan="4">Error loading leaderboard data</td></tr>';
    }
}

// Load leaderboards for all divisions
document.addEventListener('DOMContentLoaded', () => {
    fetchLeaderboard('Fan', 'fan-leaderboard');
    fetchLeaderboard('SemiPro', 'semipro-leaderboard');
    fetchLeaderboard('ProPlayer', 'proplayer-leaderboard');
    fetchLeaderboard('WeeklyContest', 'weeklycontest-leaderboard');
});
