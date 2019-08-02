[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/cycle2work/c2w-lambda-api-dashboard.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/cycle2work/c2w-lambda-api-dashboard/context:javascript)
[![Build Status](https://travis-ci.org/cycle2work/c2w-lambda-api-dashboard.svg?branch=master)](https://travis-ci.org/cycle2work/c2w-lambda-api-dashboard)
[![codecov](https://codecov.io/gh/cycle2work/c2w-lambda-api-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/cycle2work/c2w-lambda-api-dashboard)
[![Dependency Status](https://david-dm.org/cycle2work/c2w-lambda-api-dashboard.svg)](https://david-dm.org/cycle2work/c2w-lambda-api-dashboard)
[![devDependency Status](https://david-dm.org/cycle2work/c2w-lambda-api-dashboard/dev-status.svg)](https://david-dm.org/cycle2work/c2w-lambda-api-dashboard#info=devDependencies)

# c2w-lambda-api-dashboard

AWS Lambda function to expose dashboard data and enjoy [`Cycle2work`](https://cycle2work.io).

After cloning the repository, run `npm install` or [`yarn`](https://yarnpkg.com) to install all dependencies.

## Table of Contents

- [Configuration](#folder-structure)
  - [Env Vars](#env-vars)

## Configuration

The lambda can be configured using a [`dotenv`](https://github.com/motdotla/dotenv) file (key=value format).

## Env Vars

Example of `.env` file:

```bash
MONGODB_URL="mongodb://localhost:27017/test"
LOG_LEVEL=debug
```
