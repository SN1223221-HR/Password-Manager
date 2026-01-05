/**
 * システム全体の設定
 */
const CONFIG = {
  SHEET_NAME: 'credentials',
  HEADER_ROWS: 1,
  // Google CSVの列見出し（name,url,username,password,note）
  // バージョンによって異なる場合があるため、ここで定義
  IMPORT_MAP: {
    NAME: 0,
    URL: 1,
    ID: 2,
    PASS: 3,
    MEMO: 4
  }
};

/**
 * HTMLファイルを読み込むためのヘルパー関数
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
