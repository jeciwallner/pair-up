# Pair Up!

## Deployed with Heroku

You can take a look at the deployed website here: [Pair Up!](https://pair-up-vienna.herokuapp.com/)

## Vision

In Vienna, numerous dance schools offer a vast variety of classes, and every year, a multitude of balls, happenings and regular gatherings are being put on. Whosoever desires, can cavort and thoroughly let their hair down. If said cavorter happens, however, to not find themselves in a relationship, or with a partner not willing to join in their frolicking, one is often reduced to the sad alternative of, well, just staying home. Sad, isn't it? 
Pair Up! aims to connect all these sad people who have a passion for dancing, but nobody they can boogie with. Now there's good news!

## Functionality

- User authentication: Registration + Login
- User authorization: Only the registered User can match themselves to others and chose their preferred styles and schools
- Since the website is fully responsive, easy access on all devices incl. mobiles is given

## Technologies

- React
- Next.js
- PostgreSQL
- Emotion
- Bootstrap
- Javascript + TypeScript

## Project Management

- Database Schema on DrawSQL: [View Schema](https://drawsql.app/upleveled-2/diagrams/pairup-schema#) 
- Wireframing and Design: [View Figma](https://www.figma.com/file/Fk8Ayej5AiA6PISPtIr9NO/PairUp!?node-id=0%3A1)
- Task management with Github and Fork.

## SetUp Instructions

To make use of this project, please follow these steps:

- Clone the repo to your local machine with `git clone <repo>`.
- Setup the database by downloading and installing PostgreSQL.
- Create a user and a database.
- Create a new file .env.
- Copy the environment variables from .env-example into .env.
- Replace the placeholders xxxxx with your username, password and name of database.
- Install dotenv-cli with `yarn global add dotenv-cli`.
- Run `yarn install` in your command line.
- Run the migrations with `yarn migrate up`.
- Start the server by running `yarn dev`.

## Deploy to Heroku

A good way to deploy your Next.js app is to use Heroku.

- Sign up to Heroku: [Sign Up to Heroku](https://signup.heroku.com/)
- Create a new App
- Choose a name and select the "Europe" Region
- Click on the button in the middle called "Connect to GitHub"
- Search for your repository in the search box at the bottom of the page and click on the "Connect" button Click on the button for "Enable Automatic Deploys"
- Go back to the Overview tab and click on "Configure Add-On"
- Search for "Postgres" and select "Heroku Postgres" from the results
- Trigger a deploy by pushing your repo to GitHub

## Dependencies & Libraries

### General Setup

- Create next.js apP
- SHARP
- ESLint

### Styling

- Emotion
- Bootstrap
- camelcaseKeys 

### Database with Migrations

- dotenv-safe
- dotenv-cli
- postgres
- ley

### Cookies & Session-Tokens

- cookie
- csrf
- bcrypt

### Hosting & Deployment

- heroku-postbuild
