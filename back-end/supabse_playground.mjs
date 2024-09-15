// For testing pruposes only
// Will be deleted in the future

import { createClient } from '@supabase/supabase-js';

const supabase = createClient('...');

let data = await supabase.from('users').select();

data = await supabase.auth.signUp({
	email: 'mingxuanz@mail.kakari.cc',
	password: 'helloworld123'
});

console.log(data);

const { data: { user } } = await supabase.auth.getUser();
