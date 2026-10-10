require('dotenv').config();

const { connectDatabase, disconnectDatabase } = require('./config/database');
const { runBookExamples } = require('./services/book.service');

async function main() 
{
  try 
  {
    await connectDatabase();
    await runBookExamples();
  } 
  catch (error) 
  {
    console.error('Connection or operation failed:', error);
    process.exitCode = 1;
  } 
  finally
 {
    await disconnectDatabase();
  }
}

main();
