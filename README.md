# c2w-lambda-api-dashboard

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/cycle2work/c2w-lambda-api-dashboard.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/cycle2work/c2w-lambda-api-dashboard/context:javascript)
[![Build Status](https://travis-ci.org/cycle2work/c2w-lambda-api-dashboard.svg?branch=master)](https://travis-ci.org/cycle2work/c2w-lambda-api-dashboard)
[![codecov](https://codecov.io/gh/cycle2work/c2w-lambda-api-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/cycle2work/c2w-lambda-api-dashboard)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

AWS Lambda function to expose dashboard data and enjoy [`cycle2work.io`](https://cycle2work.io).

After cloning the repository, run `npm install` or [`yarn`](https://yarnpkg.com) to install all dependencies and `yarn dev` to start developing.

## Env Vars

List of env vars and defaults:

| Name                            | Default                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| LOG_LEVEL                       | debug                                                      |
| PROCESSED_ACTIVITIES_COLLECTION | processed-activities                                       |
| MONGODB_NAME                    | test                                                       |
| MONGODB_URL                     | mongodb://localhost:27017/test?retryWrites=true&w=majority |
