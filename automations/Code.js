const getConfig = () => {
  // global settings
  return {
    defaultChartSheetName: 'Sprint 1 - Team Plots',
    logsSheetName: 'GitHub Logs',
    logsSheetFields: ['repository', 'event', 'id', 'username', 'email', 'date', 'message', 'num_files', 'num_additions', 'num_deletions']
  }
}

const getSheet = () => {
  const config = getConfig()
  const ss = SpreadsheetApp.getActiveSpreadsheet() // container spreadsheet
  let sheet = ss.getSheetByName(config.logsSheetName) // specific worksheet
  if (sheet == null) {
    // create worksheet if none
    sheet = ss.insertSheet(config.logsSheetName)
    sheet.appendRow(config.logsSheetFields) // heading row
  }
  return sheet
}

function doGet(e) {
  // get the sheet name with the charts from the query string
  const config = getConfig()
  // we expect a `sheet` query string in the request  
  const sheetName = (e.parameter["sheet"]) ? decodeURIComponent(e.parameter["sheet"]) : config.defaultChartSheetName 
  Logger.log(`Loading charts from sheet: ${sheetName}`)
  charts = getCharts(sheetName)
  const content = generateHtml(sheetName, charts)
  return HtmlService.createHtmlOutput(content)
}

function doPost(e) {
  console.log("Incoming post request")
  console.log(JSON.stringify(e, null, 2))
  const sheet = getSheet()
  const res = {
    type: 'post',
    e: e
  }
  const commit_data = JSON.parse(e.postData.contents); // should be an array of objects
  if (Array.isArray(commit_data)) {
    for (let i=0; i<commit_data.length; i++) {
      // log this commit!
      const commit = commit_data[i]
      console.log(JSON.stringify(commit, null, 2))
      // append data array to sheet as new row
      const row = [commit['repository_url'], commit['event_type'], commit['id'], commit['author_name'], commit['author_email'], commit['date'], commit['message'], commit['files'], commit['additions'], commit['deletions']]
      sheet.appendRow(row);
    }
    return ContentService.createTextOutput(commit_data).setMimeType(ContentService.MimeType.JSON)
  }
  else {
    return ContentService.createTextOutput(typeof(commit_data)).setMimeType(ContentService.MimeType.TEXT)
  }
}
