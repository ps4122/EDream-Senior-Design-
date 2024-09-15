import { supabase } from '../api/supabase'
import { Session } from '@supabase/supabase-js'

let data = await supabase.auth.signUp({
	email: 'mingxuanz@mail.kakari.cc',
	password: 'helloworld123'
});

console.log(data);


const { data: { user } } = await supabase.auth.getUser();
