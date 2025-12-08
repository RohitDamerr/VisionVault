"use client";
import { EditorElement, useEditor } from "@/app/providers/editor-provider";
import { Badge } from "@/components/ui/badge";
import { defaultStyles, ElementTypes } from "@/lib/constants";
import { createId } from "@paralleldrive/cuid2";
import clsx from "clsx";
import Recursive from "./recursive";
import { Trash } from "lucide-react";
import { useState } from "react";

type Props = { element: EditorElement };

function Container({ element }: Props) {
  const { id, content, name, styles, type } = element;
  const { state, dispatch } = useEditor();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const isSelected = state.editor.selectedElement.id === id;

  const handleOnDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDraggingOver(false);
    const componentType = e.dataTransfer.getData(
      "componentType",
    ) as ElementTypes;
    switch (componentType) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: `Heading ${componentType.charAt(1)}`,
              },
              id: createId(),
              name: `Heading ${componentType.charAt(1)}`,
              styles: {
                color: "black",
                ...defaultStyles,
                fontSize:
                  componentType === "h1"
                    ? "2.5rem"
                    : componentType === "h2"
                      ? "2rem"
                      : componentType === "h3"
                        ? "1.75rem"
                        : componentType === "h4"
                          ? "1.5rem"
                          : componentType === "h5"
                            ? "1.25rem"
                            : "1rem",
                fontWeight:
                  componentType === "h1" || componentType === "h2"
                    ? "700"
                    : "600",
                lineHeight: "1.2",
                marginBottom: "0.5rem",
              },
              type: componentType,
              category: "Text",
            },
          },
        });
        break;
      case "p":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: "Paragraph",
              },
              id: createId(),
              name: "Paragraph",
              styles: {
                color: "black",
                ...defaultStyles,
                fontSize: "1rem",
                lineHeight: "1.5",
                marginBottom: "1rem",
              },
              type: componentType,
              category: "Text",
            },
          },
        });
        break;
      case "span":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: "Text",
              },
              id: createId(),
              name: "Text",
              styles: {
                color: "black",
                ...defaultStyles,
                fontSize: "1rem",
                display: "inline",
              },
              type: componentType,
              category: "Text",
            },
          },
        });
        break;
      case "image":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                imageUrl: undefined,
                altText: undefined,
              },
              id: createId(),
              name: "Image",
              styles: {},
              type: componentType,
              category: "Basic",
            },
          },
        });
        break;
      case "container":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: createId(),
              name: "Container",
              styles: {
                ...defaultStyles,
              },
              type: "container",
              category: "Container",
            },
          },
        });
        break;
      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                  category: "Container",
                },
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                  category: "Container",
                },
              ],
              id: createId(),
              name: "Two Columns",
              styles: {
                ...defaultStyles,
                display: "flex",
              },
              type: "2Col",
              category: "Container",
            },
          },
        });
        break;
      case "3Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                  category: "Container",
                },
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                  category: "Container",
                },
                {
                  content: [],
                  id: createId(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                  category: "Container",
                },
              ],
              id: createId(),
              name: "Three Columns",
              styles: {
                ...defaultStyles,
                display: "flex",
              },
              type: "3Col",
              category: "Container",
            },
          },
        });
        break;
      default:
    }
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_SELECTED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({ type: "DELETE_ELEMENT", payload: { elementDetails: element } });
  };

  return (
    <div
      className={clsx("relative group my-1", {
        "max-w-full w-full":
          (type === "container" || type === "2Col") && !styles?.width,
        "h-fit": type === "container" && !styles?.height,
        "h-full": type === "__body",
        "!h-screen !m-0 !rounded-none":
          type === "__body" && state.editor.liveMode,
        "flex flex-col md:!flex-row": type === "2Col",
        "!w-[350px]": type === "__body" && state.editor.device === "Mobile",
        "!w-[800px]": type === "__body" && state.editor.device === "Tablet",
        "!w-full": type === "__body" && state.editor.device === "Desktop",
        "transition-[width,height]": type == "__body",
        "!outline-blue-500 !outline-2":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body" &&
          !isDraggingOver,
        "!outline-yellow-400 !outline-4":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "!outline-yellow-400 !outline-solid !outline-2": isDraggingOver,
        "!outline-4": isDraggingOver && type === "__body",
        "!outline-solid": isSelected && !state.editor.liveMode,
        "outline-dashed outline-[1px] outline-slate-300":
          !state.editor.liveMode,
      })}
      style={{ width: styles?.width, height: styles?.height }}
      onDrop={(e) => {
        handleOnDrop(e);
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragStart={(e) => handleDragStart(e, "container")}
      onClick={handleOnClickBody}
    >
      <Badge
        className={clsx(
          "absolute -top-[24px] -left-[1px] rounded-none rounded-t-lg hidden cursor-default bg-primary text-primary-foreground dark:bg-background dark:text-foreground",
          {
            block: isSelected && !state.editor.liveMode,
          },
        )}
      >
        {name}
      </Badge>

      <div
        style={{ ...styles, width: undefined, height: undefined }}
        className="w-full h-full p-4"
      >
        {Array.isArray(content) &&
          content.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>

      {isSelected &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[26px] -right-[1px] rounded-none rounded-t-lg dark:bg-background">
            <Trash
              className="cursor-pointer text-primary-foreground dark:text-foreground"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
}

export default Container;
