/**
 * 設定変数
 */
const CONFIG = {
  SHEET_NAME: 'credentials', // シート名
  HEADER_ROWS: 1            // ヘッダー行数
};

/**
 * スプレッドシートが開かれた時に実行：カスタムメニューを追加
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔐 パスワード管理')
    .addItem('サイドバーを開く', 'showSidebar')
    .addToUi();
}

/**
 * サイドバーを表示
 */
function showSidebar() {
  const html = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate()
    .setTitle('パスワード検索')
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * 名称一覧を取得（サイドバーのプルダウン用）
 * @return {Array} 名称の配列
 */
function getCredentialNames() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) return [];
  
  // A列（名称）をすべて取得
  const lastRow = sheet.getLastRow();
  if (lastRow <= CONFIG.HEADER_ROWS) return [];
  
  const names = sheet.getRange(CONFIG.HEADER_ROWS + 1, 1, lastRow - CONFIG.HEADER_ROWS, 1).getValues();
  return names.flat().filter(String); // 空文字を除外して平坦化
}

/**
 * 名称をキーにIDとパスワードを検索
 * @param {string} targetName 検索する名称
 * @return {Object|null} 見つかった場合はID/PASS/MEMO、見つからない場合はnull
 */
function getCredentialByName(targetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // ヘッダーを除いたデータ行を走査（A列を完全一致で検索）
  // 仕様：重複がある場合は「最初に見つかった1件」を返す
  for (let i = CONFIG.HEADER_ROWS; i < data.length; i++) {
    const row = data[i];
    const name = row[0]; // A列：名称
    
    if (name === targetName) {
      return {
        url:  row[1], // B列
        id:   row[2], // C列
        pass: row[3], // D列
        memo: row[4]  // E列
      };
    }
  }
  return null;
}
