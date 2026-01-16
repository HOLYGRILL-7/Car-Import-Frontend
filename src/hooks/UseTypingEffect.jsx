import { useEffect, useState } from "react";

const useTypingEffect = (
  placeholderTexts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pausedDuration = 2000,
) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = placeholderTexts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (charIndex < currentText.length) {
            setDisplayText(currentText.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            // Pause then start deleting
            setTimeout(() => setIsDeleting(true), pausedDuration);
          }
        } else {
          // Deleting
          if (charIndex > 0) {
            setDisplayText(currentText.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            // Move to next text
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % placeholderTexts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    textIndex,
    placeholderTexts,
    typingSpeed,
    deletingSpeed,
    pausedDuration,
  ]);

  return displayText;
};

export default useTypingEffect;
