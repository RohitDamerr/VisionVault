export type ElementTypes =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "container"
  | "section"
  | "link"
  | "2Col"
  | "3Col"
  | "video"
  | "image"
  | "__body"
  | null;

export type CategoryTypes = "Container" | "Text" | "Link" | "Basic" | null;

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: "center",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  opacity: "100%",
};

export const categoriesWithCustomSettings: CategoryTypes[] = [
  "Text",
  "Link",
  "Basic",
];
