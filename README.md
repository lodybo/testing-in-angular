# Testing in Angular

This repo (based on the [Angular Webpack starter](README-Angular-Webpack.md)) is an example file for a presentation that I'm gave about the full test spectrum in Angular.

In this presentation, we'll deep dive in:
* unit testing
* component testing
* Protractor/E2E testing

There is a server that's being used for mail communication. Running `npm start` will fire up a Webpack server and the mail server.
Tests can be ran using `npm run test-watch` for TDD and `npm t` for CI.

The master branch is empty, even though all the imports and mock classes have been written.
You're free to add tests to them for practice. You can look in the `complete` branch to see what I've written.
