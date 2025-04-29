// Steam License Remover with Multi-Date Selection
// This script helps remove complimentary licenses from your Steam account

// Create UI for date selection
function createDateSelectionUI() {
    // Remove existing UI if it exists
    const existingUI = document.getElementById('license-remover-ui');
    if (existingUI) existingUI.remove();
    
    // Create UI container
    const uiContainer = document.createElement('div');
    uiContainer.id = 'license-remover-ui';
    uiContainer.style.position = 'fixed';
    uiContainer.style.top = '10px';
    uiContainer.style.right = '10px';
    uiContainer.style.backgroundColor = '#1b2838';
    uiContainer.style.border = '1px solid #66c0f4';
    uiContainer.style.borderRadius = '5px';
    uiContainer.style.padding = '15px';
    uiContainer.style.width = '300px';
    uiContainer.style.zIndex = '9999';
    uiContainer.style.color = '#ffffff';
    uiContainer.style.fontFamily = 'Arial, sans-serif';
    
    // Create header
    const header = document.createElement('h3');
    header.textContent = 'Steam License Remover';
    header.style.margin = '0 0 10px 0';
    header.style.color = '#66c0f4';
    uiContainer.appendChild(header);
    
    // Create description
    const description = document.createElement('p');
    description.textContent = 'Select dates to remove complimentary licenses:';
    description.style.fontSize = '12px';
    description.style.margin = '0 0 10px 0';
    uiContainer.appendChild(description);
    
    // Create date entry section
    const dateEntryContainer = document.createElement('div');
    dateEntryContainer.style.marginBottom = '10px';
    
    // Create month input
    const monthInput = document.createElement('select');
    monthInput.id = 'month-select';
    monthInput.style.width = '90px';
    monthInput.style.marginRight = '5px';
    monthInput.style.padding = '5px';
    monthInput.style.backgroundColor = '#2a475e';
    monthInput.style.color = '#ffffff';
    monthInput.style.border = '1px solid #66c0f4';
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthInput.appendChild(option);
    });
    
    // Create year input
    const yearInput = document.createElement('select');
    yearInput.id = 'year-select';
    yearInput.style.width = '90px';
    yearInput.style.padding = '5px';
    yearInput.style.backgroundColor = '#2a475e';
    yearInput.style.color = '#ffffff';
    yearInput.style.border = '1px solid #66c0f4';
    
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2003; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearInput.appendChild(option);
    }
    
    // Add button
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Date';
    addButton.style.marginLeft = '5px';
    addButton.style.padding = '5px 10px';
    addButton.style.backgroundColor = '#66c0f4';
    addButton.style.color = '#1b2838';
    addButton.style.border = 'none';
    addButton.style.borderRadius = '3px';
    addButton.style.cursor = 'pointer';
    
    dateEntryContainer.appendChild(monthInput);
    dateEntryContainer.appendChild(yearInput);
    dateEntryContainer.appendChild(addButton);
    uiContainer.appendChild(dateEntryContainer);
    
    // Create selected dates list
    const selectedDatesList = document.createElement('div');
    selectedDatesList.id = 'selected-dates';
    selectedDatesList.style.maxHeight = '150px';
    selectedDatesList.style.overflowY = 'auto';
    selectedDatesList.style.marginBottom = '10px';
    selectedDatesList.style.padding = '5px';
    selectedDatesList.style.backgroundColor = '#2a475e';
    selectedDatesList.style.borderRadius = '3px';
    uiContainer.appendChild(selectedDatesList);
    
    // Create action buttons
    const actionContainer = document.createElement('div');
    actionContainer.style.display = 'flex';
    actionContainer.style.justifyContent = 'space-between';
    
    // Find licenses button
    const findButton = document.createElement('button');
    findButton.textContent = 'Find Licenses';
    findButton.style.padding = '8px 12px';
    findButton.style.backgroundColor = '#66c0f4';
    findButton.style.color = '#1b2838';
    findButton.style.border = 'none';
    findButton.style.borderRadius = '3px';
    findButton.style.cursor = 'pointer';
    
    // Remove licenses button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Licenses';
    removeButton.disabled = true;
    removeButton.style.padding = '8px 12px';
    removeButton.style.backgroundColor = '#777777';
    removeButton.style.color = '#1b2838';
    removeButton.style.border = 'none';
    removeButton.style.borderRadius = '3px';
    removeButton.style.cursor = 'not-allowed';
    
    actionContainer.appendChild(findButton);
    actionContainer.appendChild(removeButton);
    uiContainer.appendChild(actionContainer);
    
    // Status section
    const statusContainer = document.createElement('div');
    statusContainer.style.marginTop = '10px';
    
    const statusText = document.createElement('div');
    statusText.id = 'status-text';
    statusText.style.fontSize = '12px';
    statusText.style.color = '#acdbf5';
    statusText.textContent = 'Ready to find complimentary licenses.';
    
    statusContainer.appendChild(statusText);
    uiContainer.appendChild(statusContainer);
    
    // Add UI to the page
    document.body.appendChild(uiContainer);
    
    // Setup event listeners
    const selectedDates = [];
    
    addButton.addEventListener('click', () => {
        const month = monthInput.value;
        const year = yearInput.value;
        const dateString = `${month} ${year}`;
        
        if (!selectedDates.includes(dateString)) {
            selectedDates.push(dateString);
            updateSelectedDatesList();
        }
    });
    
    findButton.addEventListener('click', () => {
        if (selectedDates.length === 0) {
            updateStatus('Please add at least one date first.');
            return;
        }
        
        findComplimentaryLicenses(selectedDates).then(appIds => {
            if (appIds.length > 0) {
                removeButton.disabled = false;
                removeButton.style.backgroundColor = '#66c0f4';
                removeButton.style.cursor = 'pointer';
                updateStatus(`Found ${appIds.length} complimentary licenses to remove.`);
            } else {
                updateStatus('No complimentary licenses found for the selected dates.');
            }
        });
    });
    
    removeButton.addEventListener('click', () => {
        if (window.appIdsToRemove && window.appIdsToRemove.length > 0) {
            removeButton.disabled = true;
            removeButton.style.backgroundColor = '#777777';
            removeButton.style.cursor = 'not-allowed';
            removeComplimentaryLicenses(window.appIdsToRemove);
        }
    });
    
    function updateSelectedDatesList() {
        selectedDatesList.innerHTML = '';
        
        if (selectedDates.length === 0) {
            const noDateText = document.createElement('div');
            noDateText.textContent = 'No dates selected';
            noDateText.style.color = '#acdbf5';
            noDateText.style.fontStyle = 'italic';
            noDateText.style.padding = '5px';
            selectedDatesList.appendChild(noDateText);
            return;
        }
        
        selectedDates.forEach((dateString, index) => {
            const dateItem = document.createElement('div');
            dateItem.style.display = 'flex';
            dateItem.style.justifyContent = 'space-between';
            dateItem.style.alignItems = 'center';
            dateItem.style.padding = '5px';
            dateItem.style.borderBottom = index < selectedDates.length - 1 ? '1px solid #1b2838' : 'none';
            
            const dateText = document.createElement('span');
            dateText.textContent = dateString;
            
            const removeDate = document.createElement('span');
            removeDate.textContent = '×';
            removeDate.style.cursor = 'pointer';
            removeDate.style.fontWeight = 'bold';
            removeDate.style.color = '#ff7b7b';
            removeDate.style.padding = '0 5px';
            
            removeDate.addEventListener('click', () => {
                selectedDates.splice(index, 1);
                updateSelectedDatesList();
            });
            
            dateItem.appendChild(dateText);
            dateItem.appendChild(removeDate);
            selectedDatesList.appendChild(dateItem);
        });
    }
    
    function updateStatus(message) {
        const statusText = document.getElementById('status-text');
        statusText.textContent = message;
    }
    
    // Initialize the dates list
    updateSelectedDatesList();
    
    return { updateStatus };
}

// Function to check if date matches one of the target month/year combinations
function isTargetDate(dateText, targetDates) {
    return targetDates.some(targetDate => {
        const [targetMonth, targetYear] = targetDate.split(' ');
        
        // Match both "15 Jun, 2022" and "Jun 15, 2022" formats
        const dayFirstPattern = new RegExp(`\\d{1,2}\\s+${targetMonth},\\s+${targetYear}`);
        const monthFirstPattern = new RegExp(`${targetMonth}\\s+\\d{1,2},\\s+${targetYear}`);
        
        return dayFirstPattern.test(dateText) || monthFirstPattern.test(dateText);
    });
}

// Function to find complimentary licenses for the selected dates
async function findComplimentaryLicenses(targetDates) {
    const ui = window.licenseRemoverUI || createDateSelectionUI();
    ui.updateStatus('Searching for complimentary licenses...');
    
    const appIds = [];
    const table = document.querySelector(".account_table");
    
    if (table) {
        const rows = table.rows;
        for (let row of rows) {
            const dateCell = row.querySelector(".license_date_col");
            const acquisitionCell = row.querySelector(".license_acquisition_col");
            
            if (acquisitionCell && /Complimentary/i.test(acquisitionCell.textContent)) {
                const dateText = dateCell.textContent.trim();
                
                if (isTargetDate(dateText, targetDates)) {
                    const match = /javascript:\s*RemoveFreeLicense\s*\(\s*(\d+)/.exec(row.innerHTML);
                    if (match) {
                        appIds.push(match[1]);
                        console.log(`Found license to remove: ID ${match[1]} - Date: ${dateText}`);
                    }
                }
            }
        }
    }
    
    window.appIdsToRemove = appIds;
    console.log(`Found ${appIds.length} complimentary licenses to remove.`);
    return appIds;
}

// Function to remove licenses
async function removeComplimentaryLicenses(appIds) {
    const ui = window.licenseRemoverUI || createDateSelectionUI();
    
    if (appIds.length === 0) {
        ui.updateStatus('No licenses to remove.');
        return;
    }
    
    ui.updateStatus(`Starting removal of ${appIds.length} licenses...`);
    await removeNextPackage(appIds, 0);
}

// Recursive function to remove licenses one by one
async function removeNextPackage(appIds, i) {
    const ui = window.licenseRemoverUI || createDateSelectionUI();
    
    if (i >= appIds.length) {
        ui.updateStatus(`Completed! Removed all ${appIds.length} licenses.`);
        console.log("Removed all AppIds from account.");
        return;
    }
    
    ui.updateStatus(`Removing license ${i+1} of ${appIds.length}...`);
    
    try {
        const response = await fetch("https://store.steampowered.com/account/removelicense", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
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
        });
        
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.success === 84) {
            // Rate limit exceeded - wait 10 minutes before retrying
            ui.updateStatus(`Rate limit exceeded. Waiting 10 minutes before continuing... (${i+1}/${appIds.length})`);
            setTimeout(() => removeNextPackage(appIds, i), 600000);
        } else {
            console.log(`Removed: ${appIds[i]} (${i + 1}/${appIds.length})`);
            // Add a short delay between requests to avoid triggering rate limits
            setTimeout(() => removeNextPackage(appIds, i + 1), 2000);
        }
    } catch (error) {
        console.error(`Network or parsing error: ${error}`);
        ui.updateStatus(`Error: ${error.message}. Retrying in 1 minute... (${i+1}/${appIds.length})`);
        setTimeout(() => removeNextPackage(appIds, i), 60000);
    }
}

// Initialize the UI
window.licenseRemoverUI = createDateSelectionUI();
console.log("Steam License Remover initialized. Use the UI to select dates and remove licenses.");
