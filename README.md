# Bug-Tracker

## Website Url

https://cody-price-bug-tracker.herokuapp.com/

## Download and run locally

1. Download this project into an empty or parent folder.

2. If you do not have Postgres installed on your local machine do so from here -- https://www.postgresql.org/download/

3. Access your local Postgres database, then run all the commands found inside the databse.sql file in the root directory of this project (in order) to set up the database

4. Replace my Postgres database account information with your own inside the db.js file in the root directory (Bug-Tracker)

5. Add the following to package.json inside the client directory -- "proxy": "http://localhost:5000"

6. Maneuver to this project's client directory (Bug-Tracker\client) using a command line or terminal

7. Run the following command (while in the client directory) -- npm install

8. Maneuver to this project's root directory (Bug-Tracker) using a command line or terminal

9. Run the following command (while in the root directory) -- npm install

10. Run the following command (while still in the root directory) -- npm run devNodemon

## When editing project

In order for any changes to scss files to be compiled and updated in the styles.css file:

1. Maneuver to this project's CSS directory (Bug-Tracker\client\src\CSS) using a command line or terminal

2. Run the following command (while in the CSS directory) -- sass ./styles.scss ./styles.css --watch

Now any changes to scss files will be updated in style.css as long as the scss file is imported into styles.scss use @use

## Resources

*Online documentation:*  https://docs.google.com/document/d/1BlHjQvvfOXVDNEIT2mN0ByrDdnAvi45PIcieytp2D_E/edit?usp=sharing