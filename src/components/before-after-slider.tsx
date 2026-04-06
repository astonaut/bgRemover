"use client";

import { KeyboardEvent, PointerEvent, useRef, useState } from "react";
import styles from "./before-after-slider.module.css";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

const KEYBOARD_STEP = 5;
const KEYBOARD_PAGE_STEP = 10;

function clampPosition(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = (clientX: number) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = clampPosition((x / rect.width) * 100);
    setPosition(pct);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) {
      return;
    }

    updatePosition(event.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextPosition = position;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        nextPosition = position - KEYBOARD_STEP;
        break;
      case "ArrowRight":
      case "ArrowUp":
        nextPosition = position + KEYBOARD_STEP;
        break;
      case "PageDown":
        nextPosition = position - KEYBOARD_PAGE_STEP;
        break;
      case "PageUp":
        nextPosition = position + KEYBOARD_PAGE_STEP;
        break;
      case "Home":
        nextPosition = 0;
        break;
      case "End":
        nextPosition = 100;
        break;
      default:
        return;
    }

    event.preventDefault();
    setPosition(clampPosition(nextPosition));
  };

  return (
    <div
      ref={containerRef}
      className={styles.slider}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-label={`${alt} - before and after comparison`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`${Math.round(position)} percent of the after image is visible`}
      tabIndex={0}
    >
      <div className={styles.imageLayer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={`${alt} - before`} className={styles.img} />
      </div>
      <div
        className={styles.imageLayer}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={afterSrc} alt={`${alt} - after`} className={styles.img} />
      </div>
      <div className={styles.handle} style={{ left: `${position}%` }}>
        <div className={styles.handleLine} />
        <div className={styles.handleCircle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7 4L3 10L7 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 4L17 10L13 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.handleLine} />
      </div>
      <span className={styles.labelBefore}>Before</span>
      <span className={styles.labelAfter}>After</span>
    </div>
  );
}
