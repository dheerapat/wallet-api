# chomchob-wallet-api

How to run this project on your machine

```bash
git clone <this project url> wallet api
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
# do not forget to create .env file
cp .env.example .env

#build docker image with 'podman', 'docker' or 'nerdctl'
podman build -t wallet-api .
podman run --rm -d -p 3000:3000 wallet-api
```