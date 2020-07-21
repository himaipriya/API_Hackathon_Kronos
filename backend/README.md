# HappySave API Backend
This is a  Java Maven Spring Boot (version 2.3.1) tomcat embedded application that can be used ad for connecting to RBS Open Banking API's

## Getting Started

### How to Run 
This project is build on Maven.
Please run below maven command in terminal for building and running application.
```bash
mvn clean install
mvn spring-boot:run
```
#### In Heroku cloud
This spring boot application deployed in Heroku cloud. it is up and running in below URL

https://api-hackathon-kronos.herokuapp.com/open-banking/v3.1

 
### Endpoints
#### Account service

Method	| Path	| Description	| User authenticated	| Available from UI
------------- | ------------------------- | ------------- |:-------------:|:----------------:|
GET	| /aisp/init	    | Initialize Access Token to hit accounts endpoints	| * | 	*
GET	| /aisp/accounts/{account_id}	| Get a account information	| * | *
GET	| /aisp/accounts	| Get list of accounts and their information	|  * | 	×
GET	| /aisp/accounts/{account_id}/balances	| Get balance details for a particular account	| * | *
GET	| /aisp/accounts/{account_id}/direct-debits	| Get Direct Debits for a account|  * | ×
GET	| /aisp/accounts/{account_id}/standing-orders	| Get Standing orders for a account|  * | ×
GET	| /aisp/accounts/{account_id}/transactions	| Get transactions for a account|  * | ×
GET	| /aisp/accounts/{account_id}/beneficiaries | Get beneficiaries for a account|  * | ×

#### Payment service

Method	| Path	| Description	| User authenticated	| Available from UI
------------- | ------------------------- | ------------- |:-------------:|:----------------:|
POST	| /pisp/init	    | Initialize Access Token to submit a payment	|  *| 	*
POST	| /pisp/domestic-payments	| Submit a domestic payment	| * | *
GET	| /pisp/domestic-payments/{{domesticPaymentId}}	| Get the status of the submitted payment	|  * | 	×

