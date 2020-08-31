FROM secondstate/ssvm-nodejs-starter:v1

WORKDIR /app
COPY . .

RUN npm install \
  && ssvmup build \
  && npm run build
