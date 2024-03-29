## <img alt="vue" src="https://avatars.githubusercontent.com/u/51039205?s=460&u=cb1d242b6a9b13a3b6383e46b5410fafe471b63d&v=4" width="20" height="20" /> Al-Qur'an Digital (BETA)

[![ExoApps](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://exoappsv2.netlify.app/)

### Intro

- Introductions
  - It is a Web App portfolio.
  - Al-Qur'an Digital From Scratch.
- Tech Stack
  - <img src="https://img.icons8.com/fluent/48/000000/visual-studio-code-2019.png" width="14" height="14"/> Vs Code
  - <img alt="vue" src="https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png" width="11" height="11" /> Vue and Vite
  - <img alt="tailwindcss" src="https://api.iconify.design/devicon:tailwindcss.svg" width="14" height="14" /> TailwindCss
  - <img alt="firebase" src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" width="14" height="14" /> Firebase
  - <img alt="pinia" src="https://d33wubrfki0l68.cloudfront.net/ddd72aa8248a5c2f77429b9496e6e3e4da2a4e26/8afc0/logo.svg" width="14" height="14" /> Pinia
- Author
  - Eko Sutrisno
  - [Github](https://github.com/ekosutrisno) Or [Gitlab](https://gitlab.com/ekosutrisno1)
  - Website [Eko Sutrisno](https://ekosutrisno.netlify.app)

### <img alt="vue" src="https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png" width="15" height="15" /> Vue Project Setup

```shell
npm install
```

- ##### Development

```shell
npm run dev
```

- ##### Compiles Production

```shell
npm run build
```

- ##### Preview Production

```shell
npm run serve
```

### CSP

```json
{
  "headers": [
        {
          "source": "/(.*)",
          "headers": [
            {
              "key": "Content-Security-Policy-Report-Only",
              "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://firebase.googleapis.com https://identitytoolkit.googleapis.com https://firestore.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com; connect-src https://firebase.googleapis.com https://identitytoolkit.googleapis.com https://firestore.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://res.cloudinary.com; frame-src 'self' *.google.com; report-uri /csp_report_parser;"
            }
          ]
        }
      ]
}
```
