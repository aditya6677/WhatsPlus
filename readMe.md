# WhatsPlus [![N|Solid](http://icons.iconarchive.com/icons/dtafalonso/android-l/128/WhatsApp-icon.png)]()

This hack let's you handle -
* Hospital Appointment Booking/Cancellation .
* Conduct AMA (Ask Me Anything) sessions with doctors .
* Your personal health wikibot .

via WhatsApp.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

A Browser, NodeJs environment to run the back-end.


### Installing and Running  Backend

Clone the Repo and go to ./Backend , Set up the db with ./backend/hack.sql

```
$ sudo npm install
```
```
$ sudo nodemon index.js
```


## Running AMA Console

* Open web.whatsapp.com on chrome and Login
* Open Chrome Console.
* Run ama.js for the group you want to turn into a console.


## Commands Supported

* **Broadcasting Message to all Group Participants via Bot**
 ```apple js
$ sudo -g groupName,Message    
```

* **Sending Direct Message to a user via Bot**
```
$ sudo -i userId,Message
```

* **Starting AMA mode** 
```apple js
$ sudo -s ama
```
* **Closing AMA mode**
```
$ sudo -x ama
```
## Scripts and their Usage

* **Booking.js** - Automates booking/cancellation of appointments.
* **AMA.js** - Conducts live AMA sessions (Yes, with multimedia(audio/img/gif/video) support)over whatsApp.
* And there are many utility scripts in ./scripts.



## Deployment

The project uses AWS EC2 Windows Instance to interact with WhatsApp API and AWS EC2 Ubuntu Server 16.04 for backend support.


## Built With

* [Javascript](https://www.javascript.com/) - Used to create scripts to interact with whatsapp API.
* [Mysql](https://www.mysql.com/) - Used as database.
* [Python](https://www.python.org/)- Used for analytics.

## Dataflow

```apple js

Command------->Bot Scripts at AWS process it----->Intitiate Response----->Execution

```


## Workflow

Master is our holy grail, Never directly push into master, create a pull request .



## License

This project is licensed under the MIT License. 
