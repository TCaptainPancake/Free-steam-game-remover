// Configuration
const TARGET_MONTH = 'Jun';
const TARGET_YEAR = '2022';

// Function to check if date matches target month and year
const isTargetDate = (dateText) => {
    // Match both "15 Jun, 2022" and "Jun 15, 2022" formats
    const dayFirstPattern = new RegExp(`\\d{1,2}\\s+${TARGET_MONTH},\\s+${TARGET_YEAR}`);
    const monthFirstPattern = new RegExp(`${TARGET_MONTH}\\s+\\d{1,2},\\s+${TARGET_YEAR}`);
    
    return dayFirstPattern.test(dateText) || monthFirstPattern.test(dateText);
};

var appIds = [];
var table = document.querySelector(".account_table");
if (table) {
    var rows = table.rows;
    for (let row of rows) {
        var dateCell = row.querySelector(".license_date_col");
        var acquisitionCell = row.querySelector(".license_acquisition_col");
        if (acquisitionCell && /Complimentary/i.test(acquisitionCell.textContent)) {
            var dateText = dateCell.textContent.trim();
            console.log("Found date:", dateText); // Debug log
            if (isTargetDate(dateText)) {
                console.log(`Matched ${TARGET_MONTH} ${TARGET_YEAR} date:`, dateText); // Debug log
                var match = /javascript:\s*RemoveFreeLicense\s*\(\s*(\d+)/.exec(row.innerHTML);
                if (match) {
                    appIds.push(match[1]);
                }
            }
        }
    }
}
console.log("Found appIds:", appIds); // Debug log
function removeNextPackage(appIds, i) {
    if (i >= appIds.length) {
        console.log("Removed all AppIds from account.");
        return;
    }
    fetch("https://store.steampowered.com/account/removelicense", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://store.steampowered.com/account/licenses/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `sessionid=${encodeURIComponent(window.g_sessionID)}&packageid=${appIds[i]}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(response => {
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        if (data && data.success === 84) {
            // Retry after 10 minutes (may need to change later)
            console.log(`Rate limit exceeded. Retrying after 10 minutes...`);
            setTimeout(() => removeNextPackage(appIds, i), 600000);
        } else {
            console.log(`Removed: ${appIds[i]} (${i + 1}/${appIds.length})`);
            removeNextPackage(appIds, i + 1);
        }
    }).catch(error => {
        console.error(`Network or parsing error: ${error}`);
        setTimeout(() => removeNextPackage(appIds, i), 60000);
    });
}
removeNextPackage(appIds, 0);
