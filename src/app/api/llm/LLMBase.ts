export abstract class LLMBase {
  abstract generate(params: {
    systemPrompt: string;
    prompt: string;
  }): Promise<string>;
}
