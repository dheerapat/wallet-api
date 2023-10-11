# chomchob-wallet-api

### How to run this project on your machine
This is a step by step guide to clone this project on your machine and running in dev environment, you should have Node version >= 18 installed.

```bash
git clone https://github.com/dheerapat/wallet-api.git
cd wallet-api

# create .env file from .env.example provided
cp .env.example .env

# install all dependency
npm install
npm run migrate

# run unit test
npm run test

# running express api
npm run dev
```
Or just use Dockerfile provided ( tested with podman and no data persistent configuration )

```bash
#build docker image with 'podman', 'docker' or 'nerdctl'
podman build -t wallet-api .
podman run --rm -d -p 3000:3000 wallet-api
```
### API testing with Postman

I provided a postman collection for running an api test with postman, assume that you are running a service on fresh database, you can import a collection into postman and run a collection automatically. All test should pass.
