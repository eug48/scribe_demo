import { NextRequest, NextResponse } from "next/server";
import { OpenAIProvider } from "./OpenAI";
const echoPrompt = false;

export async function POST(req: NextRequest) {
  try {
    const context = await req.json();

    // TODO: move to separate file
    const prompt = `
        Generate a medical summary of the recorded consultation.

        The summary should not include pleasantries, chit-chat, the patient's name, age, date of birth, or information that's already in the medical record.

        The summary should make use of bullet points andstart with a heading:

        # Summary

        Only if the doctor asks for it, also generate letters to specialists giving the reason for the referral, information relevant to the particular specialist, and a summary of information from the medical record.

        Each letter should start with a heading, for example

        # Letter to neurologist


        Now here is the information:

        Recorded consultation:
        """
        ${context.dictated}
        """
        
        Additional info that must be added:
        """
        ${context.additional}
        """

        Data from medical record:
        """
        ${context.pms}
        """
        `.trim();

    if (echoPrompt) {
      return NextResponse.json({
        output: prompt,
      });
    }

    // TODO: make configurable
    const llm = new OpenAIProvider({
      model: "gpt-4o",
    });

    const output = await llm.generate({
      systemPrompt: "You are an expert doctor (general practitioner)",
      prompt,
    });

    return NextResponse.json({
      output,
    });
  } catch (error) {
    // TODO: in case of error (e.g. over-capacity of rate limit) consider
    // - falling back to other providers
    // - exponential bakcoff
    // - informing user that system is overloaded

    console.error("LLM API error:", error);
    return NextResponse.json({ error: "Error sending LLM request" });
  }
}
