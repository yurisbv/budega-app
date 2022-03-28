# Budega App

by [@yurisbv](https://twitter.com/yurisbv)

This project is cloned from [Angular 10, NgRx and Angular Material Starter](https://github.com/tomastrajan/angular-ngrx-material-starter), my sincere thanks to [@tomastrajan](https://twitter.com/tomastrajan) and all contributors!

# Table of Content

- [Budega App](#budega-app)
- [Table of Content](#table-of-content)
- [About Bugeda Project](#about-bugeda-project)
- [Inspiration](#inspiration)
- [Budega Openstore Stack](#budega-openstore-stack)
  - [Backend](#backend)
  - [Kubernetes](#kubernetes)
  - [Getting started](#getting-started)
  - [Useful Commands](#useful-commands)
  - [Make It Your Own](#make-it-your-own)
      - [Continuous Integration](#continuous-integration)
  - [Goals](#goals)
  - [Learning Materials](#learning-materials)
      - [Theming](#theming)
  - [Features](#features)
  - [Stack](#stack)


# About Bugeda Project

Budega is a fullstack solution developed to complete the postgraduate course at the Pontifical Catholic University (PUC-MG) in the [`Fullstack Web Development`](https://www.pucminas.br/PucVirtual/Pos-Graduacao/Paginas/Desenvolvimento-Web-Full-Stack.aspx) course.

# Inspiration

With the health tragedy resulting from the covid-19 pandemic, several small businesses in peripheral neighborhoods needed to carry out their sales and deliveries online. Budega emerged to help the community solve this problem.

# Budega Openstore Stack

## Backend
    - Go to Project [Budepa API]("http://github.com/yurisbv/budega-api").
    - Typescript and NestJS.
    - Only mongodb drive.
    - Keycloak connection.
    - Dockerized.
  
## Kubernetes
    - Google Kubernetes Enviroment.
    - Use small E2 machine, 2 core and 2 GB memory.
    - Nginx Ingress.




## Getting started

```bash
$ git clone https://github.com/Budega-Delivery/budega-delivery-app.git new-project
$ cd new-project
$ npm install
$ npm start
```

## Useful Commands

- `npm start` - starts a dev server and opens browser with running app
- `npm run start:prod` - runs full prod build and serves prod bundle
- `npm run test` - runs lint and tests
- `npm run watch` - runs tests in watch mode
- `npm run prettier` - runs prettier to format whole code base (`.ts` and `.scss`)
- `npm run analyze` - runs full prod build and `webpack-bundle-analyzer` to visualize how much code is shipped (dependencies & application)

## Make It Your Own

When using this starter project to build your own app you might consider some of the following steps:

- use `search and replace` functionality of your favourite IDE to replace `budega` with `<your-app-prefix>`
- rename project in `package.json` `name` property and set appropriate version (eg `0.0.0` or `1.0.0`)
- remove / rename context path config `-- --deploy-url /angular-ngrx-material-starter/ --base-href /angular-ngrx-material-starter` in `package.json`, this is used to configure url (context path) on which the application will be available (eg. `https://www.something.com/<context-path>/`)
- rename app in `/environments/` files (will be shown in browser tab)
- delete pre-existing `CHANGELOG.md` (you will generate your own with future releases of your features)
- delete `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md` and `BUILT_WITH.md` files as they are relevant only if project is open sourced on Github
- edit the title and Open Graph metadata properties in `index.html`
- remove or adjust links in the footer
- replace logo in `/assets` folder ( currently 128 x 128 pixel `png` file )
- adjust colors in `/themes/default-theme.scss`

#### Continuous Integration

TODO: explain how to use git actions

## Goals

The main goal of this repository is to provide an up to date example of Angular application following all recent best practices in various areas like:

- `@ngrx/store` - including reducers, actions, selectors
- `@ngrx/effects` - for implementation of side effects like `http` requests, logging, notifications,...
- `@ngrx/entity` - for CRUD operations
- `@ngrx/router-store` - to connect the Angular Router to @ngrx/store
- `@ngrx/store-devtools` - to enable a powerful time-travelling debugger.
- `@angular/material` - material design component library, theming, ...
- routing
- testing of all the above mentioned concepts
- Angular CLI configuration (prod build, budgets, ...)

This repository will also strive to always stay in sync with releases of Angular and the related libraries.
The nature of the repository is also a great match for first time open source contributors who can add
simple features and enhance test coverage, all contributors are more than welcome!

## Learning Materials

Articles with content that explains various approaches used to build this starter project.

- [Blog post about Best subscribing to RxJS Observable data by Components](https://medium.com/@tomastrajan/angular-question-rxjs-subscribe-vs-async-pipe-in-component-templates-c956c8c0c794): subscribe() vs | async pipe
- [Blog post about Best Practices for Angular CLI](https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81) used in this starter project
- [Blog post about Typescript tips for Ngrx reducer code](https://medium.com/@tomastrajan/object-assign-vs-object-spread-in-angular-ngrx-reducers-3d62ecb4a4b0)
- [Blog post about building responsive layouts with Bootstrap 4 in Angular apps](https://medium.com/@tomastrajan/how-to-build-responsive-layouts-with-bootstrap-4-and-angular-6-cfbb108d797b)
- [Blog post about configuration of animations during runtime](https://medium.com/tomastrajan/total-guide-to-dynamic-angular-animations-that-can-be-toggled-at-runtime-be5bb6778a0a)
- [Blog post about unit testing of components with NgRx TestStore](https://medium.com/@tomastrajan/how-to-unit-test-angular-components-with-fake-ngrx-teststore-f0500cc5fc26)
- [Blog post about Angular CLI budgets](https://medium.com/@tomastrajan/how-did-angular-cli-budgets-save-my-day-and-how-they-can-save-yours-300d534aae7a)
- [Blog post about the best way to unsubscribe RxJs streams](https://medium.com/@tomastrajan/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0)
- [Blog post about Angular 6+ DI with providedIn](https://medium.com/@tomastrajan/total-guide-to-angular-6-dependency-injection-providedin-vs-providers-85b7a347b59f)
- [Blog post about the best way to lazy load Angular Elements](https://medium.com/@tomastrajan/the-best-way-to-lazy-load-angular-elements-97a51a5c2007)

#### Theming

- [Blog post](https://medium.com/@tomastrajan/the-complete-guide-to-angular-material-themes-4d165a9d24d1)
- [Presentation (Slides)](http://slides.com/tomastrajan/angular-material-themes-guide#/)
- [Live coding Video Tutorial](https://www.youtube.com/watch?v=PsgZjFTAleI)
- [Meetup Presentation & Live coding Video](https://www.youtube.com/watch?v=7auj9RfCNrE)

## Features

- custom themes support (4 themes included)
- lazy-loading of feature modules
- lazy reducers
- localStorage ui state persistence
- `@ngrx/effects` for API requests
- fully responsive design
- angular-material and custom components in `SharedModule`

## Stack

- Angular
- ngrx (or try [ngx-model](https://github.com/tomastrajan/ngx-model) if you prefer less boilerplate)
- Angular Material
- Bootstrap 4 (only reset, utils and grids)

```bash

$ docker build -t yurisbv/budega-app:v0.0.6a .
$ docker tag yurisbv/budega-app:v0.0.6a yurisbv/budega-app:latest
$ docker push yurisbv/budega-app:v0.0.6a
```
