# Quasar-Cordova-Hellojs

Android app developed with Quasar + Cordova + HelloJS that allows social network authentication to be used as login and registration in a offline simulation.

## Technologies:

- Quasar v1
- Cordova
- HelloJS

## To run this project

- Set the google and facebook app ID's inside the "hellojs" object of the package.json:

![Alt Text](/Imgs/package.json.PNG)

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

![Alt Text](/Imgs/login.PNG)

- Register screen:

![Alt Text](/Imgs/register.PNG)

- Home screen:

![Alt Text](/Imgs/home.PNG)
	