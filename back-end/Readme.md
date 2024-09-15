#### Back-End | Learning Content Pre-Process

---

Preprocess pdf article into plaintext using `pdf-parse`

Parse the article using OpenAI API, get content interest tags

Generate quiz in a JSON format using API

Create databse entry, with content title, tags, filename (uuid) and quiz json.

Upload the file (.pdf) onto supabse storage bucket.



#### Front-End | Learning Content Retrieval

---

Parse personal statement using OpenAI API, get interest tags

Store those tags into `user` database table

Query content database using user interests tags, return file title & filename

Query `getPublicUrl(fileName)` to get http link for download

Download content & quiz



#### Configuration

---

You should create `.env` file at project root to store the environemental variables.

Format of the file should follows:

````
# DEBUG=1
OPENAI_API_KEY=***
SUPABASE_PROJECT=https://ticcscbvmncayhqsodsw.supabase.co
SUPABASE_API_KEY=***
````



#### Something Useful

---

https://supabase.com/docs/reference/javascript/installing
