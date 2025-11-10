const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST || '136.110.37.70',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'LASdExY6HJ',
  database: process.env.DB_DATABASE || 'postgres',
});

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    console.log(`Host: ${client.host}`);
    console.log(`Port: ${client.port}`);
    console.log(`Database: ${client.database}`);
    console.log(`User: ${client.user}`);
    
    await client.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT NOW()');
    console.log('📅 Server time:', result.rows[0].now);
    
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
