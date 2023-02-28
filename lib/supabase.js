import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient('https://bwgclihzakwokeybdojq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3Z2NsaWh6YWt3b2tleWJkb2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwNzUwODUsImV4cCI6MTk5MjY1MTA4NX0.wJcvHmkfkE5zlQ3VdjK0Mz2WD8jnJ1R8JGfDwJ7pzI4', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})