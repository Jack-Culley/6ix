# README

## Prerequisite
- Postgres 12
- Rails 6.1.5
- ruby 3.0.2p107
- A super user in postgres


## Installation:
1. Pull repo
2. Create a postgres superuser
   -`sudo -u postgres psql`
   -Run this query to create a superuser`CREATE USER username SUPERUSER PASSWORD 'passwordstring';`
   -Restart postgres
4. Export `POSTGRES_PASSWORD` and `POSTGRES_USERNAME` associated with your postgres superuser from shell configuration file
5. Run the command `bundle install`
6. Run the command `yarn install`
7. Run the command `npm install`
8. Create and add data to the database using `rails db:create` and `rails db:migrate`
9. Then run `rails db:seed` to create the first admin user. This user's credentials are: email: `admin@osu.edu` and password `admin123`
