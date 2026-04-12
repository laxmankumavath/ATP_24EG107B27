first start with database schema

2
1.user type
2.article


generate package.json
npm init -y


create .env file


create express application and set port number
connect to database

define schema and create models
    -usertypeschema
    firstname
    lastname
    email
    password
    role
    profileimageurl
    isuseractive

    -article schema
    author,
    title
    category
    content
    comment
    isarticleactive


create apis
admin,author,user

create common api for register , login, logout