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
    uiContainer.style.width = '350px'; // Slightly wider to accommodate game names
    uiContainer.style.zIndex = '9999';
    uiContainer.style.color = '#ffffff';
    uiContainer.style.fontFamily = 'Arial, sans-serif';
    uiContainer.style.maxHeight = '90vh';
    uiContainer.style.overflowY = 'auto';
    
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
    
    // Removed games section (collapsible)
    const removedGamesHeader = document.createElement('div');
    removedGamesHeader.textContent = 'Removed Games ▼';
    removedGamesHeader.style.marginTop = '15px';
    removedGamesHeader.style.padding = '5px';
    removedGamesHeader.style.backgroundColor = '#2a475e';
    removedGamesHeader.style.borderRadius = '3px';
    removedGamesHeader.style.cursor = 'pointer';
    removedGamesHeader.style.userSelect = 'none';
    
    const removedGamesList = document.createElement('div');
    removedGamesList.id = 'removed-games-list';
    removedGamesList.style.maxHeight = '200px';
    removedGamesList.style.overflowY = 'auto';
    removedGamesList.style.marginTop = '5px';
    removedGamesList.style.padding = '5px';
    removedGamesList.style.backgroundColor = '#16202d';
    removedGamesList.style.borderRadius = '3px';
    removedGamesList.style.display = 'none'; // Initially hidden
    
    // Add "no games removed yet" message
    const noGamesMessage = document.createElement('div');
    noGamesMessage.textContent = 'No games removed yet.';
    noGamesMessage.style.color = '#acdbf5';
    noGamesMessage.style.fontStyle = 'italic';
    noGamesMessage.style.padding = '5px';
    removedGamesList.appendChild(noGamesMessage);
    
    // Toggle visibility when header is clicked
    removedGamesHeader.addEventListener('click', () => {
        if (removedGamesList.style.display === 'none') {
            removedGamesList.style.display = 'block';
            removedGamesHeader.textContent = 'Removed Games ▲';
        } else {
            removedGamesList.style.display = 'none';
            removedGamesHeader.textContent = 'Removed Games ▼';
        }
    });
    
    uiContainer.appendChild(removedGamesHeader);
    uiContainer.appendChild(removedGamesList);
    
    // Add UI to the page
    document.body.appendChild(uiContainer);
    
    // Setup event listeners
    const selectedDates = [];
    const removedGames = []; // Track removed games
    
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
        
        findComplimentaryLicenses(selectedDates).then(result => {
            if (result && result.appIds.length > 0) {
                removeButton.disabled = false;
                removeButton.style.backgroundColor = '#66c0f4';
                removeButton.style.cursor = 'pointer';
                updateStatus(`Found ${result.appIds.length} complimentary licenses to remove.`);
                
                // Store game names along with app IDs
                window.appIdsToRemove = {
                    appIds: result.appIds,
                    gameNames: result.gameNames
                };
            } else {
                updateStatus('No complimentary licenses found for the selected dates.');
            }
        });
    });
    
    removeButton.addEventListener('click', () => {
        if (window.appIdsToRemove && window.appIdsToRemove.appIds.length > 0) {
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
    
    function addRemovedGame(appId, gameName) {
        removedGames.push({ appId, gameName });
        updateRemovedGamesList();
    }
    
    function updateRemovedGamesList() {
        const removedGamesList = document.getElementById('removed-games-list');
        
        // Clear the list
        removedGamesList.innerHTML = '';
        
        if (removedGames.length === 0) {
            const noGamesMessage = document.createElement('div');
            noGamesMessage.textContent = 'No games removed yet.';
            noGamesMessage.style.color = '#acdbf5';
            noGamesMessage.style.fontStyle = 'italic';
            noGamesMessage.style.padding = '5px';
            removedGamesList.appendChild(noGamesMessage);
            return;
        }
        
        // Show removed games in reverse chronological order (newest first)
        [...removedGames].reverse().forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.style.padding = '5px';
            gameItem.style.borderBottom = '1px solid #1b2838';
            
            const gameLink = document.createElement('a');
            gameLink.href = `https://store.steampowered.com/app/${game.appId}`;
            gameLink.target = '_blank';
            gameLink.textContent = game.gameName || `App ID: ${game.appId}`;
            gameLink.style.color = '#66c0f4';
            gameLink.style.textDecoration = 'none';
            
            gameItem.appendChild(gameLink);
            removedGamesList.appendChild(gameItem);
        });
        
        // Show the section if it was hidden
        if (removedGamesList.style.display === 'none') {
            removedGamesList.style.display = 'block';
            removedGamesHeader.textContent = 'Removed Games ▲';
        }
    }
    
    // Initialize the dates list
    updateSelectedDatesList();
    
    return { updateStatus, addRemovedGame };
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
    const gameNames = [];
    const table = document.querySelector(".account_table");
    
    if (table) {
        const rows = table.rows;
        for (let row of rows) {
            const dateCell = row.querySelector(".license_date_col");
            const acquisitionCell = row.querySelector(".license_acquisition_col");
            const nameCell = row.querySelector(".license_name_col");
            
            if (acquisitionCell && /Complimentary/i.test(acquisitionCell.textContent)) {
                const dateText = dateCell.textContent.trim();
                
                if (isTargetDate(dateText, targetDates)) {
                    const match = /javascript:\s*RemoveFreeLicense\s*\(\s*(\d+)/.exec(row.innerHTML);
                    if (match) {
                        const appId = match[1];
                        appIds.push(appId);
                        
                        // Extract game name if available
                        const gameName = nameCell ? nameCell.textContent.trim() : `App ID: ${appId}`;
                        gameNames.push(gameName);
                        
                        console.log(`Found license to remove: ${gameName} (ID ${appId}) - Date: ${dateText}`);
                    }
                }
            }
        }
    }
    
    console.log(`Found ${appIds.length} complimentary licenses to remove.`);
    return { appIds, gameNames };
}

// Function to remove licenses
async function removeComplimentaryLicenses(licenses) {
    const ui = window.licenseRemoverUI || createDateSelectionUI();
    const { appIds, gameNames } = licenses;
    
    if (appIds.length === 0) {
        ui.updateStatus('No licenses to remove.');
        return;
    }
    
    ui.updateStatus(`Starting removal of ${appIds.length} licenses...`);
    await removeNextPackage(appIds, gameNames, 0);
}

// Recursive function to remove licenses one by one
async function removeNextPackage(appIds, gameNames, i) {
    const ui = window.licenseRemoverUI || createDateSelectionUI();
    
    if (i >= appIds.length) {
        ui.updateStatus(`Completed! Removed all ${appIds.length} licenses.`);
        console.log("Removed all AppIds from account.");
        return;
    }
    
    ui.updateStatus(`Removing license ${i+1} of ${appIds.length} (${gameNames[i]})...`);
    
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
            setTimeout(() => removeNextPackage(appIds, gameNames, i), 600000);
        } else {
            console.log(`Removed: ${gameNames[i]} (ID: ${appIds[i]}) (${i + 1}/${appIds.length})`);
            
            // Add to removed games list
            ui.addRemovedGame(appIds[i], gameNames[i]);
            
            // Add a short delay between requests to avoid triggering rate limits
            setTimeout(() => removeNextPackage(appIds, gameNames, i + 1), 2000);
        }
    } catch (error) {
        console.error(`Network or parsing error: ${error}`);
        ui.updateStatus(`Error: ${error.message}. Retrying in 1 minute... (${i+1}/${appIds.length})`);
        setTimeout(() => removeNextPackage(appIds, gameNames, i), 60000);
    }
}

// Initialize the UI
window.licenseRemoverUI = createDateSelectionUI();
console.log("Steam License Remover initialized. Use the UI to select dates and remove licenses.");