import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function Modal({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.classList.add("modal-open");
    return () => {
      // Enable body scroll when modal is closed
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div
      className="backdrop"
      tabIndex={-1}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "gray",
        zIndex: 99,
      }}
    >
      <div
        className="modal"
        role="dialog"
        style={{
          zIndex: 100,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function File({
  fileName,
  gistId,
  fileContent,
  buttonText,
  onClick,
}: {
  gistId?: string;
  fileName: string;
  fileContent: string;
  buttonText: string;
  onClick?: () => void;
}) {
  const randomId = (Math.random() + 1).toString(36).substring(7);
  const [showModal, setShowModal] = useState(false);

  const [maxHeight, setMaxHeight] = useState("60vh");
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (height === 0) {
      const element = document.getElementById(randomId);
      if (element) {
        setHeight(element.getBoundingClientRect().height);
      }
    }
  }, [height, randomId]);

  // useEffect(() => {
  //   if (showModal) {

  //   }
  // }, [])

  const handleClickSeeMore = useCallback(() => {
    if (maxHeight === "90vh") {
      setMaxHeight("60vh");
      setShowModal(false);
    } else {
      setMaxHeight("90vh");
      setShowModal(true);
    }
  }, [maxHeight]);

  const showSeeMoreButton = useMemo(
    () => height > 0 && height > window.innerHeight * 0.6,
    [height]
  );

  const file = useMemo(
    () => (
      <li
        id={fileName}
        style={{ backgroundColor: "white", position: "relative" }}
      >
        <div
          className="isFlexible alignCenter"
          style={{ position: "absolute", top: 6, right: 10, gap: "6px" }}
        >
          {gistId && (
            <Link to={`/${gistId}`} className="gist-link">
              View Gist Details
            </Link>
          )}
          <button onClick={onClick}>{buttonText}</button>
        </div>
        <details open>
          <summary style={{ maxWidth: "80vw" }}>{fileName}</summary>

          <div
            style={{
              maxHeight,
              overflow: maxHeight === "90vh" ? `auto` : "hidden",
            }}
          >
            <pre id={randomId}>
              <code>{fileContent}</code>
            </pre>
          </div>
          {showSeeMoreButton && (
            <button onClick={handleClickSeeMore}>
              {maxHeight === "90vh" ? "Close" : "See More"}
            </button>
          )}
        </details>
      </li>
    ),
    [
      buttonText,
      fileContent,
      fileName,
      gistId,
      handleClickSeeMore,
      maxHeight,
      onClick,
      randomId,
      showSeeMoreButton,
    ]
  );

  return <>{showModal ? <Modal>{file}</Modal> : file}</>;
}

export default File;
