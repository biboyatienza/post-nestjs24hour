# The Aftermath: 24 Hour NestJS API Challenge 

## Description
The goal of this test is to create a consumable RESTful API for storing and retrieving
images.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Work Logs
- 2022.May.24
  - 05:58 Created a blank project for "this"
  - 05:59 Started a new Nest.Js project for "this"
  - 06:30 Issue with github project could not find repo, seems doesn't like the word "Aftermath"
  - 06:36 Created a new project replacing "aftermath" with "post"
  - 06:45 Trying to deploy on Heroku
    - Update "main.ts"
      ```
        // await app.listen(3000);
        await app.listen(process.env.PORT || 3000);
      ```
    - Add new entry to "scritps" section of "package.json"
      ```
      "start:prod": "node dist/main.js"
      ``` 
    - 06:51 Add new file to the root of this project name "Profile" with below content
      ```
      web: npm run start:prod
      ``` 
    - 06:53 Go to heroku.com and create new project name "post-nestjs24hour"
      - 06:56 post-nestjs24hour > Settings > click button "Reveal Config Vars" and add entries of KEY:VALUE pair, see below;
        ```
        NODE_ENV              : production
        NPM_CONFIG_PRODUCTION : false
        ```
    - 07:00 post-nestjs24hour > Deploy > Install the Heroku CLI (Section), follow the instructions.
      - 07:03 Push to heroku
        ``` 
        $ heroku git:remote -a post-nestjs24hour
        $ git add .
        $ git commit -am "Trying go live on heroku"
        $ git push heroku master
        ``
## Support
Just buzz the author.

## Stay in touch

- Author - [biboy/caIsBack](https://github.com/biboyatienza)
