# Vehicle-Management-Sample-App
<p>Vehicle Detail Management System with Excel and CSV file upload capabilities and basic CRUD operations. Developed using Angular as frontend, Nest JS as backend, PostgreSQL as the database and GraphQL to query data from our backend APIs.</p>
<br/>

## Architecture Diagram (upto to current progress)

<img src="https://i.ibb.co/dDPWyxM/VMS-Architectural-Diagram.jpg" alt="VMS-Architectural-Diagram" border="0">
<p  align="center">Figure 1: Architecture Diagram</p>
<br/>

### Progress Details
* File upload functionality in Angular.✅
* Processing uploaded file using Redis Queue in NestJS.✅
* Write processed file deatils to PostgreSQL database.✅
* Setup Postgraphile(GraphQL + PostgreSQL) Server pointing to our database.✅
* Use Apollo Client in Angular to perform Read, Update and Delete functionalities.✅
* Pagination and Searching Records.✅
* WebSocket implementation.✅
* Docker deployment.(currently working on....)📝👨‍💻

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
 
* After that go inside the **postgraphile-server** folder and run following commands;
    * npm install
    * Enter your PostgreSQL **username** and **password** inside **postgraphile-server/main.js** file
    * node main.js

* After that go inside the **websocket-server** folder and run following commands;
    * npm install
    * Enter your PostgreSQL **username** and **password** inside **websocket-server/src/ormconfig.ts** file
    * npm run start:dev

