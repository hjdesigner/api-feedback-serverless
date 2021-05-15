'use strict';

const dynamodb = require('../infra/dynamodb');
const { validationValue } = require('../utils/validation');

const create = async (event, context, callback) => {

  try {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
        
    const errorValue = validationValue(data);
    
    if (errorValue) {
      callback(null, {
        statusCode: 400,
        body: errorValue,
      });
    }
    
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

    const request = await dynamodb.put(params).promise();

    if (!request) {
      callback(null, {
        statusCode: error.statusCode || 501,
        body: 'Couldn\'t create the feedback item.',
      });
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);

  } catch(error) {
    callback(null, {
      statusCode: error.statusCode || 501,
      body: 'Couldn\'t create the feedback item.',
    });
  }
  
}

module.exports = { create };