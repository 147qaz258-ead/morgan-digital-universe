import type { SystemDiagram as SystemDiagramData, SystemNodeKind } from "@/content/types";
import { Body, Meta } from "@/components/ui/typography";

const nodeLabels: Record<SystemNodeKind, string> = {
  input: "Input",
  processing: "Processing",
  interface: "Interface",
  hardware: "Hardware",
  output: "Output",
  boundary: "Boundary",
};

export function SystemDiagram({ diagram }: { diagram: SystemDiagramData }) {
  return (
    <figure aria-labelledby={`${diagram.id}-title`} className="border-y border-line">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line py-4">
        <span id={`${diagram.id}-title`} className="text-sm font-semibold text-ink">
          {diagram.title}
        </span>
        <Meta className="text-accent">Confirmed system map</Meta>
      </figcaption>

      <div className="grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
        {diagram.nodes.map((node, index) => (
          <div key={node.id} className="min-h-36 bg-bg p-5">
            <div className="flex items-center justify-between gap-4">
              <Meta className="text-signal">{String(index + 1).padStart(2, "0")}</Meta>
              <Meta className="text-ink-secondary">{nodeLabels[node.kind]}</Meta>
            </div>
            <p className="mt-6 text-base font-semibold text-ink">{node.label}</p>
            {node.detail ? <Body className="mt-2 text-xs text-ink-secondary">{node.detail}</Body> : null}
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        {diagram.connections.map((connection, index) => {
          const from = diagram.nodes.find((node) => node.id === connection.from);
          const to = diagram.nodes.find((node) => node.id === connection.to);
          return (
            <div
              key={connection.id}
              className="grid gap-3 border-b border-line py-4 last:border-b-0 md:grid-cols-[48px_1fr_1fr_1fr] md:items-center"
            >
              <Meta className="text-signal">C{String(index + 1).padStart(2, "0")}</Meta>
              <span className="text-xs font-medium text-ink">{from?.label}</span>
              <span className="font-mono text-2xs uppercase tracking-[0.08em] text-ink-secondary">
                {connection.direction === "bidirectional" ? "↔" : "→"} {connection.protocol ?? connection.label ?? "Confirmed flow"}
              </span>
              <span className="text-xs font-medium text-ink">{to?.label}</span>
            </div>
          );
        })}
      </div>

      {diagram.boundaryNotes.length > 0 ? (
        <div className="border-t border-line py-4">
          {diagram.boundaryNotes.map((note) => (
            <Body key={note} className="text-xs text-ink-secondary">{note}</Body>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
