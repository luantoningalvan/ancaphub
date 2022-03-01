# The official AncapHub Git repository

Welcome to AncapHub, the network that aims to connect libertarians all
over the world.

This repository contains the original code used in production for the platform's
server. It is written mainly in Javascript, making use of Node.js as the runtime.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) ![David](https://img.shields.io/david/ancaphub/ancaphub?style=flat-square) ![GitHub](https://img.shields.io/github/license/ancaphub/ancaphub?style=flat-square)

## What is AncapHub?

AncapHub is a community-driven effort to build a platform focused on
connecting libertarians, providing an environment that while directed to studies,
provides full-fledged social experience.

## We're completely open source

We believe that everyone should be able to have access to education and information.
With that said, we decided to leave the source code open for everyone to read,
contribute and also copy, without restrictions.

### How to contribute to the project?

First of all, we'd like to thank you for your interest in being part of our
project. Before you start to contribute, we recommend you to take a quick look
at our [contribution guide](.github/CONTRIBUTING.md). We have also a pull request
template you should follow in order to keep things organized.

### How to run the code locally?

- Clone this repository.
- Open the cloned repository folder and type `npm install` to install dependencies.
- Create a `.env` file following the `.env.example` file located in the folder.
- Ensure you have Docker and Docker Compose installed in your machine so you can run the containerized database and AWS localstack instances.
- After your Docker installation is all set, run `npm run docker:up` to start the containers.
- Run `npm run dev` to start the development server.

#### Other repositories

- [Web client](https://github.com/luantoningalvan/ancaphub-web)
