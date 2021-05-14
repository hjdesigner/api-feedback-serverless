'use strict';

const dynamodb = require('../infra/dynamodb');

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'feedback',
    Item: {
      id: context.awsRequestId,
      note: data.note,
      feedback: data.feedback,
      date: timestamp,
      brand: data.brand,
      application: data.application
    }
  }

  dynamodb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        body: 'Couldn\'t create the feedback item.',
      });
      return;
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
}