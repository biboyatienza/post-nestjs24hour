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

## Scenario Testing on [Heroku](https://post-nestjs24hour.herokuapp.com/)
1. Create a user as ADMIN
  ```
  POST https://post-nestjs24hour.herokuapp.com/auth/register
  Content-Type: application/json

  {
    "email": "biboyatienza@gmail.com",
    "password": "Pass@word1",
    "role": "ADMIN"
  }

  Result:
    HTTP/1.1 201 Created
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 202
    Etag: W/"ca-+IkS9g70Ono8QfGig6FC9wWm/qU"
    Date: Mon, 30 May 2022 08:30:14 GMT
    Via: 1.1 vegur

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1Mzg5OTQxNCwiZXhwIjoxNjUzOTAwMzE0fQ.I0tVrf9-zMIGplpOch6szNOyur1UKeLl0cWqh61Ysg8"
    }
  ```
2. Login User as ADMIN, using email and password
  ```
  POST https://post-nestjs24hour.herokuapp.com/auth/login
  Content-Type: application/json

  {
    "email": "biboyatienza@gmail.com",
    "password": "Pass@word1"
  }

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 202
    Etag: W/"ca-eH3UcA0Y4rwq4XkO6dIWPIoNdJQ"
    Date: Mon, 30 May 2022 08:31:38 GMT
    Via: 1.1 vegur

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1Mzg5OTQ5OCwiZXhwIjoxNjUzOTAwMzk4fQ.2LNtXHPZMnTd2onwHcDodDcOyTwNz6RPybJ5xthbzAI"
    }
  ```
3. User request for password-reset
  ```
  POST https://post-nestjs24hour.herokuapp.com/auth/password-reset
  Content-Type: application/json

  {
    "email": "biboyatienza@gmail.com"
  }

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 326
    Etag: W/"146-1Ds4S0Hj0l73JSf9OyKCBcczxM8"
    Date: Mon, 30 May 2022 08:32:46 GMT
    Via: 1.1 vegur

    {
      "request_created": true,
      "password_reset_token": "$2b$10$eqYWs7KRL9cpTg0M/XfvAOQHKqYNbavdr0yghkPuZzM7JCtmQ4RIC",
      "info": "Since my SENDGRID account is 'Your account is temporarily under review. Please contact Support to regain access. I'll just return the password_reset_token here, until my SENDGRID account is back to normal.'"
    }
  ``` 
4. User change current password
  ```
  POST https://post-nestjs24hour.herokuapp.com/auth/password-new
  Content-Type: application/json

  {
    "password_reset_token": "$2b$10$eqYWs7KRL9cpTg0M/XfvAOQHKqYNbavdr0yghkPuZzM7JCtmQ4RIC",
    "new_password": "NEW-Pass@word1"
  }

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 202
    Etag: W/"ca-GNVmiUHxVt6ciE2/3lr3pjbtMqQ"
    Date: Mon, 30 May 2022 08:34:48 GMT
    Via: 1.1 vegur

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1Mzg5OTY4OCwiZXhwIjoxNjUzOTAwNTg4fQ.HN1vCqErRSrF4BajUE4B7juNhnAdzN_G01PTqwcZ6uk"
    }
  ```
5. User as ADMIN, GET 3 images
  ```
  GET https://post-nestjs24hour.herokuapp.com/images/?limit=3
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1Mzg5OTY4OCwiZXhwIjoxNjUzOTAwNTg4fQ.HN1vCqErRSrF4BajUE4B7juNhnAdzN_G01PTqwcZ6uk

  HTTP/1.1 200 OK
  Server: Cowboy
  Connection: close
  X-Powered-By: Express
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Content-Length: 362
  Etag: W/"16a-J8V213d8VFlPF5QsETNKMEbH54E"
  Date: Mon, 30 May 2022 08:45:14 GMT
  Via: 1.1 vegur

  Results:
    {
      "limit": 3,
      "data": [
        {
          "hits": 1,
          "uri": "https://res.cloudinary.com/dhcnbaqsl/image/upload/v1653900311/bkvw9trkxojvrv5ws8qu.jpg",
          "id": 11
        },
        {
          "hits": 1,
          "uri": "https://res.cloudinary.com/dhcnbaqsl/image/upload/v1653900312/lgdtbls0ivihh3czboij.jpg",
          "id": 12
        },
        {
          "hits": 1,
          "uri": "https://res.cloudinary.com/dhcnbaqsl/image/upload/v1653900314/hwhuxi5uik4dpxoftkhs.jpg",
          "id": 13
        }
      ]
    }

  ```
6. User as ADMIN, GET images 11, should increase hits by 1
  ```
  ### ADMIN : GET images/11
  GET https://post-nestjs24hour.herokuapp.com/images/11
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1Mzg5OTY4OCwiZXhwIjoxNjUzOTAwNTg4fQ.HN1vCqErRSrF4BajUE4B7juNhnAdzN_G01PTqwcZ6uk

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 113
    Etag: W/"71-gTtl4tLtkmIM9ZlV9cUjHe+35uQ"
    Date: Mon, 30 May 2022 08:46:39 GMT
    Via: 1.1 vegur

    {
      "id": 11,
      "hits": 2,
      "uri": "https://res.cloudinary.com/dhcnbaqsl/image/upload/v1653900311/bkvw9trkxojvrv5ws8qu.jpg"
    }
  ``` 
7. User as ADMIN, PATCH images 12, hits to 13 and a new uri
  ```
  ### ADMIN : PATCH images/12
  PATCH https://post-nestjs24hour.herokuapp.com/images/12
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1Mzg5OTY4OCwiZXhwIjoxNjUzOTAwNTg4fQ.HN1vCqErRSrF4BajUE4B7juNhnAdzN_G01PTqwcZ6uk

  {
    "hits": 13,
    "uri": "https://bitcoin.org/img/icons/logotop.svg"
  }

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: text/html; charset=utf-8
    Content-Length: 4
    Etag: W/"4-X/5TO4MPCKAyY0ipFgr6/IraRNs"
    Date: Mon, 30 May 2022 08:47:57 GMT
    Via: 1.1 vegur

    true
  ```
8. User as ADMIN, GET images 12 to see the changes, hits should be 13 + 1
  ```
  GET https://post-nestjs24hour.herokuapp.com/images/12
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1Mzg5OTY4OCwiZXhwIjoxNjUzOTAwNTg4fQ.HN1vCqErRSrF4BajUE4B7juNhnAdzN_G01PTqwcZ6uk

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 69
    Etag: W/"45-2nj1acAWqgOIV052fWgCFma0kGI"
    Date: Mon, 30 May 2022 08:48:41 GMT
    Via: 1.1 vegur

    {
      "id": 12,
      "hits": 14,
      "uri": "https://bitcoin.org/img/icons/logotop.svg"
    }
  ```
9. Login as USER, caisback@outlook.com  
  ```
  POST https://post-nestjs24hour.herokuapp.com/auth/login
  Content-Type: application/json

  {
    "email": "caisback@outlook.com",
    "password": "NewPass@word123"
  }

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 199
    Etag: W/"c7-nLuKCZiHt3ieZkEsBc4rd29w4IU"
    Date: Mon, 30 May 2022 08:49:58 GMT
    Via: 1.1 vegur

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiY2Fpc2JhY2tAb3V0bG9vay5jb20iLCJpYXQiOjE2NTM5MDA1OTgsImV4cCI6MTY1MzkwMTQ5OH0.5zOglxiu-mnc5bGWLpdRG5ntNzHn3FyI38PAtKYL094"
    }
  ```
10. USER(caisback@outlook.com) GET 1 image with id of 15
  ```
  GET https://post-nestjs24hour.herokuapp.com/images/?limit=1
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiY2Fpc2JhY2tAb3V0bG9vay5jb20iLCJpYXQiOjE2NTM5MDA1OTgsImV4cCI6MTY1MzkwMTQ5OH0.5zOglxiu-mnc5bGWLpdRG5ntNzHn3FyI38PAtKYL094

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 134
    Etag: W/"86-YK8c9zk7iPW4A66UNoGLXqVBjL4"
    Date: Mon, 30 May 2022 09:02:52 GMT
    Via: 1.1 vegur

    {
      "limit": 1,
      "data": [
        {
          "hits": 1,
          "uri": "https://res.cloudinary.com/dhcnbaqsl/image/upload/v1653901371/lr9usaycuc6amsbmodzf.jpg",
          "id": 15
        }
      ]
    }
  ```
11. Login ADMIN user to Delete image with id 15 of USER(caisback@outlook.com)
  ```
  POST https://post-nestjs24hour.herokuapp.com/auth/login
  Content-Type: application/json

  {
    "email": "biboyatienza@gmail.com",
    "password": "NEW-Pass@word1"
  }

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 202
    Etag: W/"ca-aF8btMqoLyoW1zG1PXTr1onv52o"
    Date: Mon, 30 May 2022 09:07:38 GMT
    Via: 1.1 vegur

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1MzkwMTY1OCwiZXhwIjoxNjUzOTAyNTU4fQ.7nBmyRSSKoYP4oz67D5-upo1zSosLMSUtdb0KdgT6lE"
    } 
  ```
12. ADMIN user now deleted image 15 of USER(caisback@outlook.com)
  ```
  DELETE  https://post-nestjs24hour.herokuapp.com/images/15
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1MzkwMTY1OCwiZXhwIjoxNjUzOTAyNTU4fQ.7nBmyRSSKoYP4oz67D5-upo1zSosLMSUtdb0KdgT6lE

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: text/html; charset=utf-8
    Content-Length: 4
    Etag: W/"4-X/5TO4MPCKAyY0ipFgr6/IraRNs"
    Date: Mon, 30 May 2022 09:08:31 GMT
    Via: 1.1 vegur

    true
  ```
13. USER (caisback@outlook.com) wants to view his image 15, but no avail since this is now soft-deleted and only ADMIN user can view it.
  ```
  GET  https://post-nestjs24hour.herokuapp.com/images/15
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiY2Fpc2JhY2tAb3V0bG9vay5jb20iLCJpYXQiOjE2NTM5MDE4ODgsImV4cCI6MTY1MzkwMjc4OH0.mDxDhIKkQaXVQJ2CWokuJ8v24vmDFaKe3VFKfT_xuLE

  Result:
    HTTP/1.1 403 Forbidden
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 68
    Etag: W/"44-1JQhH+ckfFmCFAl6VpkMxC3LLQo"
    Date: Mon, 30 May 2022 09:11:44 GMT
    Via: 1.1 vegur

    {
      "statusCode": 403,
      "message": "Image not exists.",
      "error": "Forbidden"
    }
  ```
14. Finally, ADMIN User wants to view soft-delete image 15 of USER (caisback@outlook.com)
  ```
  GET  https://post-nestjs24hour.herokuapp.com/images/15
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYmlib3lhdGllbnphQGdtYWlsLmNvbSIsImlhdCI6MTY1MzkwMTY1OCwiZXhwIjoxNjUzOTAyNTU4fQ.7nBmyRSSKoYP4oz67D5-upo1zSosLMSUtdb0KdgT6lE

  Result:
    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: close
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 113
    Etag: W/"71-Cn186+7rF5j1mU322/g/CVVSnGA"
    Date: Mon, 30 May 2022 09:12:39 GMT
    Via: 1.1 vegur

    {
      "id": 15,
      "hits": 3,
      "uri": "https://res.cloudinary.com/dhcnbaqsl/image/upload/v1653901371/lr9usaycuc6amsbmodzf.jpg"
    }
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

    ????  Your database is now in sync with your schema. Done in 9.06s

    ??? Generated Prisma Client (3.14.0 | library) to ./node_modules/@prisma/client in 102ms
    ```
  - While at 10-ReDeploying2Heroku > $ git push heroku HEAD:master
  - npx ts-node src/foo.ts
- 30.May.2022 15:59
  - Solved issue with Observables x async/await
  - all images route now working ok
- 31.May.2022 20:23
  - Update NestJs to latest
    - $ npm install -g @nestjs/cli npm-check-updates
    - $ nest update --force
    - Open NestJs project
      - $ npm-check-updates "/@nestjs*/" -u
      - $ npm-check-updates "/nestjs*/" -u    
      - $ npm install

## Support
Just buzz the author.

## Stay in touch

- Author - [biboy/caIsBack](https://github.com/biboyatienza)
