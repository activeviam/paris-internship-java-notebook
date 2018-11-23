# Java Notebook

This project is split in two parts:  
- javanotebook
- javanotebook-front

**Javanotebook** contains the backend server code. It will receive the code from the front end, pass it to a jshell and then return the response to the web interface.  
To install and run the backend code locally:  
```  
mvn install  
mvn
```

**Use docker to run a bdd during dev**

```
cd javanotebook/docker
docker-compose up
```
This will launch a docker with a bdd inside.

To stop it after use run: `docker-compose down`
  
**Javanotebook-front** contains the front-end code. A react & typescript app.  
To install and run the frontend app locally:  
```
npm install  
npm start  
```


