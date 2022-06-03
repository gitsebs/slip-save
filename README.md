# SlipSave

I am tried of saving each payslip manually every week.

# How to use

## Prerequisites

- A Google Cloud Platform project with the API enabled. To create a project and enable an API, refer to [Create a project and enable the API](https://developers.google.com/workspace/guides/create-project)

- Authorization credentials for a desktop application. To learn how to create credentials for a desktop application, refer to [Create credentials](https://developers.google.com/workspace/guides/create-credentials).

- A Google account with Gmail enabled.

## Step 1: Generate token.json

```bash
# Run
yarn generate-tokens
```

If no authorization code is supplied in the `.env` file, the script will generate a url to authorize the application.

```
Authorize this app by visiting this url:
https://accounts.google.com/o/oauth2/auth....
```

After authorizing the application, re-run the script with the authorization code set as an environment variable.

```bash
# Run
CODE=****** yarn generate-tokens
```

## Step 2: Run the code

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
