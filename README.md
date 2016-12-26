# React chatbox

## Requirements

Install Webpack, Babel and Nodemon globally:
```
npm install -g webpack babel-cli nodemon
```

Install other dependencies:
```
npm install
cp client/config.js.dist client/config.js
```

Install [RethinkDB](https://www.rethinkdb.com/docs/install/). On MacOS X:
```
brew install rethinkdb
```
Start the database:
```
rethinkdb --http-port 9000
```
Then visit the RethinkDB admin UI at [http://localhost:9000/#tables](http://localhost:9000/#tables) and create a new table in the default database (test) called chat_messages.

## Run

```
rethinkdb --http-port 9000
npm run webpack-dev
npm run start-dev
```
You can now access the chatbox on [http://localhost:3000/](http://localhost:3000/).

## Deploy to production

```
ssh root@146.185.138.123
cd /var/www/react-chatbox
git pull
npm run webpack
pm2 restart all
```
