// Nati G.

// Global storaage
let alertsData = [];

/**
 * Event: Window Load
 * Description: Fetches initial data when the page opens.
 */
window.onload = () => {
    fetchData();
}

let isAscending = true;
/**
 * Function: sortBy
 * Description: Sorts the global alertsData array by a specific field and re-renders the table.
 * Requirement: Client-side sorting[cite: 72].
 * @param {string} field - The key to sort by (e.g., 'risk_score')
 */
const sortBy = (field) => {
    alertsData.sort((a, b) => {
        if (a[field] < b[field]) return isAscending ? -1 : 1;
        if (a[field] > b[field]) return isAscending ? 1 : -1;
        return 0;
    });
    isAscending = !isAscending;
    renderTable(alertsData);
};

/**
 * Function: fetchData
 * Description: Asynchronously gets the list of alerts from the backend API.
 * Requirement: Get list from server[cite: 70].
 */
const fetchData = async () => {
    const alertsEndpoint = "/api/data/alerts";
    try {
        const res = await fetch(alertsEndpoint);
        const alertsResData = await res.json();

        if (res.ok){
            alertsData = alertsResData;
            renderTable(alertsData);
        }
        else {
            console.error(alertsResData.message || "Error occured in alerts fetch")
        }
    } catch (err) {
        console.error(err);
    }
}

/**
 * Function: renderTable
 * Description: Clears and repopulates the HTML table body with data rows.
 * @param {Array} data - The list of alert objects to display
 */
const renderTable = data => {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    data.forEach(entry => {
        const dataRow =`
            <tr>
                <td>${entry.threat_type}</td>
                <td>${entry.source_ip}</td>
                <td>${entry.risk_score}</td>
                <td>${entry.status || 'New'}</td>
                <td>
                    <button class="delete-btn" onclick="deleteItem(${entry.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += dataRow;
    })
}

/**
 * Function: deleteItem
 * Description: Deletes a record from DB and updates the local view.
 * [cite_start]Requirement: Delete update record based on field[cite: 72].
 * @param {number} id - The ID of the alert to delete
 */
const deleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this alert?")) return;

    try {
        const res = await fetch(`/api/data/alerts/${id}`, { method: 'DELETE' });
        
        if (res.ok) {
            alertsData = alertsData.filter(item => item.id !== id);
            renderTable(alertsData);
        } else {
            console.error("Failed to delete");
        }
    } catch (err) {
        console.error("Network error:", err);
    }
};

/**
 * Event Listener: Add Alert Form Submit
 * Description: Handles the submission of the new alert form.
 * Actions: Prevents page reload, collects input values, sends POST request to server, and updates the local table.
 * [cite_start]Requirement: Update data in DB and update FE data structure[cite: 86, 72].
 */
document.getElementById('addAlertForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const threatInput = document.getElementById('threatType');
    const ipInput = document.getElementById('sourceIp');
    const riskInput = document.getElementById('riskScore');

    const newAlert = {
        threat_type: threatInput.value,
        source_ip: ipInput.value,
        risk_score: parseFloat(riskInput.value),
        status: 'New'
    };

    try {
        const res = await fetch('/api/data/alerts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAlert)
        });
        
        const result = await res.json();

        if (res.ok) {
            newAlert.id = result.id;
            alertsData.push(newAlert);
            renderTable(alertsData);
            e.target.reset();
        } else {
            alert("Error adding alert: " + result.message);
        }
    } catch (err) {
        console.error(err);
    }
});