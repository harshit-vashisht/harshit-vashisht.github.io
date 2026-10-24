import { useRef, useState } from "react";
import { Modal } from "./Modal";
export function ContactDialog({
  onClose,
  name,
  message,
  onName,
  onMessage,
}: {
  onClose: () => void;
  name: string;
  message: string;
  onName: (value: string) => void;
  onMessage: (value: string) => void;
}) {
  const [status, setStatus] = useState(""),
    form = useRef<HTMLFormElement>(null);
  function valid() {
    if (!form.current?.reportValidity()) return false;
    if (!name.trim() || !message.trim()) {
      setStatus("Please add your name and a few words about the idea.");
      return false;
    }
    return true;
  }
  function brief() {
    return `A WHAT IF FOR HARSHIT\n\nFrom: ${name.trim()}\n\n${message.trim()}\n`;
  }
  async function copy() {
    if (!valid()) return;
    try {
      await navigator.clipboard.writeText(brief());
      setStatus("Copied. Your brief is ready to share.");
    } catch {
      setStatus(
        "Clipboard unavailable here. Use Download .txt to save your brief.",
      );
    }
  }
  function download() {
    if (!valid()) return;
    const url = URL.createObjectURL(
      new Blob([brief()], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "a-what-if-for-harshit.txt";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Brief downloaded. Nothing was sent to a server.");
  }
  return (
    <Modal
      id="contact-dialog"
      titleId="contact-dialog-title"
      label="A good place to start"
      closeLabel="Close conversation"
      onClose={onClose}
    >
      <h2 id="contact-dialog-title">Tell me your what if.</h2>
      <p>
        Put a few thoughts together. You can copy or download your brief to
        share.
      </p>
      <form
        ref={form}
        id="inquiry-form"
        onSubmit={(event) => {
          event.preventDefault();
          void copy();
        }}
      >
        <label className="inquiry-label" htmlFor="inquiry-name">
          Your name
        </label>
        <input
          className="inquiry-field"
          id="inquiry-name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder="What should I call you?"
          value={name}
          onChange={(event) => onName(event.target.value)}
        />
        <label className="inquiry-label" htmlFor="inquiry-message">
          The idea
        </label>
        <textarea
          className="inquiry-field"
          id="inquiry-message"
          name="message"
          required
          maxLength={5000}
          placeholder="What if we built…"
          value={message}
          onChange={(event) => onMessage(event.target.value)}
        />
        <div className="inquiry-actions">
          <button type="submit" className="primary">
            Copy project brief <span>↗</span>
          </button>
          <button
            className="secondary"
            type="button"
            id="download-brief"
            onClick={download}
          >
            Download .txt ↓
          </button>
        </div>
        <p className="form-note">
          Local only. Nothing is sent or stored. Contact details haven’t been
          configured for this portfolio yet.
        </p>
        <p
          id="form-status"
          className="form-status"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      </form>
    </Modal>
  );
}
