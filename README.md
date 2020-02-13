# Xstitch Project

## Table Of Contents

  - [Description](#description)
  - [Stack](#stack)
  - [Final Product](#final-product)
  - [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
  - [Contributions](#contributions)


## Description
Xstitch is a version control application inspired by GIT for creating and editing cross stitch patterns. Users are able to create custom patterns, view version history of every save, as well as fork and edit from other users patterns. 

## Stack
- Ruby on Rails
- React.JS
- Javascript
- Postgres SQL
- Axios

## Final Product

 ![Gif of homepage](https://github.com/curriecode/Xstitch/blob/master/docs/scroll.gif)
 ![Gif of editing pattern](https://github.com/curriecode/Xstitch/blob/master/docs/edit.gif)

## Getting started
1. Clone this repository 
2. Create database in postgres, if unsure how to do this please see the postgres [docs](https://www.postgresql.org/docs/9.0/sql-createdatabase.html)
3. In the terminal run `bundle install` on the root directory
4. In another terminal run `npm install` in the client directory
5. After install complete run `rake db:setup` in root directory then run command `rails s` to start the rails server
6. Run command `npm start` in the client directory on the other terminal to start the react server
7. The app will be served at <http://localhost:3000/>

## Dependencies
    @babel/runtime: ^7.7.4
    axios: ^0.18.0
    bootstrap: ^4.3.1
    html2canvas: ^1.0.0-rc.5
    jspdf: ^1.5.3
    react: ^16.8.6
    react-bootstrap: ^1.0.0-beta.16
    react-color: ^2.17.3
    react-dom: ^16.8.6
    react-icons: ^3.8.0
    react-router-dom: ^5.1.2
    react-scripts: 2.1.8
    semantic-ui-react: ^0.88.1
    styled-components: ^4.4.1


## Contributions
This app was created by

- https://github.com/curriecode
- https://github.com/charcharmasonjar
- https://github.com/puneetsran

