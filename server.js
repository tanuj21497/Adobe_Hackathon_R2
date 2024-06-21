const express = require('express');
var app = require('express')();
const Mutex = require('async-mutex').Mutex;
var bodyParser = require('body-parser');
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');


const mutex = new Mutex();
// to modify json data according to required format by template
const modifier = (data) => {

    if (
        !data.personal_information ||
        !data.personal_information.name ||
        !data.personal_information.last_name ||
        !data.personal_information.email_address ||
        !data.personal_information.phone_number ||
        !data.personal_information.linkedin_url ||
        !data.job_title ||
        !data.career_objective ||
        !data.skills ||
        !data.education ||
        !data.experience ||
        !data.achievements
    ) {
        return null;
    }



    delete data.template_id;

    data.Name = data.personal_information.name;
    data.LastName = data.personal_information.last_name;
    data.EmailAddress = data.personal_information.email_address;
    data.PhoneNumber = data.personal_information.phone_number;
    data.LinkedIn = data.personal_information.linkedin_url;
    delete data.personal_information;

    data.JobTitle = data.job_title;
    delete data.job_title;
    data.Summary = data.career_objective;
    delete data.career_objective;
    data.Skills = data.skills;
    delete data.skills;

    data.Education = data.education;
    for (let i = 0; i < data.education.length; i++) {
        if (
            !data.education[i].school_name ||
            !data.education[i].passing_year ||
            !data.education[i].description
        ) {
            return null;
        }

        data.Education[i].SchoolName = data.education[i].school_name;
        data.Education[i].Year = data.education[i].passing_year;
        data.Education[i].Description = data.education[i].description;
        delete data.education[i].school_name;
        delete data.education[i].passing_year;
        delete data.education[i].description;

    }
    delete data.education;

    data.Experience = data.experience;
    for (let i = 0; i < data.experience.length; i++) {

        if (
            !data.experience[i].company_name ||
            !data.experience[i].passing_year ||
            !data.experience[i].responsibilities
        ) {
            return null;
        }

        data.Experience[i].CompanyName = data.experience[i].company_name;
        data.Experience[i].Year = data.experience[i].passing_year;
        data.Experience[i].Description = data.experience[i].responsibilities;
        delete data.experience[i].company_name;
        delete data.experience[i].passing_year;
        delete data.experience[i].responsibilities;

    }
    delete data.experience;

    data.Achievements = data.achievements;
    for (let i = 0; i < data.achievements.length; i++) {

        if (!data.achievements[i].field || !data.achievements[i].awards) {
            return null;
        }

        data.Achievements[i].Type = data.achievements[i].field;
        data.Achievements[i].Description = data.achievements[i].awards;
        delete data.achievements[i].field;
        delete data.achievements[i].awards;

    }
    delete data.achievements;

    return data;


};


// Although I am using these credentials these can be accessed from user and authentication using inputs
// this will help in giving Unauthorised errors if credentials are invalid
const credentials = PDFServicesSdk.Credentials
    .servicePrincipalCredentialsBuilder()
    .withClientId("f783aca6ffe2442484ec63b7e1575003")
    .withClientSecret("p8e-o07dPK38-zDguoK1Nk2rMAQkYo4JxGoK")
    .build();


const OUTPUT = 'merged_document.pdf';

// If our output already exists, remove it so we can run the application again.
// if (fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.raw()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var pdfGenerated = false


// mutex fxn





app.post('/resume', function (req, res) {
    // res.status(500).send('Error reading the file');
    // return;

    // ---------------------------------------------------HANDLING ERRORS IN REQUEST AND TEMPLATE NOT FOUND ERROR
    // if(!req.body){
    //     console.error(`Error 400: Bad Request`);
    //     res.status(400).send('Bad Request');
    //     return;
    // }
    if (Object.keys(req.body).length === 0) {
        console.error(`Error 400: Bad Request1`);
        res.status(400).send('Bad Request');
        return;
    }

    if (req.headers['content-type'] !== 'application/json' || req.headers['accept'] !== 'application/pdf') {
        console.error(`Error 400: Bad Request2`);
        res.status(400).send('Bad Request');
        return;
    }



// ------------------------------ file path name
    const filePath = 'merged_document.pdf';
    if (!req.body.template_id) {
        console.error(`Error 400: Bad Request3`);
        res.status(400).send('Bad Request');
        return;
    }
    const INPUT = 'Template' + req.body.template_id + '.docx';
    if (!fs.existsSync(INPUT)) {
        console.error(`Error 404: Template not found`);
        res.status(404).send('Template not found');
        return;
    }


    const JSON_INPUT = modifier(req.body);

    if (JSON_INPUT === null) {
        // Handle the error
        console.error(`Error 400: Bad Request4`);
        res.status(400).send('Bad Request');

        return;
    }
    console.log(JSON_INPUT);

    //--------------------------------------- ADOBE API USE START
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
    const documentMerge = PDFServicesSdk.DocumentMerge,
        documentMergeOptions = documentMerge.options,
        options = new documentMergeOptions.DocumentMergeOptions(JSON_INPUT, documentMergeOptions.OutputFormat.PDF);
    const documentMergeOperation = documentMerge.Operation.createNew(options);
    const input = PDFServicesSdk.FileRef.createFromLocalFile(INPUT);
    documentMergeOperation.setInput(input);
    // -------------------------------------- API USE END



    //---------------------------------------- NOW result will be saved as PDF file named as "merged_document.pdf"
    // --------------------------------------- Handling Internal Server Error as well
    documentMergeOperation.execute(executionContext)
        .then(result => {
            // mutex lock acquired so that no two requests can access same pdf file
            mutex.acquire()
                .then(release => {
                    if (fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

                    result.saveAsFile('merged_document.pdf');
                    // a variable for just indication so that file is correctly formed first and then only read to sent
                    pdfGenerated = true
                    // timeout of 3s so that file is correctly formed first and then only read to sent
                    setTimeout(() => {
                        if (pdfGenerated) {
                            // file read if error come in reading the generated pdf then responding with Error 500
                            fs.readFile(filePath, (err, data) => {
                                if (err) {
                                    console.error('Error reading file:', err);
                                    res.status(500).send('Internal Server Error');
                                } else {
                                    // setting headers for pdfs as respoonse
                                    res.setHeader('Content-Type', 'application/pdf');
                                    res.setHeader('Content-Disposition', 'attachment; filename="merged_document.pdf"');

                                    // ----------------------------------------------data sent
                                    res.send(data);

                                    pdfGenerated = false;
                                    // deleting the merged document file so thsat new file will be formed for other request
                                    if (fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

                                    console.log("file sent");

                                    res.end();

                                }
                            });
                        } else {
                            res.status(500).send('Internal Server Error');
                        }
                    }, 3000);
                    release();
                })
                .catch(err => {
                    console.error('Error acquiring mutex lock:', err);
                });

        })
        .catch(err => {
            // ----------------------------- Handling Unauthorised Errors
            if (err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                res.status(401).send('Unauthorised');

                console.log('Exception encountered while executing operation', err);
            } else {
                res.status(401).send('Unauthorised');

                console.log('Exception encountered while executing operation', err);
            }
        });








});
// ----------------------------------------------- All operations done



// to serve static files from a directory named "public"
app.use(express.static('public'));

const port = 8080; // Choose a port number for your server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// server.close(() => {
//     console.log('Server stopped');
//   });

