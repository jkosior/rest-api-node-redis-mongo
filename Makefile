SHELL:=/bin/bash

compose:
	@docker-compose up --build

down:
	@docker-compose down

enter_server:
	@docker exec -it server /bin/bash

enter_mongo:
	@docker exec -it api_mongo /bin/bash

enter_redis:
	@docker exec -it redis /bin/bash

enter_mongodb:
	@docker exec -it api_mongo mongo

tests:
	@docker build -t api_mongo ./mongo \
		&& docker run --rm -d -p 27017:27017 --name api_mongo api_mongo \
		&& docker run --rm -d -p 6379:6379 --name redis redis \
		&& sleep 1m \
		&& cd ./server \
		&& npm test \
		&& docker kill api_mongo redis
