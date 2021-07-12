<h1>To run the project:<h1/>
  
<br/>
Please open front-end and back-end in seperate IDE projects. (For example on Intellij: after opening one of back-end or front-end, easy way of opening the other one is: file->open->open in new window 
 
<br/>
  
Run database:
move to hsqldb>
execute 
<br/>
java -classpath lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:hsqldb/demodb --dbname.0 testdb

After database starts, move to hsqldb>bin and double click runManagerSwing.bat
On the pop-up set url to jdbc:hsqldb:hsql://localhost/testdb

Now you can query existing data in the database

<br/>

For back-end, run BackEndApplication.java
<br>
For front-end, execute "npm start" in command line

 <br/>
 go to localhost:3000
