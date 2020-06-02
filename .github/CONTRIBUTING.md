# Contribution guidelines

## Summary

- [Contribution guidelines](#contribution-guidelines)
  - [Summary](#summary)
  - [Getting started](#getting-started)
    - [Language](#language)
      - [If you are a native English speaker](#if-you-are-a-native-english-speaker)
      - [If you're not a native English speaker](#if-youre-not-a-native-english-speaker)
    - [Code of conduct](#code-of-conduct)
  - [What can I do to make AncapHub better?](#what-can-i-do-to-make-ancaphub-better)
    - [Submit an issue](#submit-an-issue)
    - [Documentation](#documentation)
    - [Send feedback](#send-feedback)
    - [Coding](#coding)
  - [Before commiting](#before-commiting)
    - [Motivation](#motivation)
  - [Sending a pull request](#sending-a-pull-request)

## Getting started

First of all, we'd like to say a **big thank you** for being interested in
contributing to AncapHub. We do value your help very much.

This document presents some rules and guidelines we ask you to follow before
you start contributing to AncapHub.

### Language

When contributing or interacting in this project, we kindly ask you to avoid using
any language other than English.

#### If you are a native English speaker

Please express yourself in a simple way. Refrain from using complicated terms
and sentences so that other people who are not native speakers can understand
you well too. Also, don't make fun of other people if you find something wrong
in the way they talk. Instead, encourage them to continue interacting! This could
help them feel more comfortable to keep contributing.

#### If you're not a native English speaker

Don't worry. We're a community and as such we make no judgements. Feel free to
express yourself - in a simple way - and to contribute.

### Code of conduct

You can check our [code of conduct](CODE_OF_CONDUCT.md) so that you can understand what kind of conduct we do value, and what we do not.

## What can I do to make AncapHub better?

Actually, there's a lot of things you can help to make the project better:

### Submit an issue

Many times in open source projects, issues are opened without clear description or
are duplicates. Before you file an issue, please, check these things first:

- Make sure you write a descriptive title.
- Look if there's not a similar issue or the issue you're trying to open already exists.
- Use the issue template that better fits yours.
- Fill out information as much detailed as possible, according to the chosen template.
- Before you send, run the automated tests so that the issue can be easily proved.

### Documentation

Errors, bugs, typos, lack of explanation or detail, etc are examples of things
you can help us fix or improve.

When you write documentation, please, keep it simple and clear.

### Send feedback

Feedback is **always welcome**. If you have any suggestions, opinions or relevant
topics to talk, please, do it!

The [`question`](https://github.com/ancaphub/ancaphub/labels/question) label is the
best place to look for ongoing discussions.

### Coding

If you feel like coding AncapHub, you can check these issue labels to find stuff
that you might help us with:

- [`bugs`](https://github.com/ancaphub/ancaphub/labels/bug) for known bugs that need to be fixed.
- [`enhancements`](https://github.com/ancaphub/ancaphub/labels/enhancement) for new features and improvements to existing ones.
- [`help wanted`](https://github.com/ancaphub/ancaphub/labels/help%20wanted) and [`good first issue`](https://github.com/ancaphub/ancaphub/labels/good%20first%20issue) are also useful for newcomers or if the issue subject is not specifically a bug or an enhancement.

Before you start working on an issue, ask if someone's not already working on it,
so that no unnecessary work is done.

Also, we recommend using the latest LTS version of Node or more recent.

A brief summary of the scripts you can run:

- `dev`: Starts the development server
- `docker:up`: Starts Docker containers (creates them if they're not set up yet)
- `docker:down`: Shuts down the Docker containers.
- `test`: Runs the test suites.

We use [ESLint](https://eslint.org/) for code linting.

## Before commiting

We highly encourage you to write a body and a footer for your commit.

The header must use the present tense and imperative mood (_add foo_ over _added foo_).

The body and footer must have a leading blank line each, and each line must have a maximum of 72 characters. If needed, reference issues and PRs in the last line (e.g. #1, #2).

### Motivation

The contribution guidelines are enforced for some reasons:

- Communicating better
- Making contributing easier for anyone who wants to do so.

## Sending a pull request

Before you submit a pull request, please take the following steps:

1. Fork this repository.
2. Create a branch from master (e.g. `feature/my-branch` or `fix/something`).
3. Run `npm install` to install dependencies.
4. Run the test suites.
5. Validate your commit before you send.

That's all. Thank you for reading and contributing for AncapHub! :smile: