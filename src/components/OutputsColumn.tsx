import { RootState } from "@/state/store";
import { TextColumn } from "./TextColumn";
import { useAppSelector } from "@/state/hooks";

export function OutputsColumn() {
  const loading = useAppSelector((state) => state.output.loading);
  const output = useAppSelector((state) => state.output.output);
  const error = useAppSelector((state) => state.output.error);

  const sections = splitOutputIntoSections(output);

  return (
    <>
      {error && <div className="notification is-danger">{error}</div>}

      {sections.length == 0 && (
        <TextColumn title="Output" text="" loading={loading} />
      )}

      {sections.map((section) => (
        <TextColumn
          key={section.heading}
          title={section.heading}
          text={section.content}
          loading={loading}
          copyButton
        />
      ))}
    </>
  );
}

// split output into section, where each section starts with a markdown heading (e.g. "# Summary")
// the output should be an array of objects (heading, content)
function splitOutputIntoSections(
  output: string
): { heading: string; content: string }[] {
  const sections = ("\n" + output).split("\n# ");
  return sections
    .map((section) => {
      const heading = section.split("\n")[0];
      const content = section.split("\n").slice(1).join("\n").trim();
      return { heading, content };
    })
    .filter((section) => section.content);
}
