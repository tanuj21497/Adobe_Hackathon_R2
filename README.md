## Documentation of code

**Some important information**

Comments are also added in the Code of server.js.      Please also add -o “filename” in the curl request and run it in that directory where you want to save it.

1. **How code is working:**

   **It has these parts:**

1. Starting the Server
1. Getting the required Credentials
1. Getting the Required Data as JSON file
1. Modifying the JSON Data according to API Input
1. Giving Document API Input and credentials to get PDF file in the result
1. Cleaning the Already existing PDF with merged\_document.pdf name
1. Storing the PDF file in local storage
1. Responding with that PDF file
1. Deleting that pdf file
1. Error handling of 400, 401, 404, 500 Error Codes
2. **What was be the Problems and how they are solved?**

   **First Problem:** result.writeTostream not working for response although response is itself a writable stream.

   **Solution:** So I used saveAsfile function.

   **Second Problem:** Saving in local Storage results in problem in Multiple requests

Solution: I used Mutex lock to get Atomicity so that only one PDF will get formed and then deleted. And No two users response will be conflicting.

**Third Problem:** Private data storing for saving it in local storage, that user may question.

**Solution:** It will get solved once writeTostream Function starts           working on Response object as well, then it will directly write to response   stream and no private data storing. Although my code is going to delete it at last. But This will be the best option, which I suggested in previous lines.

**Fourth Problem:** Handling Multiple Requests, But Adobe API is having timeout of 10 seconds.

**Solution:** When there will be many users, the timeout will get reached, as I am also setting a timeout of 3 seconds for correctly saving a PDF file. I can’t change that ADOBE API timeout from here. But will definitely do if I get selected and get access to it. Really eager to work on these projects more. These are FUN :)



## How to run my files

![](Aspose.Words.32a6baa0-123e-4933-9c1d-f2e19c5d49e4.001.png)
![Aspose Words 32a6baa0-123e-4933-9c1d-f2e19c5d49e4 001](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/288ce4bd-2ea5-49f5-bbdb-af153bd9812e)

**Resume Builder API only using CURL (Without UI):**

1. Open with code provided folder,

   **server.js is my server side API main code(RUN THIS TO CHECK WORKING)**

   **Public folder contains html css and javascript.**

2. DO npm init

   and

   Satisfy requirement of these:

   Firstly use this command npm init<br>

   ![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/0ac2279a-de87-4acf-9c1c-d4867d3b757b)

   const express = require('express');

   var app = require('express')();

   const Mutex = require('async-mutex').Mutex;

   var bodyParser = require('body-parser');

   const PDFServicesSdk = require('@adobe/pdfservices-node-sdk'); const fs = require('fs');

   Using: npm install express, and same with other.

   I have not used nodemon so if you try to change something in file, change and re-run server.js.

3\.

Use for adobe pdf service npm install --save @adobe/pdfservices-node-sdk

4. Now Run server.js using: node server.js
4. Now Open your Git Bash(If in windows), Normal Terminal(for Linux, mac users). **Curl command do not work in Windows Command Prompt etc**
4. Change the directory where you want to save your resume using cd command.
4. Copy the whole command with data etc and Paste it in Git Bash. Enter it. Remember to add “-o merged\_document.pdf” or any file name in CURL command. So that **Resume will get downloaded with that file name**.

Please See 2nd page for UI working

**Resume Builder API (With UI website):**

1. Open server.js in provided folder
1. Satisfy requirement of these:

   ![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/79c3f4a6-6c36-40b9-ba0b-f35e8f21be24)

   const express = require('express');

   var app = require('express')();

   const Mutex = require('async-mutex').Mutex;

   var bodyParser = require('body-parser');

   const PDFServicesSdk = require('@adobe/pdfservices-node-sdk'); const fs = require('fs');

   Using: npm install express, and same with other.

   I have not used nodemon so if you try to change something in file, change and re-run server.js.

3. Use for adobe pdf service npm install --save @adobe/pdfservices-node-sdk
3. Now Run server.js using: node server.js
3. Open your web browser. And type **localhost:8080** in the URL to see the **Website (Try not to use [127.0.0.1](http://127.0.0.1/) as it sometimes has issues in some computers although both mean same thing)**
6. Website will look like this:

   ![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/fa9d9d79-718a-4d1d-8d0f-4469b0079c41)


7. Click on Arrow buttons to see the types of templates.

   ![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/98229b89-6878-4ada-95d0-df91641b2fff)


8. Fill in All the details as all are required fields by clicking on light green buttons, Type “none” if you are not applicable to some fields.
9. Also use ADD buttons to add more Details:

   ![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/f9351fee-341c-4b28-b388-13bd53bb8993)


10. Submit button will be red until you fill all the details.

![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/a848574a-4b2c-4a9b-a641-88a6eb64f9d4)


11\.After Filling all the fields it will become green.

![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/0260c4fc-9f40-43fb-9dfa-1c4a055af770)


12. Now click it and it will start downloading, wait for 15-20 seconds, your **Resume will be downloaded as merged\_document.pdf**

    ![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/c24f9eb1-79a7-42be-8536-a98eeea56edf)


13. Click on it to view it.

![image](https://github.com/tanuj21497/Adobe_Hackathon_R2/assets/108824263/305c77fb-1ec3-4b39-b07b-eb802e3607f2)


