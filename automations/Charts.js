function emailSprint1ChartsToMe() {
  emailChartsToMe('Sprint 1 - Team Plots')
}

function emailSprint2ChartsToMe() {
  emailChartsToMe('Sprint 2 - Team Plots')
}

function emailSprint3ChartsToMe() {
  emailChartsToMe('Sprint 3 - Team Plots')
}

function emailSprint4ChartsToMe() {
  emailChartsToMe('Sprint 4 - Team Plots')
}

function emailChartsToMe(sheetName) {
  const charts = getCharts(sheetName)
  const to = Session.getActiveUser().getEmail();
  const replyTo = "no-reply@knowledge.kitchen"
  const subject = "Agile Software Development & DevOps - Team Contribution Charts"
  const message = generateEmail(charts)
  const options = {
    replyTo: replyTo
  }

  // prepare inline image object
  const inlineImages = {}
  charts.forEach( (chart, i) => {
    inlineImages[`chart_${i}`] = chart
  })

  // GmailApp.sendEmail(to, subject, message, options);
 // Send message with inlineImages object, matching embedded tags.
  MailApp.sendEmail(to, subject, "", { 
    htmlBody: message,
    inlineImages: inlineImages
  });

  Logger.log(message)
}

function generateEmail(charts) {
  let imageTags = []
  charts.forEach( (chart, i) => {
    const tag = `<img src='cid:chart_${i}' />`
    imageTags.push(tag)
  })
  imageTags = imageTags.join('<br />') // convert to string with line break separator
  const message = `<h1>Charts</h1>${imageTags}`
  return message
}

function generateHtml(sheetName, charts) {
  // data:image/gif;base64,  
  let imageTags = []
  charts.forEach( (chart, i) => {
    const chartData = Utilities.base64Encode(chart.getBytes()) // get base64 encoded data for this chart
    const tag = `<img src='data:image/png;base64,${chartData}' />`
    imageTags.push(tag)
  })
  imageTags = imageTags.join('<br />') // convert to string with line break separator
  const message = `<h1>${sheetName}</h1>${imageTags}`
  return message
}

function getCharts(sheetName) {
  // get all charts
  // const sheet = SpreadsheetApp.getActiveSheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet() // container spreadsheet
  let sheet = ss.getSheetByName(sheetName) // specific worksheet
  const range = sheet.getRange("A:Z")
  const charts = sheet.getCharts()

  // loop through charts
  const images = []
  charts.forEach( (chart, i) => {
    Logger.log(`chart id: ${chart.getChartId()}`)
    // Logger.log(JSON.stringify(chart.getOptions(), null, 2))
    const image = chart.getAs('image/png')
    image.setName(`chart_${i}`)
    images.push(image) // add to array
  })
  return images
}
