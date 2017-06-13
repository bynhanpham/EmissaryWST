# EmmisaryWST

[![Build Status](https://travis-ci.org/cse112-kissmyapp/EmissaryWST.svg?branch=develop)](https://travis-ci.org/cse112-kissmyapp/EmissaryWST)
[![Code Climate](https://codeclimate.com/github/cse112-kissmyapp/EmissaryWST/badges/gpa.svg)](https://codeclimate.com/github/cse112-kissmyapp/EmissaryWST)
[![Issue Count](https://codeclimate.com/github/cse112-kissmyapp/EmissaryWST/badges/issue_count.svg)](https://codeclimate.com/github/cse112-kissmyapp/EmissaryWST)
[![Test Coverage](https://codeclimate.com/github/cse112-kissmyapp/EmissaryWST/badges/coverage.svg)](https://codeclimate.com/github/cse112-kissmyapp/EmissaryWST/coverage)
[![codecov](https://codecov.io/gh/cse112-kissmyapp/EmissaryWST/branch/develop/graph/badge.svg)](https://codecov.io/gh/cse112-kissmyapp/EmissaryWST)

### Past Deployment:
http://webstormtroopers.herokuapp.com

### Our Deployment:
http://kiss-my-app.appspot.com/

### Description:
**Emissary is a visitor check-in SaaS application targetted for small businesses.**
- Sign up your company and your own personal account for your company.
- Thereafter, add employees to your company through the "Employees" section of the application to provide them access to the application.
- Create appointments through the "Appointments" page. Open up the Check-in mode by clicking on the gear in the upper right-hand corner.
- As visitors check-in, they will show up in the queue on the "Visitors" page.
- If there is an appointment that matches their information, their appointment time will automatically be populated.
- Click on a visitor to check him/her out. If he/she had an appointment, their appointment will automatically be removed from the "Appointments" section.

### Requirements
- Git
- Node.js
- MongoDB
- HandleBars
- jQuery
- NF

_Note: Please see `package.json` for the full list of requirements._

### Developer Instructions

First clone the repo to get the source code.

```
$ git clone https://github.com/cse112-kissmyapp/EmissaryWST
$ cd EmmisaryWST
```

#### Windows

You will need to install and setup MongoDB first: https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/

On your CMD (command shell), enter the commands:
```
cd \MongoDB\Server\'version'\bin
mongod.exe --dbpath C:\MongoDB\Server\'version'\data\db
```

After you have MongoDB running on the background, you can start running the front-end. Make sure to navigate to the repo root.

```
$ npm install -g gulp bower foreman
$ npm install
$ gulp build:dev
$ nf start web
```

_Note: Windows terminal will need administrator rights._

#### Macs

Again, you will need to install and setup MongoDB first.

In your terminal run:
```
$ sudo mkdir -p /data
$ sudo mkdir -p /data/db
$ sudo chown 'username' /data/db

# these processes will each consume your current terminal session, see note below
$ mongod
# and
$ mongo
```

_Note: mongod and mongo must be run in separate terminal windows. Be sure to run mongod first._

After you have MongoDB running on the background, you can start running the front-end. Make sure to navigate to the repo root.

```
$ npm install -g gulp bower foreman
$ npm install
$ gulp build:dev
$ nf start web
```

Now that you're all set with that see our developer [docs](https://github.com/cse112-kissmyapp/EmissaryWST/blob/develop/developer_docs/README.md) for more details regarding Emissary!

### Credits
Thanks to `WebStormTroopers` for the base code, and documentation: https://github.com/danielchristiancazares/Emissary
