# Studio2B-2021

A multi-level authentication method and system for teaching attendance.

Software Engineering Studio 2B Autumn 2021 (Group 1)

## Project structure

This project is split into two packages:

* [`client`](./packages/client) (`@studio2b-2021/client`) – React frontend
* [`server`](./packages/server) (`@studio2b-2021/server`) – Express.js backend

More information for each package is available in their respective `README.md`
files.

## Prerequisites

### Installing NPM and Node.js

You'll need to have [NPM][npm] and [Node.js][nodejs] to contribute to this
project. Please visit their respective documentations to find out how to install
them on your own machine.

### Cloning this repository

Before running and testing this project, you must have a local copy of this
repository in your machine. Run the following commands on a new terminal
instance:

```shell
$ cd <directory you want to clone the repository to> # Optional
$ git clone https://github.com/ajahiri/Studio2B-2021.git # Clones the repo
```

A local copy of the latest version of the `main` branch will be available in a
folder named `Studio2B-2021`. To run client- and server-specific commands, you
must switch to their directories first:

```shell
$ cd Studio2B-2021/client # Switches to the client directory
$ cd Studio2B-2021/server # Switches to the server directory
```

You'll find commands to run and test each subproject in their respective
`README.md` files.

[npm]: https://www.npmjs.com
[nodejs]: https://nodejs.org
