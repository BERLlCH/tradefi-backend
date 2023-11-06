FROM node:18-bullseye

RUN useradd -Uu 1001 -d /app -ms /bin/bash daosing && chown daosing.daosing /app

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
# Create app directory

COPY --chown=daosing:daosing . /app


RUN npm install -g typescript ts-node

WORKDIR /app
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
RUN yarn
RUN yarn build

ENV NODE_ENV production

USER daosing
EXPOSE 3000
CMD ["yarn", "start"]
