const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error("Please set the OPENAI_API_KEY environment variable");
  process.exit(1);
}

async function fetchOpenAIModels() {
  try {
    const response = await axios.get("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const allModels = response.data.data;
    console.table(allModels);

    const ignoreTags = ["realtime", "audio"];

    const chatModels = allModels.filter(
      (model) =>
        (model.id.includes("gpt-") || model.id.includes("o1")) &&
        !ignoreTags.some((tag) => model.id.includes(tag)),
    );

    const modelIds = chatModels.map((model) => model.id);

    const set = new Set(modelIds);

    // https://platform.openai.com/docs/models
    set.add("o1-preview");
    set.add("o1-preview-2024-09-12");
    set.add("o1-mini");
    set.add("o1-mini-2024-09-12");

    const outputPath = path.join(
      __dirname,
      "..",
      "schemas",
      "openAIModels.json",
    );

    await fs.writeFile(outputPath, JSON.stringify(Array.from(set), null, 2));

    console.log(
      "OpenAI chat models have been fetched and saved to openAIModels.json",
    );
  } catch (error) {
    console.error("Error fetching OpenAI models:", error);
  }
}

fetchOpenAIModels();
