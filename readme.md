
# Crypto Portfolio Tracker

Case Study :

Write a command line program that does the following

 - Given no parameters, return the latest portfolio value per token in USD
 - Given a token, return the latest portfolio value for that token in USD
 - Given a date, return the portfolio value per token in USD on that date
 - Given a date and a token, return the portfolio value of that token in USD on that date


## Author
- [@ogubuikealex](ogubuikealex@gmail.com)

## Tech Stack

NodeJS, Typescript

## License

[MIT](https://github.com/king-Alex-d-great/CryptoPortfolioManager)


## Design System

### Overview

**Type Safety** <br />
We can all agree that Javascript is an awesome language. The only problem is because it is not strictly typed, it can be error prone. 
<br /> To mitigate some of the type errors that can come up from JS, this project is written in typescript and then compiled to Javascript.
<br /> The second reason I went with typscript is because its language construct allow object oriented programming outside the box 

**Design Decisions** <br />
I use object oriented approach when building. <br />
The various classes in this project were designed to strictly follow the principles of Encapsulation and Abstraction. <br /> This means that they hide internal implementations and only expose necessary class members.
A typical example is the Application class that only exposes a run function which kick starts the entire application process.

**For the sake of maintainability, I made extensive use of the SOID in SOLID principles:** <br />
<br />
S - The only responsibility assigned to the repository class is accessing the data in the CSV file <br />
O - The CsvHandler class is an abstract class that contains protected and private methods. This means it can be extended but never modified <br />
I - Every interface is a small and specific in respect to necessity <br />
D - Key dependencies were injected across the project to remove the hassle of a tightly coupled system <br />

### Implementation
My goal for this application is to create a system that delegates responsibility to relevenat parts only.
Lets look at how I implemented the various part of the system.

#### The Repository Class (CsvHandler)
The Repository is the only class that has access to the the data store (in this case the csv file).
It has private properties and methods to set and store the content of the CSV file and then protected getter functions to expose the retrieved data.
Its is an abstract class designed to follow the singleton design principle and the Open-close priniciple (open for extension, close for modification)

#### The RequestService Class
This extends the Repository class and implements the IRequestService.
The purpose of this class is to exposes additional repository functions to manipulate stored CSV data.

#### The Controller Class
The class removes dependency by using the IRequestService Abstraction via Dependency Injection.
This means if the requirements for this project change all we need to do is ensure that the new class
is implementing IRequestService.
The controller class implements IController. The reason for this is to allow us use it via dependency injection.
It uses an IRequestService class to handle requests from the user of the application. 

#### The Application Class
This class recieves a controller instance via dependency injection. It sends requests and receives responses from the controller instance.
It has several private methods and exposes one public function to kick start the application.


## Run Locally

Clone the project

```bash
  git clone https://github.com/king-Alex-d-great/Customer_Tracker.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm start
```

Start the Forntend


```bash
  cd .\informationcollector-client\
  npm start
```

