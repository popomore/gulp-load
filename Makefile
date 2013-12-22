test:
	@cd test/gulp-load-global && npm link
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@./node_modules/.bin/mocha -t 200000 -R spec test/index.js
	@npm unlink gulp-load-global -g

coverage:
	@cd test/gulp-load-global && npm link
	@./node_modules/.bin/mocha -t 200000 -R html-cov --require blanket  > coverage.html 
	@npm unlink gulp-load-global -g
	@open coverage.html

coveralls:
	@cd test/gulp-load-global && npm link
	./node_modules/.bin/mocha -t 200000 -R mocha-lcov-reporter  --require blanket | ./node_modules/.bin/coveralls
	@npm unlink gulp-load-global -g

.PHONY: test