# Vehicle-Management-Sample-App
<p>Vehicle Detail Management System with Excel and CSV file upload capabilities and basic CRUD operations. Developed using Angular as frontend, Nest JS as backend, PostgreSQL as the database and GraphQL to query data from our backend APIs.</p>
<br/>

## Architecture Diagram (upto to current progress)

<img src="https://i.ibb.co/ng4cJTs/VMS-Architectural-Diagram.png" alt="VMS-Architectural-Diagram" border="0">
<p  align="center">Figure 1: Architecture Diagram</p>
<br/>

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
    * npm run postgraphile

* I have embedded the Postgraphile run commad inside **scripts : { }** tag of  **package.json file** as below since it is lengthy. Replace **username** and **password** in that command with your PostgreSQL credentails;
 ```diff
  "scripts": {
    "postgraphile": "npx postgraphile --cors -c \"postgres://<username>:<password>@localhost:5432/vehicle_db\" --watch"
  }
 ```

 - ![#1589F0](https://via.placeholder.com/15/1589F0/000000?text=+) `#1589F0`
 
