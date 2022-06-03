# 🧾 SlipSave

## 🤔 Why?

I am tried of saving payslips (from email attachments) manually every week. So I built a script to automate it.

## 🏁 Getting Started

### Prerequisites

A Google Cloud Platform project with the API enabled. To create a project and enable an API, refer to [Create a project and enable the API](https://developers.google.com/workspace/guides/create-project)

Ensure the Gmail API is enabled for your project. To enable the Gmail API, refer to [Enable the Gmail API](https://developers.google.com/gmail/api/quickstart/js)

Authorization credentials for a desktop application. To learn how to create credentials for a desktop application, refer to [Create credentials](https://developers.google.com/workspace/guides/create-credentials).

A Google account with Gmail enabled.

## 🚀 Usage

### Step 1: Generate tokens.json

```bash
# Run
yarn generate-tokens
```

If no authorization code is supplied in the `.env` file, the script will generate a url to authorize the application.

```
Authorize this app by visiting this url:
https://accounts.google.com/o/oauth2/auth....
```

The script will start up a local server to listen for callback from the Google authorization server. It will automatically generate a `tokens.json` file.

### Step 2: Run the code

```bash
# Run
yarn main
```

Generates a folder called `/payslips` and writes the pdf attachments into it.

```bash
# Example output:
...

main: message id: ************* +0ms
main: subject: Payslip for ****** for Week ending 10 Nov 2019 +463ms
main: date: 2019-11-10 +0ms
main: pdfs: 1 +0ms
main: writing file: ./payslips/2019-11-10 PaySlip.pdf +1s
main: saved file: ./payslips/2019-11-10 PaySlip.pdf +1ms
main: Saved 121 files +0ms
```

---

## 📜 TODO

- [x] Build initial version
- [ ] Build github actions workflow with cronjob
