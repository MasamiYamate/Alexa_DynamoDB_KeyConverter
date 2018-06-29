'use strict';

const aws = require('aws-sdk');

//Change your aws data.
const regionName = "regionName";
const accessKeyId = "your aws access key";
const secretAccessKey = "your aws secret access key";

//DynamoDB Table Name used in alexa-sdk
const alexaSdkTableName = "Table Name";

//DynamoDB table name used in ask-sdk (v2)
const askSdkTableName = "Table Name";

aws.config.update({
	"accessKeyId": accessKeyId,
	"secretAccessKey": secretAccessKey,
	"region": regionName
});

var dynamodb = new aws.DynamoDB();


async function convertTask () {

	try {

		const searchParm = {
			TableName: alexaSdkTableName,
			Select: "ALL_ATTRIBUTES"
		}

		const scanResponse = await dynamodb.scan(searchParm).promise();
		
		if (!'Items' in scanResponse) {
			throw "Response Data Items Not Found";
		}

		const putItems = scanResponse.Items.map (function(item) {
			return {
				'id': item['userId'],
				'attributes': item['mapAttr']
			}
		});

		for (var no in putItems) {
			const putParm = {
				'TableName': askSdkTableName,
				'Item': putItems[no]
			}
			await dynamodb.putItem(putParm).promise();
		}

		console.log("Task Fin");

	} catch (e) {
		console.log(e);
		return e;
	}
}


convertTask();
