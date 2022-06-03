# SlipSave

I am tried of saving each payslip manually every week.

# How to use

## Prerequisites

- A Google Cloud Platform project with the API enabled. To create a project and enable an API, refer to [Create a project and enable the API](https://developers.google.com/workspace/guides/create-project)

- Authorization credentials for a desktop application. To learn how to create credentials for a desktop application, refer to [Create credentials](https://developers.google.com/workspace/guides/create-credentials).

- A Google account with Gmail enabled.

## Step 1: Authorize this app and get a code from google

```bash
yarn code
```

save the token to `.env`

```
CODE=<paste code here>
```

## 2. Generate token.json file

```bash
yarn token
```

## 3. Run the code

```bash
yarn main
```

Generates a folder `/payslips` and saves the pdfs in it.

Example output:

```
...

main: message id: ************* +0ms
main: subject: Payslip for ****** for Week ending 10 Nov 2019 +463ms
main: date: 2019-11-10 +0ms
main: pdfs: 1 +0ms
main: writing file: ./payslips/2019-11-10 PaySlip.pdf +1s
main: saved file: ./payslips/2019-11-10 PaySlip.pdf +1ms
main: Saved 121 files +0ms
```
