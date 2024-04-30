PROJECT NAME
  Jobs API
  
OVERVIEW
  An API created to handle the requests of user when creating a job, say putting out a job for people to see and apply, also getting all the jobs created by a specific user and seeing the
  number of application
  
FEATURES
  #  Express JS-- The project was built using the famous JavaScript Framework to handle user requests and give back appropriate response
  #  MONGOOSE, BCRYPTJS, EXPRESS-ASYNC-ERRORS -- This are packages which were used throughout the project, the first package was used to communicate with the database with no hassle and 
  return back resource requested, the second package for hashing the password before storing in the database to prevent attack on user credentials then the last is to beautifully handle
  errors and send back appropriate response back to the user, respectively.
  #  JSONWEBTOKENS -- This was used to protect certain route from illegal access and also control who can access such routes.

INSTALLATION
  Clone the repository
    git clone https://github.com/jibreelfahd/Jobs-API.git
  Navigate to the project directory
    cd Jobs-API
  Install dependencies
    npm install
  Spin up the server
    npm run dev

  CONTRIBUTION
    You can contribute to this project if there are any bug fixes and additional features to be added as you can fork this repo and open a pull request. 
