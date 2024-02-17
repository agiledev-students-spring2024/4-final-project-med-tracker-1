# Automation used to track developer contributions

The developer activity in this repository is tracked using a combination of custom tools. Any action on this repository triggers a sequence of automated steps:

1. A GitHub Actions [workflow](../.github/workflows/event-logger.yml) is set up to detect actions on this repository, such as push, pull request, etc.
1. This workflow executes a Python package named [gitcommitlogger](https://pypi.org/project/gitcommitlogger/) that parses the `git` logs and determines what has changed and who made the changes.
1. The Python package then posts this data to a "container-bound" [Google Apps Script](./Code.js) attached to a Google Sheet and set up as a web app to receive such incoming HTTP POST requests. The web app URL where the data is posted is stored in a [GitHub secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) named, `COMMIT_LOG_API` within this repository.
1. The Google Apps Script inserts the data posted by the Python package into a new row in the bound spreadsheet.
1. The Google Sheet contains formulae to add up the number of pull requests opened, pull requests closed, commits, files changed, lines of code added. lines of code removed, etc, by each developer, over a given time period, based on these logs.
1. The sums of these metrics are capped for each developer at reasonable, relatively low levels.
1. Based on all developers' activity, an average score for each of these metrics is computed, and each developer's own score is compared to the average of all developers.
1. A contribution score is calculated for each developer: those who perform average or better on all metrics are given a perfect score; those who perform less than average for any metric have their score scaled down in proportion to how much lower than average they performed.
1. Charts of the developers' contributions over a given time period are [made automatically available](./Charts.js) in the web app via HTTP GET requests.
1. These contribution scores are also automatically pulled into a separate gradebook spreadsheet.
