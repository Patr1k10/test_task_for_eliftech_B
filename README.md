
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Copy the .env.sample file and fill in .env

## Docker

1. Build Docker Image:
   Build a Docker image of your application using the following command:
```bash
docker buildx build -t your-app-name .
```
2. Run Docker Container:
   Run a Docker container using the built image with the following command:
```bash
docker run -d -p 3000:3000 your-app-name
 ```
Replace your-app-name with the actual name of your Docker image.

3. Access the Application:
   The application will be accessible at http://localhost:3000.
4. Create docker-compose.yml:
   Define services, ports, and dependencies in this file.

4. Start Application Run in the directory with docker-compose.yml.
```bash 
docker-compose up
