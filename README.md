To run the project:

Run database:
move to hsqldb>
execute 
<br/>
java -classpath lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:hsqldb/demodb --dbname.0 testdb

After database starts, move to hsqldb>bin and double click runManagerSwing.bat
On the pop-up set url to jdbc:hsqldb:hsql://localhost/testdb

Now you can query existing data in the database
