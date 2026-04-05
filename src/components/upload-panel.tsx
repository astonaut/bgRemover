"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./upload-panel.module.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type Status = "idle" | "ready" | "uploading" | "error" | "success";

export function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState(
    "Choose an image to preview the upload flow. The API route is stubbed for now."
  );

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

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
    setMessage("Image selected. Click remove background to test the request flow.");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setStatus("error");
      setMessage("Select an image before sending a request.");
      return;
    }

    setStatus("uploading");
    setMessage("Uploading image and waiting for the background removal service...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as
        | { imageUrl?: string; message?: string }
        | undefined;

      if (!response.ok || !payload?.imageUrl) {
        throw new Error(
          payload?.message ?? "Background removal provider is not connected yet."
        );
      }

      setResultUrl(payload.imageUrl);
      setStatus("success");
      setMessage("Background removed. The transparent PNG is ready to review.");
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
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <p className={styles.eyebrow}>Upload Flow</p>
        <h2>One clear path from upload to transparent PNG.</h2>
        <p>
          The UI is ready now. Replace the placeholder API route with your real
          image segmentation provider when you are ready to ship.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.dropzone} htmlFor="image-upload">
          <span className={styles.dropTitle}>
            {file ? file.name : "Drop your product shot, portrait, or logo here"}
          </span>
          <span className={styles.dropSubtitle}>
            Supports JPG, PNG, WEBP up to 10 MB
          </span>
          <span className={styles.dropButton}>Choose image</span>
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
          {status === "uploading" ? "Processing..." : "Remove background"}
        </button>

        <div className={styles.statusBox} data-status={status}>
          {message}
        </div>
      </form>

      <div className={styles.previewGrid}>
        <article className={styles.previewCard}>
          <div className={styles.previewLabel}>Original image</div>
          <div className={styles.previewFrame}>
            {previewUrl ? (
              <>
                {/* Using a native img element here keeps local blob previews simple. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Original upload preview" src={previewUrl} />
              </>
            ) : (
              <div className={styles.placeholder}>
                Preview appears here after file selection.
              </div>
            )}
          </div>
        </article>

        <article className={styles.previewCard}>
          <div className={styles.previewLabel}>Processed output</div>
          <div className={`${styles.previewFrame} ${styles.outputFrame}`}>
            {resultUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Background removed preview" src={resultUrl} />
              </>
            ) : (
              <div className={styles.placeholder}>
                Connect <code>/api/remove-background</code> to render the final
                transparent PNG here.
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
