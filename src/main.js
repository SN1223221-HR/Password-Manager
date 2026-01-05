function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🔐 パスワード管理')
    .addItem('サイドバーを開く', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const template = HtmlService.createTemplateFromFile('Sidebar');
  const html = template.evaluate()
    .setTitle('PWマネージャー Pro')
    .setWidth(350);
  SpreadsheetApp.getUi().showSidebar(html);
}
