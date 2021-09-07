# CS:GO Live Score
[![service:build](https://github.com/ax333l/cs-livescore/actions/workflows/service-build.yaml/badge.svg)](https://github.com/ax333l/cs-livescore/actions/workflows/service-build.yaml)

This app allows to get the score of CS:GO games live using a steam profile link.

To run application you must have docker installed.

1. Run `git clone https://github.com/ax333l/cs-livescore`
2. Run `docker-compose up` and wait until docker builds all the containers
3. If everything went well, go [here](http://localhost:4000) and add link to steam profile as query param link. For example, http://localhost:4000/?link=https://steamcommunity.com/id/shoowtime
