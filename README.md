<h1>To run the project:<h1/>
  
<br/>
  <br/>
Please open front-end and back-end in seperate IDE projects. (For example on Intellij: after opening one of back-end or front-end, easy way of opening the other one is: file->open->open in new window 
 
<br/>
  <br/>
  
Run database:
move to hsqldb folder then run the following command: 
<br/>
  <br/>
java -classpath lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:hsqldb/demodb --dbname.0 testdb
<br/>
  <br/>
After database starts, move to hsqldb>bin and double click runManagerSwing.bat
On the pop-up set url to jdbc:hsqldb:hsql://localhost/testdb
<br/>
  <br/>
Now you can query existing data in the database
<br/>
  Please run below queries:
create table STUDENT
(
    ID           BIGINT not null
        primary key,
    CITY         VARCHAR(255),
    DESCRIPTION  VARCHAR(255),
    DISTRICT     VARCHAR(255),
    NAME         VARCHAR(255),
    PHONE_NUMBER VARCHAR(255),
    SURNAME      VARCHAR(255),
    FILE  	VARCHAR(2000)
);
 
  <br/>
  
create table CITY_DISTRICT
(
CITY VARCHAR(200),
DISTRICT VARCHAR(200)
);
  
  <br/>
  
 


<br/>
<br/>
For back-end, run BackEndApplication.java
<br>
  <br/>
For front-end, execute "npm start" in command line
<br/>
 <br/>
 After these steps, please go to localhost:3000
