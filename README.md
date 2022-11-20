Installation and Usage Guide 

3.1. Installation

3.1.1 NodeJS and NPM

Start off by installing the latest stable versions of NodeJS and NPM. The following versions of NodeJS and NPM are recommended for effective usage of the application:
- Node Version: v16.17.0
- NPM Version: 8.15.0
Download Node from: https://nodejs.org/en/. Installing the correct Node version will also install the correct npm version. You can verify versions by running node -v and npm -v. 

3.1.2 git

After installing these, download the latest version of git for application management.
Download git from: https://git-scm.com/downloads.

3.1.3 Clone application from Github
With git installed, we can now clone the application codebase on our local machines.
Majirical Code Repository (please ensure relevant access permissions): https://github.com/unsw-cse-comp3900-9900-22T3/capstone-project-3900-m10b-majirical.
Then, clone the application through the SSH method by running:
- git clone git@github.com:unsw-cse-comp3900-9900-22T3/capstone-project-3900-m10b-majirical.git


Note:
The application should now be cloned successfully. If there are any permission errors during cloning, please ensure your computer’s ssh public key is added to your profile on Github and that you have the relevant access permissions for Majirical’s project repository.

Aside:
If you are getting any errors related to xcrun upon using the git clone command, run the following command to download command line tools for successful usage of git commands in terminal:
- xcode-select –install

If the above does not run or work, run the following command instead:
- sudo xcode-select –reset

3.1.4 Installing frontend packages

After successful cloning, go into the project repository on your preferred terminal by running:
- cd capstone-project-3900-m10b-majirical

And then run:
- npm install

To install all relevant frontend packages needed for the application. You should now be able to see the packages being installed in your local repository from your terminal. The downloading and installing should approximately take ~ 2 minutes.

3.1.5 Installing python3 and pip3

Install python3 and pip3 to run the backend code and install python packages respectively. Please download the following recommended versions of python and pip:
- Python: 3.10.7
- Pip: pip 22.2.2

3.1.6 Installing backend packages

Let’s now install the relevant backend packages by running the following three commands:
- pip3 install python-dotenv
- pip3 install flask
- pip3 install flask_cors

3.2. Running the Application

We are now ready to run the application. Start off by opening two terminals. In the first terminal run:
- python3 -m flask run

to start the backend. Then run the following command in the second terminal:
- npm start

to start the frontend. You should now be able to see the frontend of the application after brief loading on your preferred browser.
