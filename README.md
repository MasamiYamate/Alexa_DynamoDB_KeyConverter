# Alexa_DynamoDB_KeyConverter
## Description
Script for skill developers using askd alexa-sdk (v1) and using DynamoDB with skills before sdk v2 is released.
In alexa-sdk (v1) and ask sdk (v2), the key referenced in DynamoDB is different.
For compatibility with past versions, ask - sdk - v1adapter is also provided, but when switching to ask - sdk v2 completely, it is a barrier that DynamoDB refers to different keys.
Therefore, we created a DynamoDB table for v2, changed the key from the table used in v1 and copied it. Even with existing skills it is easy to completely transition to ask-sdk v2 without using v1adapter.

## How To Use
First, on the DynamoDB administration screen, create a table with the table name referenced from the skill using ask - sdk v2.

Describe the table name of DynamoDB used in the existing project and the table name of the newly created DynamoDB in the next item of index.js.
Please enter the AWS access key and secret access together.
```index.js
//Change your aws data.
const regionName = "regionName";
const accessKeyId = "your aws access key";
const secretAccessKey = "your aws secret access key";

//DynamoDB Table Name used in alexa-sdk
const alexaSdkTableName = "Table Name";

//DynamoDB table name used in ask-sdk (v2)
const askSdkTableName = "Table Name";
```
In the directory containing index.js, you can migrate existing data to a new table by executing the following command:

```
node index.js
```
When the task is finished, the 「Task Fin」 is output.
