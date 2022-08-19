# Voice controlled Search tool for Twitter Spaces on Desktop / Web

The application will enable users to search for Twitter Spaces with voice control on browser in Desktop using Twitter API v2 (Search Spaces) and Azure Speech to text Service
.

Application gets input from user via voice command, which gets converted from speech data to text data and searches for Twitter Spaces then generates Twitter links to view Twitter spaces on browser in Desktop.

Block Diagram
--------------

![Untitled Diagram drawio](https://user-images.githubusercontent.com/63070727/185543141-f2925ce6-02f4-4663-9694-0430d7949667.png)

How to Access the application from Anywhere on Earth?
------------------------------------------------------

Access the application on Internet 
**Enter the Public IP on browser** - **http://20.204.139.69/**

How to run the application locally?
-----------------------------------

Follow the steps

1. **Clone the application locally (link - https://github.com/saravana-ganesh12/SpacesApplication.git)** - For Downloading the code to your machine

2. **Run command "npm install"** - For Installing dependencies

3. **Run command "npm start"** - For Running the application

+ The **React** Frontend will run on - **http://127.0.0.1:3000/**

+ The **Express** Backend will run on - **http://127.0.0.1:3001/**

Technology Stack
----------------
The application based on Javascript which runs on Node JS runtime.

+ **Frontend** - React JS

+ **Backend (*API Server*)** - Express JS

+ **Other APIs** - Twitter APIv2 (Search Spaces) and Azure Speech Service (Speech to text) 

API Authorization
-----------------

+ **Twitter APIv2** - Outh2.0 with PKCE code

+ **Azure Speech Service** - API Key



