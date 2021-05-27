# Vehicle-Management-Sample-App
Vehicle Detail Management System with Excel and CSV file upload capabilities and basic CRUD operations. Developed using Angular as frontend, Nest JS as backend, PostgreSQL as the database and GraphQL to query data from our backend APIs.

### Deployment Steps
* Enter your PostgreSQL **username** and **password** inside **vehicle-management-backend/src/ormconfig.ts** file and create a **database** called **vehicle_db**.
* Redis must be active and running on **127.0.0.1:6379** (localhost port 6379).
* Then go inside the **vehicle-management-backend folder** and run following commands;
    * npm install
    * npm run start:dev
* After that go inside the **vehicle-management-frontend** folder and run following commands;
    * npm install
    * ng serve
* If you are getting **Postgres date/time out of range** error, run the folowing query;
 ```diff
    - ALTER DATABASE vehicle_db SET datestyle TO "ISO, MDY".
 ```
    
