test:
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	NODE_PATH=$(PWD)/test ./node_modules/.bin/mocha -t 200000 -R spec test/index.js

coverage:
	NODE_PATH=$(PWD)/test ./node_modules/.bin/mocha -t 200000 -R html-cov --require blanket  > coverage.html 
	@open coverage.html

coveralls:
	NODE_PATH=$(PWD)/test ./node_modules/.bin/mocha -t 200000 -R mocha-lcov-reporter  --require blanket | ./node_modules/.bin/coveralls

.PHONY: test