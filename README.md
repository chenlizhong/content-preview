# Advisor Frontend Content Preview App
## Running the app
**Be on the vpn, otherwise nothing will happen**
**If you see security cert issues in the network tab (that breaks app rendering horribly), be sure to add a server exception for `10.72.32.104:8090/`**

1. ```npm install```

2. ```npm start```
    - starts webpack bundler and serves the files with webpack dev server

3. ```https://prod.foo.redhat.com:8080/preview```
    - is where ya can most likely find the app, though proxy configs might have this located elsewhere
