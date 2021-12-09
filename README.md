# Simple App Built with TypeORM


## Get started
Steps to run this project:
1. Run `docker-compose up-d` command

## Testing
1. Run `docker-compose up -d db` to start db
2. Run `yarn test` to run tests

## Endpoints
1. /api-docs - swagger
2. /admin - admin interface
3. /users/register - register and get token (POST)
4. /users/login - login and get token (POST, AUTHORIZED)
5. /records - crud (AUTHORIZED)
6. /images - Saves the image and stores link in db. (POST file, AUTHORIZED)
7. /images - lists the images for user. (GET, AUTHORIZED)

*Since swagger for routing-controllers does not support headers, you have to manually send token in header.
Authorization = token
NO NEED TO APPEND PREFIX JWT OR BEARER
*
