const aws = require("aws-sdk")
const {randomUUID} = require("crypto")

let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams = {
        region: 'localhost',
        endpoint: 'http://0.0.0.0:8000',
        accessKeyId: 'AKIA2KIP4ZYSB36CDLLQ',
        secretAccessKey: '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'
    }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams/*{
    region: 'localhost',
    endpoint: 'http://0.0.0.0:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET'
    /*    credentials: {
        accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env    
    },
}*/)

const createUsers = async (event, context) => {

    const id = randomUUID();

    let userBody = JSON.parse(event.body)

    userBody.pk = id

    var params = {
        TableName: 'usersTable',
        Item: userBody
    };

    console.log(params.Item)

    return dynamodb.put(params).promise().then(res => {
        console.log(res)
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user': params.Item })
        }
    })
}

module.exports = {
    createUsers
}
