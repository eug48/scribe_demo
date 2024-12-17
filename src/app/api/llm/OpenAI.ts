import { LLMBase } from "./LLMBase";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIProvider extends LLMBase {
  private model: string;

  constructor(options: { model: string }) {
    super();
    this.model = options.model;
  }

  async generate({
    systemPrompt,
    prompt,
  }: {
    systemPrompt: string;
    prompt: string;
  }): Promise<string> {
    const response = await openai.chat.completions.create({
      model: this.model,
      temperature: 0.2, // be fairly deterministic, not random
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    console.log("OpenAI response", response);

    return response.choices[0].message.content ?? "";
  }
}
