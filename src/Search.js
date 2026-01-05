function getCredentialNames() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if (lastRow <= CONFIG.HEADER_ROWS) return [];
  return sheet.getRange(CONFIG.HEADER_ROWS + 1, 1, lastRow - CONFIG.HEADER_ROWS, 1).getValues().flat().filter(String);
}

function getCredentialByName(targetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  for (let i = CONFIG.HEADER_ROWS; i < data.length; i++) {
    if (data[i][0] === targetName) {
      return { url: data[i][1], id: data[i][2], pass: data[i][3], memo: data[i][4] };
    }
  }
  return null;
}
