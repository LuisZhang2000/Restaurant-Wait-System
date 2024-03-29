# Installation and Usage Guide

## NodeJS and NPM

Installing the latest stable versions of NodeJS and NPM. The following versions of NodeJS and NPM are recommended for effective usage of the application:
- Node Version: v16.17.0
- NPM Version: 8.15.0
Download Node from: https://nodejs.org/en/. Installing the correct Node version will also install the correct npm version. You can verify versions by running node -v and npm -v. 

## git

Download the latest version of git for application management https://git-scm.com/downloads.

## Clone application from Github

Clone the application through the SSH method by running:
- git clone git@github.com:LuisZhang2000/Restaurant-Wait-System.git

## Installing frontend packages

After cloning, go into the project repository on your terminal and run:
- npm install

This will install all relevant frontend packages needed for the application. You should now be able to see the packages being installed in your local repository from your terminal. This should take approximately 2 minutes.

## Installing python3 and pip3

Install python3 and pip3 to run the backend code and install python packages respectively. Download the following recommended versions of python and pip:
- Python: 3.10.7
- Pip: pip 22.2.2

## Installing backend packages

Install the required backend packages by running the following commands:
- pip3 install python-dotenv
- pip3 install flask
- pip3 install flask_cors

# Running the Application

We are now ready to run the application. Start off by opening two terminals. In the first terminal, navigate to the backend folder and run the command below to start the backend:
- python3 -m flask run (on Mac/Linux)
- python -m flask run (on Windows)

If python is not recognised, use "py" instead of "python" and vice versa

Then in the second terminal, run the following command in the root folder to start the frontend:
- npm start

You should now be able to see the frontend of the application after brief loading on your preferred browser.

# Screenshots

Customer Screen

![image](https://github.com/LuisZhang2000/Restaurant-Wait-System/assets/42627737/918ed461-e10b-4fd4-9071-5f487b604455)

Wait Staff Screen

![image](https://github.com/LuisZhang2000/Restaurant-Wait-System/assets/42627737/cb74c9c7-9b2b-4703-8d5f-63f9d222b028)

Kitchen Staff Screen

![image](https://github.com/LuisZhang2000/Restaurant-Wait-System/assets/42627737/0b0ca37f-12fc-4554-bdf5-9caec1f5ceea)

Manager Staff Screen

![image](https://github.com/LuisZhang2000/Restaurant-Wait-System/assets/42627737/845261e0-9e29-4d2d-9863-6ba0be8273bc)



