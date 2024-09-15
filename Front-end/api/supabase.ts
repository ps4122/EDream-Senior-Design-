import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ticcscbvmncayhqsodsw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY2NzY2J2bW5jYXlocXNvZHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDczMzAwODMsImV4cCI6MjAyMjkwNjA4M30.S2_mSheoWqq68YuG9z4mNN-JmeftOudfa7sUDCDpTsQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});