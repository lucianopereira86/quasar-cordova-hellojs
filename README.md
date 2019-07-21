# quasar-cordova-hellojs

Android app developed with Quasar + Cordova + HelloJS that allows social network authentication to be used as login and registration in a offline simulation.

## Technologies:

- Quasar v1
- Cordova
- HelloJS

## To run this project

- Set the google and facebook app ID's inside the "hellojs" object of the package.json:

![Alt Text](/Docs/package.json.PNG)

- Download packages: 
  `npm install`

- Build application:
  `quasar build -m cordova -T android`

- Change to the cordova folder:
  `cd .\src-cordova\`

- Build cordova:
  `cordova build android`

- Run cordova on your device:
  `cordova run android`

- Login screen:

![Alt Text](/Docs/login.PNG)

- Register screen:

![Alt Text](/Docs/register.PNG)

- Home screen:

![Alt Text](/Docs/home.PNG)
	