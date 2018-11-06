SHELL:=/bin/bash

compose:
	@docker-compose up --build

down:
	@docker-compose down

enter_server:
	@docker exec -it server /bin/bash

enter_mongo:
	@docker exec -it mongo mongo

tests:
	@docker build -t mongo ./mongo
