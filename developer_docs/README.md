# Welcome to Emissary

Welcome Devs! We're excited to have you contribute to Emissary. We understand
that there is a lot to take in and we hope to provide some clarity to speed up
your journey and get you productive quickly.

## A Note about our Pipeline

Pipelines are important to ensuring your development process is functioning
properly and that all code introduced is working seamlessly. We detail our
pipeline here so that you may explore what we've used, take what you like,
replace what you don't, and get to coding quickly.

SCM: [GitHub](https://github.com/cse112-kissmyapp/EmissaryWST)  
CI/CD: [TravisCI](https://travis-ci.org/cse112-kissmyapp/EmissaryWST)  
Code Quality: [CodeClimate](https://codeclimate.com/github/cse112-kissmyapp/EmissaryWST)  
Linters:
  - HTML: [htmlhint](http://htmlhint.com/)
  - CSS: [csslint](http://csslint.net/)
  - JS: [jshint](http://jshint.com/)
  - *Note* - CodeClimate also runs `PHPMD`, `eslint`, and `coffeelint`.

Backend Testing:
  - [Mocha](https://mochajs.org/)
  - [Chai](http://chaijs.com/)
  - [Istanbul](https://istanbul.js.org/)

Frontend Testing:
  - [Selenium](http://www.seleniumhq.org/)
  - [SauceLabs](https://saucelabs.com/)
  - TODO

Code Coverage:
  - [CodeClimate](https://codeclimate.com/github/cse112-kissmyapp/EmissaryWST/coverage)
  - [CodeCov](https://codecov.io/gh/cse112-kissmyapp/EmissaryWST)

Monitoring:
  - TODO

Hosting:
  - Us: [Google App Engine](http://kiss-my-app.appspot.com/)
  - The original [WebStormTroopers](https://github.com/danielchristiancazares/Emissary): [Heroku](http://webstormtroopers.herokuapp.com)

We've also enforced a pre-commit check in `package.json` (see ["pre-commit"](https://github.com/cse112-kissmyapp/EmissaryWST/blob/develop/package.json)) that runs all three linters above and forces compliance before a commit can be made.

## User Stories, Features, and Progress

To help understand our evaluation of Emissary, and where we hoped to take it in the future, we have provided documentation that can be found in this folder.

Our user stories detail our vision for the application. They can be found [here](https://github.com/cse112-kissmyapp/EmissaryWST/blob/develop/developer_docs/Emissary%20User%20Stories.pdf).

We have the corresponding project board setup [here](https://github.com/cse112-kissmyapp/EmissaryWST/projects). You will see it is divided into two sections: `Backlog` and `v2.0`. Backlog describes our assessment of the project as we inherited it. It details our attempt to fix known issues, refactor code, and address technical debt. You can find our progress within that board. v2.0 describes our assessment of where the project may move in the future. Similarly, you can find our progress within that board.

## Other Integrations

Of course, there are plenty of other things out there that we have integrated with to provide the `hotness` that Peter is looking for. We list them below.

  - TODO
  - [Slack](https://slack.com/)

## The Application Stack

  - TODO
