# LCS Code Exercise

Simple React App to view basic information about Members of Congress.

## Description

The application provides a way to look up a member by a group of filters and includes a Details view to show more information about the members (voting record, contact information etc.). It also comes with a search functionality to find a member by their name. The app uses Ant Design as its main UI library.


## Getting Started

The application starts by loading the **Members List** page to display general information about each member from the Clerk's `/Members` API.  In this page the user can paginate through the results, filter the data by basic fields and search a member by their name.

The user can also navigate to the **Member Details** page by clicking on the Member's name or the "**more info**" button in each row. The **Member Details** page provides a more detailed view about the member and includes information such as contact information, committees where they serve and their recent voting record.

### Dependencies

* NodeJS version 8.12.0 or higher

### Installing the app

* Clone the repo (https://github.com/GiovanniACamacho/members-app.git)
* From the project directory, run `npm install` or `yarn install`

### Running the app

* From the project directory, run `npm start` or `yarn start`
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
* The app will be running in development mode.<br />

### How to test it
* From the project directory, run `npm test` or `yarn test`
* This command launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
## Miscellaneous Notes

* I went with Ant Design because as a UI developer I am always looking to experiment with new libraries and Ant Design had everything I needed. I am always mindful that web interfaces and trends are constantly changing and they can be dated relatively quickly. My goal is to stay ahead of the curve and not being afraid of trying something new.
* Some areas of improvements in the application would be error handling, smarter navigation and to limit the amount of data fetched from the API by passing only the properties needed to render the components. I would like to also include unit testing, which is something I routinely do with Angular.
* I noticed that **pageSize** combo box is not working as expected and that would be something that I would address typically with time

## Authors

[Giovanni Camacho](https://github.com/GiovanniACamacho)

## Version History

* 0.1.0
    * Initial Release


## Acknowledgments

Libraries used
* [Ant Design]([https://ant.design/components/overview/](https://ant.design/components/overview/))
* [React Router]([https://reactrouter.com/web/example/basic](https://reactrouter.com/web/example/basic))

