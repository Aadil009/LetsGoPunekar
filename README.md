# LetsGoPunekar
<h3>Hello World!</h3>

This repository contains source code for mobile app.
This mobile application is made for people who
wish to know  timeing of buses in Pune City.</br>In Pune city there is organization called Pune Mahanagar Parivahan Mahamandal Ltd that is **pmpml** who runs buses as public tranport.

### Problem Statement
* Pune is metropolitical city so many
people use PMPML service
* Most of the people are unaware about
bus schedule
* People have to wait for bus and don’t
know when bus will come
* If bus doesn’t come on time then
people may use other private transport
option
* There is need of digitalized system

### Technologies used
- Front End:React Native
- Backend:
  - Server:Node.js
  - Database:PSQL

### Steps we followed while making this app

#### General working and data flow in app
There is a front end written in react native which takes input from user.</br>
Input is From(Source Stop) and To(Destination Stop)</br>
Then it requests Server for data</br>
Node server takes input(i.e request from react native app)</br>
And fires query on database</br>
database(PSQL) will executes these queries and give result back to server</br>
server returns result as json object</br>
React Native app will use json data to render best route list,time for source and destination stop and presentaion of route on Map.

### Parts of App
* Front end:**React Native**
* Server:**Node.js**
* Database:**postgreSQL**

#### Database:**postgreSQL**
We downloaded data of pmpml from their website which are [these files](./Database/Original)
We have made 4 tables out of it namely
* stops: This table contains unique stops according to stop name and latitude and longitude
* routes: This table contains route_id,stop_id,stop_sequence and stage 
* routemaster: Route id with description
* arrival time: Arrival time for bus_stop for each trip

Here is link to [database Schema](./Database/schema.txt)

To make this database from original [excel files](./Database/Original)</br>
We used folling procedure we used Python scripts to filter data</br>
For table *stops*
* First we have sorted entries in file routeMappingEnglish alphabetically 
* Then we extracted stops with unique fields of(name,latitude,longitude)
* Stored data into [new file](./Database/Filtered/latlong.csv) 
* imported this file into psql database with sequencially generated primary key




###  Tasks in Project
- [x] ~~Prototype~~
- [x] ~~DataRefining~~ 
- [x] ~~DataBaseCreation~~
- [ ] Documentation
- [ ] Show Everything in Marathi language
### Contributers
* [@Aadil](https://github.com/Aadil009)
* [@Mugdha](https://github.com/mugs912)
* [@Vrushali](https://github.com/vrushali-d)

### About us
We are students of Savitribai Phule Pune University(SPPU)</br>
currently studying in first year of M.Sc(Scientific Computing) at</br>
Interdisciplinary School of Scientific Computing,Pune University.
