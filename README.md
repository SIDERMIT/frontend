# sidermit-ui

## Project setup
```
npm install
```

Create virtual environement file at root place with name `.env.development` with content:
```
NODE_ENV=development
VUE_APP_BASE_URL=http://endpoint_to_api
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production

Before to create production files we need to add `.env.production` file with content:
```
NODE_ENV=production
VUE_APP_BASE_URL=http://production_endpoint_to_api
```

After that run:
```
npm run build -- --mode production
```
All arguments before -- are considered npm arguments and arguments after -- are passed to vue-cli-service (that's we need).

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### DockerHub

for DockerHub we need build nginx server:

```
# build nginx server
docker build --no-cache -f docker\Dockerfile -t nginx-webapp:latest .

# create tag
docker tag nginx-webapp:latest sidermit/nginx-webapp:latest

# push to aws repository
docker push sidermit/nginx-webapp:latest
```
