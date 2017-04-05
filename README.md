# Installation #
Install required NODE dependecies from pacakge.json
```
cd {applicationPath}/
npm install
```

Some versions of the raspbian may be missing the 'node-sass' binary so will have to be built seperately from source. 
Ensure that g++ is installed.
```
sudo apt-get build-essentials
- - - -
cd {applicationPath}/
npm install node-sass
```

- - - - -

The program can be run in two modes:

## Development ##

This opens up the application inside the 'src' directory using a webpack-dev server
with hot-reload enabled

```
cd {applicationPath}/
node scripts/start.js
```

## Production ##

This builds the application into minified single application inside generated '/build' directory
The compiled application is served from a push-state server after build completes
```
cd {applicationPath}/
node scripts/build.js
```

To run the push-state server application with the most recent build without recompiling
```
cd {applicationPath}/
node scripts/run.js
```

This project was bootstrapped with 

https://github.com/facebookincubator/create-react-app

Find the most recent version of this orignal bootstrap from 

https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
