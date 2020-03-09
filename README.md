# Grocery-App
An app for tracking your pantry and storing all your delicious recipes!

Requires MongoDB (Not going to rewrite the docs, go [here](https://docs.mongodb.com/manual/introduction/) to read how to do it you lazy bum.)

## Setup
```
npm install
```

You'll also need to setup set an environment variable to point to your DB host
```
DB_HOST = <url>
```

## Development
For development, first you'll need to start the node server which delivers the crud api:
```
npm start
```
This will run on port 3000. Technically you can fire up postman and just start fiddle fucking with the api part at this point. Or if you're not part of the herd and feel like using something dope and free you can use insomnia. 

In another console dialog within the same directory, start the vue-cli server for the front end:
```
npm run serve
```

This will run on 8080. NOTE, this is setup to proxy any `/api` path with `localhost:3000`, therefore you can access the api on port 8080.

IE: `localhost:8080/api/v1/recipe`

### For production
First, run a production build of the front-end:
```
npm run build
```

Then start the api server:
```
npm start
```

the api server serves it's own front-end, but unlike the development setup, it serves the production build of the front-end at `localhost:3000`.

Obvs, this can be forked, and served up with a digital ocean droplet and nginx or whatever you want to do. You do you.

### Customize frontend configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
