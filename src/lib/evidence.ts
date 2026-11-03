import type {
  Evidence,
  EvidenceId,
  EvidenceMediaAsset,
  EvidenceVerification,
} from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";

export type VerifiedEvidence = Evidence & {
  asset: EvidenceMediaAsset & { src: string; status: "verified" };
  caption: string;
  verification: EvidenceVerification & {
    state: "verified";
    publicPermission: "granted";
    userConfirmed: true;
    claim: string;
    captureDate: string;
    owner: string;
  };
  isVerified: true;
};

export function isVerifiedEvidence(item: Evidence): item is VerifiedEvidence {
  return Boolean(
    item.isVerified
      && item.asset?.src
      && item.asset.provenance === "user-evidence"
      && item.asset.status === "verified"
      && item.caption?.trim()
      && item.verification.state === "verified"
      && item.verification.publicPermission === "granted"
      && item.verification.userConfirmed
      && item.verification.claim?.trim()
      && item.verification.captureDate?.trim()
      && item.verification.owner?.trim(),
  );
}

export function evidenceHref(locale: Locale, projectSlug: string, evidenceId: EvidenceId): string {
  return localePath(locale, `/experiments/${projectSlug}#${evidenceId}`);
}
