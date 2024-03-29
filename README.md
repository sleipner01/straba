# Straβa
## Description
Social training application to log or plan sessions.

***

## Installation

### Computer setup

Windows:
1. Navigate to https://nodejs.org/en/ and install the latest NodeJS release
2. In a terminal, run as administrator and execute: `npm install -g yarn`

Mac:
1. Navigate to https://nodejs.org/en/ and install the latest NodeJS release
or use homebrew and install the latest node-release
2. In a terminal, run: `npm install -g yarn`

Linux:
1. In a terminal, run: `sudo apt install npm`
2. Then run: `sudo npm install -g yarn`


### Repo setup

1. Clone this repository
2. Open a new terminal and navigate to this folder
3. Run: `yarn install`

### Issues
Linux:
#### The engine "node" is incompatible with this module. Expected version
1. In a terminal, run: `sudo npm install -g n`
2. Then run: `sudo n stable`. You should now have the latest stable version of node. To doublecheck this, run `node -v`
3. If the terminal is still showing the old version, run `hash -r` or `rehash` and then run `node -v` again.

***

## Running dev-environment

#### React
1. In the terminal, run: `yarn start`
2. The browser will open at localhost:3000
3. The server is configured to refresh when changes to files are made

<!-- #### Nodemon
1. In the terminal, run: `nodemon index.js localhost {port}` -->

#### Prettier
1. In the terminal, run: `yarn format`

Prettier will run automatically when saving as well


#### ESLint
1. In the terminal, run: `yarn lint`

To fix all errors or warnings, run: `yarn lint:fix`

More information: https://eslint.org/docs/latest/use/command-line-interface


#### Tests
1. In the terminal, run: `yarn test`

***

## Conventional Commits
https://www.conventionalcommits.org/en/v1.0.0/

***


## Authors and acknowledgment
- Elin Haugum | elihaugu@stud.ntnu.no
- Aksel Hodne Hanisch | akselhh@stud.ntnu.no
- Daniel Douglas Jackman Røe | ddroe@stud.ntnu.no
- Sondre Midtbu Skjerven | sondrmsk@stud.ntnu.no
- Magnus Byrkjeland | magnueb@stud.ntnu.no

***

## License
MIT

