"use client";

import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./upload-panel.module.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type Status = "idle" | "ready" | "uploading" | "error" | "success";

type RemoveBackgroundResponse =
  | { imageUrl: string; message?: string }
  | { message: string; transientProcessing?: boolean };

export function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Choose an image to get started.");
  const [isDragging, setIsDragging] = useState(false);
  const dropzoneRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const validateAndSetFile = (selectedFile: File) => {
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setStatus("error");
      setMessage("Unsupported format. Use JPG, PNG, or WEBP.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setStatus("error");
      setMessage("File is too large. Keep uploads under 10 MB.");
      return;
    }

    setFile(selectedFile);
    setResultUrl(null);
    setStatus("ready");
    setMessage("Image selected. Click remove background to run the demo request.");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    validateAndSetFile(selectedFile);
  };

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const rect = dropzoneRef.current?.getBoundingClientRect();

    if (rect) {
      const x = event.clientX;
      const y = event.clientY;

      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return;
      }
    }

    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (!droppedFile) {
      return;
    }

    validateAndSetFile(droppedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setStatus("error");
      setMessage("Select an image before sending a request.");
      return;
    }

    setStatus("uploading");
    setMessage("Processing your image...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as RemoveBackgroundResponse;

      if (!response.ok || !("imageUrl" in payload)) {
        throw new Error(
          payload?.message ?? "Background removal provider is not connected yet."
        );
      }

      setResultUrl(payload.imageUrl);
      setStatus("success");
      setMessage("Background removed! Your transparent PNG is ready.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The request failed. Check the API route configuration."
      );
    }
  };

  return (
    <section className={styles.panel} aria-label="Upload and process image">
      <div className={styles.panelHeader}>
        <p className={styles.eyebrow}>Upload</p>
        <h2>Drop your image here.</h2>
        <p>
          Supports JPG, PNG, and WEBP up to 10 MB. In this demo, uploads are
          validated in request memory and are not written to disk.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label
          ref={dropzoneRef}
          className={`${styles.dropzone} ${
            isDragging ? styles.dropzoneActive : ""
          }`}
          htmlFor="image-upload"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.dropzoneContent}>
            <svg
              className={styles.uploadIcon}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 6L20 26"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M13 13L20 6L27 13"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 28V32C6 34.2091 7.79086 36 10 36L30 36C32.2091 36 34 34.2091 34 32V28"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className={styles.dropTitle}>
              {file
                ? file.name
                : isDragging
                  ? "Drop it here!"
                  : "Drag and drop or click to select"}
            </span>
            <span className={styles.dropSubtitle}>
              JPG, PNG, WEBP up to 10 MB
            </span>
          </div>
        </label>
        <input
          id="image-upload"
          className={styles.hiddenInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />

        <button
          className={styles.primaryButton}
          disabled={!file || status === "uploading"}
          type="submit"
        >
          {status === "uploading" ? (
            <span className={styles.buttonContent}>
              <span className={styles.spinner} aria-hidden="true" />
              Processing...
            </span>
          ) : (
            "Remove background"
          )}
        </button>

        <div className={styles.statusBox} data-status={status} role="status">
          {status === "uploading" && (
            <span className={styles.shimmerBar} aria-hidden="true" />
          )}
          {message}
        </div>
      </form>

      {(previewUrl || resultUrl) && (
        <div className={styles.previewGrid}>
          {previewUrl && (
            <article className={styles.previewCard}>
              <div className={styles.previewLabel}>Original</div>
              <div className={styles.previewFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Original upload preview" src={previewUrl} />
              </div>
            </article>
          )}

          {resultUrl && (
            <article className={styles.previewCard}>
              <div className={styles.previewLabel}>Result</div>
              <div className={`${styles.previewFrame} ${styles.outputFrame}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Background removed preview" src={resultUrl} />
              </div>
            </article>
          )}
        </div>
      )}
    </section>
  );
}
