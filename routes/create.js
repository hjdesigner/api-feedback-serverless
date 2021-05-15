'use strict';

const dynamodb = require('../infra/dynamodb');

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.note !== 'number' || data.note === '') {
    console.error('Validation note failed');
    const response = {
      statusCode: 400,
      body: 'The note value must be a number and cannot be empty',
    };
    callback(null, response);
  }

  if (typeof data.brand !== 'number' || data.brand === '') {
    console.error('Validation brand failed');
    const response = {
      statusCode: 400,
      body: 'The brand value must be a number and cannot be empty',
    };
    callback(null, response);
  }
  
  if (typeof data.feedback !== 'string' || data.feedback === '') {
    console.error('Validation feedback failed');
    const response = {
      statusCode: 400,
      body: 'The feedback value must be a string and cannot be empty',
    };
    callback(null, response);
  }

  if (typeof data.application !== 'string' || data.application === '') {
    console.error('Validation application failed');
    const response = {
      statusCode: 400,
      body: 'The application value must be a string and cannot be empty',
    };
    callback(null, response);
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