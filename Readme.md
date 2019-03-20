# Java Notebook

Thanks to this amazing projet, you can code in your favorite programming language ever (java :tada:) directly in your browser!!! The simple and intuitive UI will leave you wondering why you ever thought jupyter was cool in the first place! This is the tool you never new you needed and which will change your programming life!

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
This will launch a docker with a bdd inside. The database used is mysql. Therefore you will need to have installed mysql and a mysql client in your local environment for everything to run smoothly. 

If you are on macOS, you can install mysql easily with Homebrew[https://brew.sh/], after installing homebrew, just use the following command and you'll be good to go:
```
brew install mysql
```
For Debian based linux distributions, you'll want to run the following commands to install mysql and all of its dependencies:
```
sudo apt-get update  
sudo apt-get install mysql-server
```

Good luck if you're running windows ...

To stop it after use run: `docker-compose down`
  
**Javanotebook-front** contains the front-end code. A react & typescript app.  
To install and run the frontend app locally:  
```
npm install  
npm start  
```  

**Build Docker image of the back for deployment**

```
cd javanotebook
mvn package -Dmaven.test.skip=true
docker build -t docker-java-notebook .
```

## Using the app  
Once you have everything up and running, you can connect to the application with `http://localhost:3000` or another port if you have changed the default one in the code.
You will then be able to create and use as many notebooks as you want. Each one comunicates with an independant JShell, so the code of each notebook will be executed independantly. If you want to pass code between your notebooks, you can save the contents of a cell and load it in the other notebook.

