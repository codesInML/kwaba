kwaba-up:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
kwaba-down:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
kwaba-up-build:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
kwaba-logs:
	docker logs -f kwaba-api
kwaba-cli:
	docker exec -it kwaba-api /bin/sh
kwaba-prod-build:
	docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml build
 