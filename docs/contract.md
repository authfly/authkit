# Form contract

## Form fields

Every widget posts a form. The field names are the contract between the widgets and any backend:

- Sign in: `identifier` (username or address), `password`, `csrf`.
- Magic link request: `identifier` (address), `csrf`.
- Sign up: `name`, `username`, `password`, `terms` (checkbox), `csrf`.
- Forgot password: `email`, `csrf`. Reset: `token` (hidden), `password`, `confirm`, `csrf`. Code: `code`, `csrf`.
- Consent: `decision` (hidden, `approve` or `deny`, one form per button), `csrf`.
- Sign out: `csrf`.

Each widget takes `action` (the form URL) and `csrf` (the token value) as props, so you can point it at your own backend.

## States

Every form widget has an `error` slot (an alert above the fields) and keeps the submitted values you pass back as props. The notice widget has the tones `default`, `success` and `error`.
