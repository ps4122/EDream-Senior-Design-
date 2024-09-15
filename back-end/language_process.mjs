import OpenAI from "openai";
import pdf from "pdf-parse/lib/pdf-parse.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function completionHandler(completion, taskName, debugMode = false) {
    if (completion.choices[0].finish_reason !== "stop") {
        console.log(`Abnormal termination of LLM caused by ${completion.choices[0].finish_reason}
            when ${taskName}! Quitting...`);
        return;
    }
    console.log(debugMode ? completion.choices[0].message.content : "");
    try {
        return JSON.parse(completion.choices[0].message.content);
    } catch (err) {
        console.log(debugMode ? err : "");
        console.log("LLM returned a bad JSON! Quitting...");
        return;
    }
}

async function languageProcess(fileData, debugMode = false) {
    let pdfData;
    await pdf(fileData)
        .then((data) => {
            pdfData = data;
        })
        .catch((err) => {
            console.log(debugMode ? err : "");
            console.log("Error parsing file! Quitting...");
            return;
        });
    const promptTag = [
        {
            role: "system",
            content: `
            You are designed to output JSON. Don't use backticks.
            You will be provided a list of popular topics people are interested in.
            Remember those topics and find the ones that are related to the PDF file you will be provided.
            The JSON file should contain the following keys:
            related_topics
        `,
        },
        {
            role: "user",
            content: `
            List of topics:\n"""\n
                "technology",
                "design",
                "marketing",
                "photography_and_videology",
                "language",
                "cooking_and_baking",
                "fitness_and_nutrition",
                "finance_and_investing",
                "art",
                "history",
            \n"""
            You should not give me topics that are not listed above.
        `,
        },
        {
            role: "user",
            content: `
            PDF File:\n"""\n${pdfData.text}\n"""
        `,
        },
    ];
    const promptQuiz = [
        {
            role: "system",
            content: `
            You are designed to output JSON. Don't use backticks.
            You will be provided with a PDF file and asked to output a quiz based on it.
            The quiz should contain 5 questions, each with 4 possible answers. You should also tell me the correct answer
            The JSON should be structured like this:
            {
                quiz: [
                    { question: string, option: [string, string], answer: string },
                    ...,
                ];
            }
        `,
        },
        {
            role: "user",
            content: `
            PDF File:\n"""\n${pdfData.text}\n"""
        `,
        },
    ];
    const promptDescription = [
        {
            role: "system",
            content: `
            You are designed to output JSON. Don't use backticks.
            You will be provided with a PDF file and asked to generate a brief description of the article.
            The JSON file should contain the following keys:
            - title
            - description
        `,
        },
        {
            role: "user",
            content: `
            PDF File:\n"""\n${pdfData.text}\n"""
        `,
        },
    ];
    let completion;
    completion = await openai.chat.completions.create({
        messages: promptTag,
        model: "gpt-3.5-turbo",
    });
    let tags = completionHandler(completion, "categorizing", debugMode);
    if (!tags) {
        return;
    }
    tags = tags.related_topics; // this name depends on the LLM
    if (!tags) {
        console.log("LLM returned unexpected category values! Quitting...");
        return;
    }
    // console.log(debugMode ? tags : '');
    completion = await openai.chat.completions.create({
        messages: promptQuiz,
        model: "gpt-3.5-turbo",
    });
    let quiz = completionHandler(completion, "generating quiz", debugMode);
    if (!quiz) {
        return;
    }
    quiz = quiz.quiz; // this name depends on the LLM
    if (!quiz) {
        console.log("LLM returned unexpected quiz values! Quitting...");
        return;
    }
    // console.log(debugMode ? quiz : '');
    completion = await openai.chat.completions.create({
        messages: promptDescription,
        model: "gpt-3.5-turbo",
    });
    const metadata = completionHandler(
        completion,
        "generating description",
        debugMode
    );
    if (!quiz) {
        return;
    }
    metadata.length = pdfData.text.length;
    if (!quiz) {
        console.log("LLM returned unexpected description values! Quitting...");
        return;
    }
    // console.log(debugMode ? description : '');
    return [tags, quiz, metadata];
}

export { languageProcess };
