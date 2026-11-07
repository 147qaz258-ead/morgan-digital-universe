"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Box, RotateCcw } from "lucide-react";
import { Component, useRef, useState, type ReactNode } from "react";
import { signalEngine, getShowcaseCopy } from "@/content/showcase";
import type { Locale } from "@/i18n/config";
import styles from "./LabWorld.module.css";

const SignalViewport = dynamic(() => import("./SignalViewport"), { ssr: false });

class OptionalViewport extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function SignalSculpture({ locale }: { locale: Locale }) {
  const copy = getShowcaseCopy(locale);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const failed = () => { setError(true); setRequested(false); setReady(false); };
  const close = () => {
    setRequested(false);
    setReady(false);
    requestAnimationFrame(() => button.current?.focus({ preventScroll: true }));
  };
  return (
    <div className={styles.sculpture}>
      <div className={styles.orbit} aria-hidden />
      <span className={styles.coordinate} aria-hidden>+<span>01 : 03 : 04</span></span>
      <div className={styles.object}>
        <Image src={signalEngine.poster} alt={copy.objectAlt} fill preload sizes="(max-width: 767px) 100vw, 55vw" className={`${styles.poster} ${ready ? styles.posterHidden : ""}`} />
        {requested ? <OptionalViewport onError={failed}><SignalViewport src={signalEngine.model} label={copy.viewportLabel} onReady={() => setReady(true)} onError={failed} onClose={close} /></OptionalViewport> : null}
        {requested && !ready ? <div className={styles.loading} role="status"><span />{copy.loading3d}</div> : null}
      </div>
      <div className={styles.objectCaption}>
        <div><span className={styles.micro}>{copy.objectTitle}</span><p>{copy.objectNote}</p></div>
        <button ref={button} type="button" onClick={() => { if (requested) close(); else { setError(false); setRequested(true); } }} className={styles.viewObject}>
          {requested ? <RotateCcw size={15} aria-hidden /> : <Box size={15} aria-hidden />}
          {requested ? copy.close3d : copy.view3d}
        </button>
      </div>
      {ready ? <p className={styles.objectHint}>{copy.drag3d}</p> : null}
      {error ? <p className={styles.objectHint} role="status">{copy.error3d}</p> : null}
    </div>
  );
}
