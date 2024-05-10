FROM node as front

WORKDIR /build

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx

COPY --from=front /build/dist /usr/share/nginx/html





