import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

console.log('Using Supabase URL:', supabaseUrl);
const keyForDebug = supabaseServiceKey || '';
console.log(`Service Key Check: Starts with '${keyForDebug.substring(0, 5)}', Ends with '${keyForDebug.slice(-5)}'`);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase URL and Service Role Key must be provided in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const createAdmin = async (name, email, password) => {
  if (!name || !email || !password) {
    console.error('Please provide a name, email, and password.');
    console.log('Usage: node scripts/create-admin.mjs <name> <email> <password>');
    process.exit(1);
  }

  try {
    const hashedPassword = await hashPassword(password);

    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          name,
          email,
          password_hash: hashedPassword,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      if (error.code === '23505') {
        console.error('Error: An admin with this email already exists.');
      } else {
        console.error('Error creating admin user:', error.message);
      }
      process.exit(1);
    }

    console.log('Admin user created successfully:');
    console.log(data);
    process.exit(0);
  } catch (err) {
    console.error('An unexpected error occurred:', err.message);
    process.exit(1);
  }
};

const [,, name, email, password] = process.argv;
createAdmin(name, email, password);
