#!/bin/bash

docker stop next-web
docker rm next-web
docker rmi next:main
docker build -t next:first .
docker run --name next-web -p 3000:3000 -d next:main
