import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: process.env.SERVER_URL
  }
}

export { handler }
