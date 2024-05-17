install:
	yarn install
	cd apps/client && yarn install

run:
	docker compose up