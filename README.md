# Serverless REST API with API Gateway, Lambda, DynamoDB and offline support

This API has the functionality to store feedbacks given to an appication.

## Setup

```bash
npm install -g serverless
serverless dynamodb install
npm install
```

## Setup AWS

```bash
serverless config credentials --provider aws --key YOUR_KEY_HERE --secret YOUR_KEY_SECRET_HERE
```

## Run service offline

```bash
serverless offline start
```

### Create a feedback

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/feedback   --data '{
  "note": 5,
  "feedback": "Best application in the world",
  "brand": 2,
  "application": "chat"
}'
```

Example Result:
```bash
{
    "id": "ckonq52rp0005qhocdiafg1qu",
    "note": 5,
    "feedback": "Best application in the world",
    "date": 1620960686920,
    "brand": 2,
    "application": "chat"
}
```

## Setup AWS

In order to deploy the endpoint simply run

```bash
serverless deploy
```