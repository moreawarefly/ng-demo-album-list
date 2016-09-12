# ng-demo-album-list
Demo app presenting list of albums, written in Angular 1.x based on Gulp build env.

Albums list is mocked inside `albums.json` file, which is an actual [last.fm](http://last.fm) API response to request for top listened 100 albums for my user `$ http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=elomartiniasty&limit=100&api_key=YOUR_API_KEY&format=json`

It is altered with an addition of `released` field to each record which containins mocked album release date.

## Build tasks 

### Livereload serving prebuilded sources for development purpose:
```sh
$ npm start
```
or:
```sh
$ gulp
```
starts sources server:
```sh
127.0.0.1:9000
```
with separate server delivering mocked JSON:
```sh
127.0.0.1:9001
```
with livereload server running on default port `35729`

### Distribution build:
```sh
$ npm run build
```
or: 
```sh
$ gulp build
```
builds, concatenates, minifies and includes all sources in `index.html` file inside `dist` directory

### Distribution preview server:
```sh
$ npm run servebuild
```
or: 
```sh
$ gulp serveBuild
```
builds distribution version and runs http server on `dist` directory:
```sh
127.0.0.1:9000
```
along with server delivering mocked JSON:
```sh
127.0.0.1:9001
```