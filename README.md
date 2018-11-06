# REST API

## How to work with api?

1. Build and start api

2. Call localhost:3000/apikey to get api key

3. Call localhost:3000/swagger to check for endpoints.

4. Remember to always add apikey!

## BUILD AND START API

```
$ make compose_build
```

## START API

```
$ make compose
```

## STOP API

```
$ make down
```

## ENTER CONTAINER

enter server
```
$ make enter_server
```

enter mongo bash / enter mongo shell
```
$ make enter_mongo
$ make enter_mongodb
```

enter redis bash
```
$ make enter_redis
```

## TEST APP

```
$ make tests
```
