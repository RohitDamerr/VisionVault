"use client";

import { EditorElement, useEditor } from "@/app/providers/editor-provider";
import { JSX } from "react";
import ElementWrapper from "./element-wrapper";

type Props = {
  element: EditorElement;
};

function TextComponent({ element }: Props) {
  const { state, dispatch } = useEditor();

  const handleBlur = (e: React.FocusEvent<Element>) => {
    const textElement = e.target as HTMLElement;
    const newText = textElement.innerText.trim();
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: { innerText: newText },
        },
      },
    });
  };

  const TextTag = element.type as keyof JSX.IntrinsicElements;

  return (
    <ElementWrapper element={element}>
      <div
        style={element.styles}
        className="p-[2px] w-full relative transition-all overflow-auto"
      >
        <TextTag
          contentEditable={!state.editor.liveMode}
          suppressContentEditableWarning
          onBlur={handleBlur}
          className="border-none outline-none"
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          {!Array.isArray(element.content) && element.content.innerText}
        </TextTag>
      </div>
    </ElementWrapper>
  );
}

export default TextComponent;
