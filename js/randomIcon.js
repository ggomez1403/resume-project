const icons = [
  "computer",
  "terminal",
  "laptop-code",
  "circle-nodes",
  "file-code",
  "folder-open",
  "globe",
  "fingerprint",
  "laptop-file",
  "floppy-disk",
];

export const selectRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};
