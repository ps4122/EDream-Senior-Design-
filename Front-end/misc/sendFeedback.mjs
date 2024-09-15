// Uploaded on behalf of Prakhar

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with your Supabase URL and anon key
const supabase = createClient("your-supabase-url", "your-supabase-anon-key");

// Handler function for the serverless function
exports.handler = async (event) => {
  try {
    // Parse the incoming request body as JSON
    const data = JSON.parse(event.body);

    // Extract feedback data from the request body
    const { feedback } = data;

    // Save feedback to Supabase database
    const { data: savedFeedback, error } = await supabase
      .from("feedback")
      .insert([{ feedback }]);

    // If there's an error, return a 500 status code and the error message
    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error saving feedback to database" }),
      };
    }

    // If feedback is saved successfully, return a 200 status code
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Feedback saved successfully" }),
    };
  } catch (error) {
    // If an unexpected error occurs, return a 500 status code and the error message
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
