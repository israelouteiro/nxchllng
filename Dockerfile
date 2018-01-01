FROM node

RUN useradd --user-group --create-home --shell /bin/false app &&\
	npm install --global npm@3.7.5 

RUN npm install --global mocha@4.1.0

RUN apt-get update \
	&& apt-get install -y mongodb \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /data
RUN mkdir /data/db

ENV HOME=/home/app
ENV APP_NAME=ndexchain

COPY package.json $HOME/$APP_NAME/ 

WORKDIR $HOME/$APP_NAME
RUN npm cache clean && npm install --silent --progress=false 

COPY . $HOME/$APP_NAME 

RUN service mongodb start & npm start

CMD [ "npm", "test"] 
