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
        ```
    - 07:19 We are now live in [https://post-nestjs24hour.herokuapp.com/](https://post-nestjs24hour.herokuapp.com/)
    - 07:24 Fix for $ git push heroku master
      error: src refspec master does not match any
      error: failed to push some refs to 'https://git.heroku.com/post-nestjs24hour.git' [SOLVED_BY](https://stackoverflow.com/questions/26595874/heroku-src-refspec-master-does-not-match-any)    
      ```
      $ git push heroku HEAD:master

        Enumerating objects: 27, done.
        Counting objects: 100% (27/27), done.
        Delta compression using up to 4 threads
        Compressing objects: 100% (26/26), done.
        Writing objects: 100% (27/27), 150.02 KiB | 6.52 MiB/s, done.
        Total 27 (delta 4), reused 0 (delta 0)
        remote: Compressing source files... done.
        remote:        https://post-nestjs24hour.herokuapp.com/ deployed to Heroku
        remote: 
        remote: Verifying deploy... done.
        To https://git.heroku.com/post-nestjs24hour.git
        * [new branch]      HEAD -> master

      ```
    - 07:38 Create base images route 
      - mkdir src/image
      - $ npx nest g service image --no-spec
      - $ npx nest g controller image --no-spec 
    - 08:13 install @nestjs/axios => https://docs.nestjs.com/techniques/http-module
      ```
      npm i --save @nestjs/axios
      ```
      - https://www.youtube.com/watch?v=hHBDcbI6EVA 
      - https://flaviocopes.com/axios-send-authorization-header/
    - 08:47 Break, PLDT tech outside 
    - 11:13 Resume, while waiting from PLDT call for new FIBER line
    - 12:03 Break, cooking lunch
- 2022.May.25 
  - 10:59 - Refactor images/ controller using "pipe"
    ``` 
    // Old Code:
    @Get()
    @HttpCode(HttpStatus.OK)
    async getImages(@Query('limit', limit) limit: number=this.min_limit): Promise<any>{
      const allowed_limit = Number(limit >= this.max_limit ? this.max_limit : limit);
      if(isNaN(allowed_limit)) throw new ForbiddenException('Error: [limit] should be a number. Example: limit=6');
      return await this.imageService.getImages(limit);
    }


    // New Code: Refactor, using pipe
      @Get()
      @HttpCode(HttpStatus.OK)
      async getImages(@Query('limit', ParseIntPipe) limit: number=this.min_limit): Promise<any>{
        return await this.imageService.getImages(limit);
    }

    ```
  - 11:20 - Get random images from Pexels, by manupulating page & per_page query string.
  - 18:00 - Wiring Cloudinary
    - $ npm install cloudinary
    - $ npm i -D @types/multer
    - $ npm install streamifier
  - 18:56 - Wired Cloudinary
- 26.May.2022
  - 09:08 Wiring Prima
    - $ npm install prisma --save-dev
    - $ npx prisma
    - $ npx prisma init
    - Adjust prisma>schema.prisma
    - $ npx prisma migrate dev --create-only || $ npx prisma migrate dev --name init
    - $ npx prisma db push
    - $ docker inspect <ID> => "IPAddress": "172.18.0.2",
  - 09:51 Wiring Prisma Client
    - $ npx nest g module prisma --no-spec
    - $ npx nest g service prisma --no-spec
  - 10:02 Auth Routes
    - $ npx nest g module auth --no-spec
    - $ npx nest g service auth --no-spec
    - $ npx nest g controller auth --no-spec
    - $ npm i --save class-validator
  - 15:37 Authentication : JWT function => https://docs.nestjs.com/security/authentication#authentication
    - $ npm i --save @nestjs/passport
    - $ npm i --save @nestjs/jwt passport-jwt
    - $ npm i -D @types/passport-jwt
  - 20:59 Wiring Event 
    - $ npx nest g service sendgrid --no-spec
    - $ npm i @nestjs/config @sendgrid/mail
    - $ npm i @nestjs/event-emitter --force
    - SendGrid account => Your account is temporarily under review and could not sent an email
    - $ git push heroku HEAD:master 
- 27.May.2022
  - Redeploying to heroku with pg
  - Point .env to heroku pg
  - $ npx prisma db push
    ```
    $ npx prisma db push
    Environment variables loaded from .env
    Prisma schema loaded from prisma/schema.prisma
    Datasource "db": PostgreSQL database "d27gh8pj0oae2f", schema "public" at "ec2-3-228-235-79.compute-1.amazonaws.com:5432"

    🚀  Your database is now in sync with your schema. Done in 9.06s

    ✔ Generated Prisma Client (3.14.0 | library) to ./node_modules/@prisma/client in 102ms
    ```


## Support
Just buzz the author.

## Stay in touch

- Author - [biboy/caIsBack](https://github.com/biboyatienza)
