# README

## Prerequisite
- Postgres 12
- Rails 6.1.5
- ruby 3.0.2p107
- A super user in postgres


## Installation:
1. Pull repo
2. Create a postgres superuser
   * sudo -u postgres psql`
   * Run this query to create a superuser`CREATE USER username SUPERUSER PASSWORD 'passwordstring';`
   * Restart postgres
4. Export `POSTGRES_PASSWORD` and `POSTGRES_USERNAME` associated with your postgres superuser from shell configuration file
5. Run the command `bundle install`
6. Run the command `yarn install`
7. Run the command `npm install`
8. Make sure that there is no leftover database by running `rails db:drop`
9. Create and add data to the database using `rails db:create` and `rails db:migrate`
10. Then run `rails db:seed` to create the first admin user. This user's credentials are: email: `admin.1@osu.edu` and password `admin123`

## How to run
1. Run the webpack dev server by running `bin/webpack-dev-server` in the root directory of the app
2. Run the app by running `rails s`
3. Go to localhost:3000/ on firefox

## Functionality
- General Functionality
  1. All users can view the course catalog and filter it accoring to course number, term offered, and class level
  2. All users can view their profile by pressing the `Profile` button in the top right
  3. All users can log out of their accounts with the `Logout` button in the top right

- Admin
  1. Able to refresh the course catalogue by pressing the `Restore Courses` button at the bottom of the dashboard
  2. Assign graders to specific sections by pressing the `Assign Graders` button in the top right
  3. Approve new instructors and admins by pressing the `Approve Users` button in the top right
  4. Add new courses to the catalogue with the `Add Course` button above the courses
  5. Edit current courses by pressing the `Edit` button next to each course

- Instructor
  1. Instructors can recommend specific student graders with the `Make Recommendation` button in the top right
  2. In the student reccomendation screen they can recommend students for specific classes and request the student for their section by first expanding the student entry and then their class entries

- Student
  1. Submit an application for grading by pressing `Start Grader Application` in the top right
  2. After submitting an application they can edit it by pressing `Edit Grader Application` in the top right 
