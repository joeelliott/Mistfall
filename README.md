### Prerequisites

1. Node.js (not sure of minimum version, using v18 for development)
1. Yarn (Node package manager, npm works too)
1. Docker

### Setup

- Install packages
  - `yarn`
- Create .env file at root
  - current dev config

```
PGHOST=localhost
PGPORT=5433
PGUSER=postgres
PGPASSWORD=test
```

- Create docker container
  - `yarn container:create`
- Start docker container
  - `yarn container:start`
- Run DB migrations
  - `yarn db:migrate`

### Start Game Server

`yarn start:server port`

Change port to the port you'd like to run on, currently default is [null] so you gotta choose something yaesel.

### Start Game Client

`yarn start:client [player name] [ws://ip:port]`
