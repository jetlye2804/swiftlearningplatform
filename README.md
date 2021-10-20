# Swift Learning Platform
This is the project folders for my final year project in UTAR, which is an Interactive Swift learning platform for iOS Application development. The final year project started from January 2021 and ended on September 2021.

## Features provided in this platform
For students/normal user:
* View Swift Programming Language materials with 8 topics
* Do non-graded exercises with 7 questions or above per topic as a practice
* Do graded quiz with 10 multiple choice questions or above per topic to examine yourself about the proficiency for each topic
* Profile function to view own quiz attempt history, as well as the overall performance
* General chat room to chat with other users

For administrator/lecturer:
* Edit materials including topics, topic contents, exercises and graded quizzes
* Manage student/user account including register or delete student
* View student's quiz attempt history and overall performance
* General chat room to chat with other users

## Prerequisite
Since this project is using Laravel 8 as web application framework and ReactJS as frontend, therefore you will need to have:
* Composer, which can be downloaded from here - https://getcomposer.org/
* Node.js, which can be downloaded from here - https://nodejs.org/en/
* WampServer, which can be downloaded from here - https://www.wampserver.com/en/

If you had installed these three softwares, just ignore the installation steps.

For Node.js, download 14.8.1 LTS version, and install node by using the command line below:
```
npm install -g npm
```

For Composer, install PHP 7.3.0 or above, and install Laravel by using the command line below:
```
composer global require laravel/installer
```

For WampServer, once you installed it, open phpMyAdmin and choose MySQL as the database.
Create the database as "fyp" and choose ```utf8mb4_unicode_ci``` as collation. Then, import the fyp.sql file into the database.

## Modify the project folder
Extract the compressed file.

Since the frontend part (ReactJS) has been compiled into production mode, therefore there is no ```node_modules``` in the project folder. However, if you wish to edit the frontend code, you may re-install the modules by using the command line below:
```npm install```

To compile the code every time, just type ```npm run dev``` and refresh the browser
