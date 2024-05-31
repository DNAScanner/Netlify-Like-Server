# Netlify-like Webserver

Implements some functionalities, Netlify has.

## Features

- [x] Define custom port (`deno run -A main.ts 7000` -> `http://localhost:7000`)
- [x] Serve static files
- [x] Default redirects to an html file (`/test` -> `/test.html`)
- [ ] Custom redirects (`_redirects` file)
- [ ] Custom headers (`_headers` file)

## Use directly from GitHub

```
deno run -A https://github.com/DNAScanner/Netlify-Like-Server/raw/main/main.ts
```

## PowerShell Implementation (Microsoft.PowerShell_profile.ps1)

```powershell
function serve {
      & "deno" run -A "E:\netlify-like-webserver\main.ts" $args
}
```

## Bash Implementation (.bashrc)

```bash
function serve {
      deno run -A "E:\netlify-like-webserver\main.ts" $@
}
```
