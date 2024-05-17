install:
	yarn install
	cd apps/client && yarn install


run:
	docker compose up


clean:
	rm -rf dist node_modules yarn.lock apps/*/node_modules apps/*/yarn.lock