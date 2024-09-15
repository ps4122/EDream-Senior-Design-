import "./env.mjs";
import moment from "moment";
import { readFileSync } from "fs";
import { v4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { languageProcess } from "./language_process.mjs";

// create a supabase client
const supabase = createClient(
    process.env.SUPABASE_PROJECT,
    process.env.SUPABASE_API_KEY
);

async function main(debugMode = false) {
    if (!process.argv[2]) {
        console.log("No file name specified! Quitting...");
        return;
    }
    let fileData;
    try {
        fileData = readFileSync(process.argv[2]);
    } catch (err) {
        console.log(debugMode ? err : "");
        console.log("Error reading file! Quitting...");
        return;
    }
    const result = await languageProcess(fileData, debugMode);
    if (!result) {
        // error occured when running `languageProcess`
        return;
    }
    const [tags, quiz, metadata] = result;
    console.log(debugMode ? tags : "");
    console.log(debugMode ? quiz : "");
    console.log(debugMode ? metadata : "");
    const uuid = v4();
    const db_status = await supabase.from("Content").insert({
        uuid: uuid,
        title: metadata.title,
        description: metadata.description,
        // field: tags[0],
        length: metadata.length,
        rating: null,
        quiz: JSON.stringify(quiz),
        uploaded: moment().utc().format("YYYY-MM-DD"),
    });
    console.log(debugMode ? db_status : "");
    if (db_status.error) {
        console.log("Error querying database! Quitting...");
        return;
    }
    tags.forEach(async (tag) => {
        const db_status = await supabase.from("Content_Tags").insert({
            content_uuid: uuid,
            tag: tag,
        });
        console.log(debugMode ? db_status : "");
        if (db_status.error) {
            console.log("Error querying database! Quitting...");
            return;
        }
    });
    const s3_status = await supabase.storage
        .from("content")
        .upload("" + uuid + ".pdf", fileData, {
            cacheControl: "3600",
            upsert: false,
        });
    if (s3_status.error) {
        console.log("Error uploading file! Quitting...", s3_status.error);
        return;
    }
    console.log(debugMode ? s3_status.data : "");
}

if (process.env.DEBUG === "1") {
    console.log("Debug mode is on!");
    main(true);
} else {
    main();
}
