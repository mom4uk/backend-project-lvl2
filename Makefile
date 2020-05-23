install:
	npm install
	
lint:
	npx eslint .

build: 
	npm build

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish

.PHONY: test