# Spelling Frog

A small demonstration project, implementing a clone of the NY Times
daily Spelling Bee puzzle.

## Live demo

https://edslocomb.com/spelling-frog

## Discussion

This project is meant to demonstrate clean use of a number of modern
frameworks, libraries and tools.

It does not necessarily demonstrate the architecture and technology
choices I would make for a project of this size and scope, but my
personal preferences are of course present :)

### Notes on tech choices

#### PostgresQL
  I've used MySQL/MariaDB extensively as well, I don't have a strong
  personal preference but find that more devs prefer pgsql.

#### Rails
  ...is a framework I've been using professionally for over ten years,
  and is still my comfort pick for rapid prototyping.

#### Typescript
  ...is overkill for small projects, but I've developed a taste for
  it.  I've also used flow.js professionally, but prefer typescript's
  tooling.

#### React
  I've been using it professionally since 2014, I've nearly forgotten
  what it was like to use jQuery and html templating.

#### Material UI
  I've used both MUI and bootstrap professionally.  Choosing a UI/UX
  component framework tends to be driven by designers, so I'll work
  with whatever meets their requirements.  I do appreciate MUI's
  commitment to continually making the library cleaner and better
  suited to building reusable components.

#### esbuild
  ...is quick, and seems a little less fiddly than webpack, which I've
  used extensively as well.

#### minitest
  ...is less familiar to me than rspec, I just went with the Rails
  default on this project.

#### graphql
  ...is neat, and I've used it professionally for years, but I've left
  it out here.  I'd definitely use it if I was building API endpoint
  today.

#### zustand
  ...was chosen here for its built-in browser persistence.  I've used
  Redux professionally, but find it makes code unnecessarily indirect
  for devs trying to read it.  Since the introduction of hooks in
  React, I've preferred to start with useState for local UI/UX state
  (this works particularly well in conjunction with a graphQL client
  like Apollo or Relay for application data)

## Running locally

Dependencies:
- git
- Ruby 3.2.2, preferably installed via rvm or rbenv
- The ruby `bundler` gem
- Postgreql
- nodejs
- yarn
- Google Chrome (for headless system integration tests)

Setup
```sh
createdb spelling_frog_development
git clone https://github.com/edslocomb/spelling-frog.git
cd spelling-frog
bundle install
yarn install
./bin/dev # this will start a server running the app at http://localhost:3000
```

## Running tests

```sh
rails test:all
rails test  # omit system integration tests
rails test test/system  # system integration tests only
```
