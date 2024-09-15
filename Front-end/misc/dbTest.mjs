import { supabase } from "../api/supabase";
import { Session } from "@supabase/supabase-js";

// let error = await supabase.from('contents').insert({title: 'learn how to do addition',
// 												description: 'this is a video teaching you how to do addition',
// 												url: 'https://www.example.com',
// 												size: 1024,
// 												rating: 50,
// 												tags: ['math', 'arithmetic'],
// 												uploaded: '2024-01-01'});
// console.log(error)
//
// console.log(error)

let error = await supabase.from("users").insert({
  email: "user@example.com",
  nickname: "foo",
  password: "4457325e0cd32b71d90feacee298a049",
  joined: "2024-01-01",
  interests: ["spanish", "art"],
});

console.log(error);

let data = await supabase.from("users").select();

console.log(data);
