function configureSqsClient(): object {
    const sqsClientConfig = {
      region: process.env.AWS_REGION,
    };
    if (process.env.NODE_ENV === 'development') {
      sqsClientConfig['region'] = 'us-west-2';
      sqsClientConfig['endpoint'] = `http://localstack:4566`;
      sqsClientConfig['credentials'] = {
        accessKeyId: 'test',
        secretAccessKey: 'test',
      };
    }
    return sqsClientConfig;
  }
  
  export default configureSqsClient;
  