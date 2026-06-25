import { query } from './db';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const result = await query('SELECT NOW() as current_time');
    console.log('✓ Database connected successfully');
    console.log('  Server time:', result.rows[0].current_time);
    
    // Test table existence
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log('✓ Tables found:', tables.rows.map((r: any) => r.table_name).join(', '));
    
    // Test data in companies table
    const companies = await query('SELECT COUNT(*) as count FROM companies');
    console.log('✓ Companies in database:', companies.rows[0].count);
    
    // Test data in contacts table
    const contacts = await query('SELECT COUNT(*) as count FROM contacts');
    console.log('✓ Contacts in database:', contacts.rows[0].count);
    
    console.log('\n✓ All database tests passed!');
    
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
