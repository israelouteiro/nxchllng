# Simple application with Mocha, Express and Docker

###test with docker

- Get docker on your system, something like this
```shell
    $ sudo apt install docker.io
```

- Navigate to project folder
- Now build docker image
```shell
    $ docker build .
    $ docker run $IMAGE_ID
    $ docker run -it $IMAGE_ID bash
```

#### end with docker

### Test Without Docker

```shell
    $ sudo apt install mongodb -y
    $ sudo npm i -g mocha
```

- navigate to project folder

```shell
    $ mkdir data
    $ cd data
    $ mongod --dbpath ./
    $ cd ..
    $ npm install
    $ npm start
    $ npm test
```

###  thats all