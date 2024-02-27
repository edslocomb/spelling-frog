# Spelling Frog

A small project implementing a clone of the NY Times
daily Spelling Bee puzzle.

This project is meant to demonstrate clean use of a number of modern
frameworks, libraries and tools. It does not necessarily reflect the
architecture and technology choices I would make for a production
project of this size and scope, but my personal preferences are of
course present ;).  See Notes below for details.

### Live demo

https://edslocomb.com/spelling-frog

## Running locally

### Prereqs:
- git
- Ruby, preferably installed via rvm or rbenv.  See [.ruby-version](./.ruby-version) for version
- Postgreql
- nodejs
- Google Chrome (for headless system integration tests)

### Setup
```sh
createdb spelling_frog_development
git clone https://github.com/edslocomb/spelling-frog.git
cd spelling-frog
bundle install
rails db:setup
./bin/dev # this will start a server running the app at http://localhost:3000
```

## Running tests

```sh
rails test:all
rails test  # omit system integration tests
rails test test/system  # system integration tests only
```

## Notes on dependency choices

#### PostgresQL
  I've used MySQL/MariaDB extensively as well, I don't have a strong
  personal preference but find that more devs prefer pgsql.

#### Rails
  ...is a framework I've been using professionally since version 3.0,
  and is still my comfort pick for rapid prototyping.

#### Typescript
  ...is overkill for small projects, but I've developed a taste for
  it.  I've also used flow.js on client projects, but prefer typescript's
  tooling.

#### React
  I've been using it professionally since 2014, I've nearly forgotten
  what it was like to use jQuery and html templating.

#### Material UI
  I've used both MUI and Bootstrap for clients.  Choosing a UI/UX
  component framework tends to be driven by designers, so I'll work
  with whatever meets their requirements.  I do appreciate MUI's
  commitment to continually making the library cleaner and better
  suited to building reusable components.

#### esbuild
  ...is quick, and seems a little less fiddly than webpack, which I've
  used extensively as well.

#### minitest
  RSpec was the clear choice for a long time, and I've used it
  extensively as well.  I don't have a strong preference, both work
  well.

#### graphql
  ...is great, and I've used it professionally for years, but I've
  left it out of this demo).  I'd definitely use it if I were building
  an API endpoint today.

#### yarn
  I used to prefer yarn over npm because it had version locking first,
  I'm using it here in zero-install (pnp) mode, for quicker
  deployments.

#### zustand
  ...was chosen here for its built-in browser persistence.  I've used
  Redux professionally, but find it makes code unnecessarily indirect
  for devs trying to read it.  Since the introduction of hooks in
  React, I've preferred to start with useState for local UI/UX state
  (this works particularly well in conjunction with a graphQL client
  like Apollo or Relay for application data)
