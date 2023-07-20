# AsposeTestTaskImages

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

This test case was performed upon request from aspose.com. The application is designed as a single-module form to ensure easy portability and extensibility. The design follows a minimal approach and utilizes the Angular Material library.

Components used:

Selection options
Icon buttons
Progress bar for image conversion

Usage scenario:

The user selects the desired formats.
The user uploads or clicks on the image to convert.
The user can download all files using the "Downloads" button or selectively download specific photos by clicking on the corresponding buttons that appear on mouse hover.
Strengths:

Tested multiple scenarios with different numbers of images, including up to 30 files for download. Each file is checked, and if any file does not meet the selected format, an error is shown, and the files can be downloaded again.
The application waits for a minute for each response. If the server does not respond within this time, the application attempts to convert the image three more times (customizable).
All necessary settings are conveniently placed in a separate file for easy customization of the application.
Possible Improvements:
During the documentation study, it was discovered that the Aspose server itself determines the format of the image. To simplify the user's choice, consider leaving only the target output format. Additionally, implement a backend solution for secure image conversion instead of handling it on the client side.
If there is a specific design requirement, consider using the Tailwind CSS approach or SCSS (if third-party libraries are not an option).

For correct application functionality, users must create an account on aspose.com and insert their clientId and clientSecret keys in the environment field. These are sensitive data that should be stored securely.
To deploy the application, run the "npm run build" command, which will create a version available for deployment on the internet.

How to launch:
1) create an app on aspose.com
2) replace clientId, clientSecret values with yours (available after creating the application on aspose.com) in src/environments/environment.ts file
3) configure at your discretion
  export const environment = {
    clientId: YOUR_CLIENT_ID, // get from Aspose.com
    clientSecret: YOUR_CLIENT_SECRET, // get from Aspose.com
    threadsCount: 3, // number of queries running in parallel
    baseURL: 'https://api.aspose.cloud/v3.0/imaging/convert',
    authURL: 'https://api.aspose.cloud/connect/token',
    uploadMaxLength: 30, //maximum number of images available for selection before sending to the server
  };
4) install dependencies (npm install)
5) start the project (npm run start)
follow the further instructions.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


