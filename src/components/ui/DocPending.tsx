import { Meta } from "./typography";

/** 内容尚未填写时的诚实占位：不编造问题、结果或数据。 */
export function DocPending({ note }: { note?: string }) {
  return (
    <div className="rounded-[16px] border border-dashed border-line bg-bg px-6 py-8">
      <Meta className="text-ink-secondary">
        Documentation in progress{note ? ` — ${note}` : ""}
      </Meta>
    </div>
  );
}
