/**
 * CSV文字列を受け取り、スプレッドシートに追記する
 */
function importPasswordsFromCsv(csvText) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    // Utilities.parseCsv を利用してパース
    const csvData = Utilities.parseCsv(csvText);
    
    if (csvData.length <= 1) throw new Error('データが空、または正しくない形式です。');

    // 1行目（ヘッダー）を除外してループ
    const newRows = [];
    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i];
      // GoogleパスワードマネージャーのCSV形式: name, url, username, password, note
      if (row.length < 4) continue;
      
      newRows.push([
        row[0], // name
        row[1], // url
        row[2], // username
        row[3], // password
        row[4] || '' // note
      ]);
    }

    if (newRows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, 5).setValues(newRows);
      return `${newRows.length}件のデータをインポートしました。`;
    }
    return '追加できるデータが見つかりませんでした。';
  } catch (e) {
    return 'エラー: ' + e.toString();
  }
}
