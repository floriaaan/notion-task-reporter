import { log } from "@/lib/log";

export const getCompletion = async (
  prompt: string
): Promise<string | undefined> => {
  const url = "https://api.openai.com/v1/completions";
  const params = {
    prompt,
    max_tokens: 160,
    temperature: 0.7,
    frequency_penalty: 0.5,
    model: "text-davinci-003",
  };
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_TOKEN}`,
    "Content-Type": "application/json",
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    });
    const body = await res.json();
    console.log(body);
    const answers: string[] = [body.choices[0].text];
    // handle choices[0].finish_reason === "length"
    if (body.choices[0].finish_reason !== "length") {
      return answers.join("");
    } else {
      const next = await getCompletion(answers[0]);
      if (next) answers.push(next);
      return answers.join("");
    }
  } catch (err) {
    log.error(err);
  }
};
