'use strict';

const aws = require('aws-sdk');
const fs = require('fs');
const conf = require('config');

aws.config.update({
	"accessKeyId": conf.accessKeyId,
	"secretAccessKey": conf.secretAccessKey,
	"region": conf.regionName
});

var dynamodb = new aws.DynamoDB();


async function convertTask () {

	console.log(conf);

	try {

		const searchParm = {
			TableName: conf.alexaSdkTableName,
			Select: "ALL_ATTRIBUTES"
		}

		const scanResponse = await dynamodb.scan(searchParm).promise();

		const items = scanResponse;
		const date = new Date();
		const fileName = './output/' + conf.alexaSdkTableName + '-' + date.toISOString() + '.json';

		fs.writeFileSync(fileName, JSON.stringify(items));

		console.log("Task Fin");

	} catch (e) {
		console.log(e);
		return e;
	}
}


convertTask();
