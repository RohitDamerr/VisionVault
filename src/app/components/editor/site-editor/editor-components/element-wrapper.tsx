import { EditorElement, useEditor } from "@/app/providers/editor-provider";
import { Badge } from "@/components/ui/badge";
import { defaultStyles } from "@/lib/constants";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
  children: React.ReactNode;
  className?: string;
};

function ElementWrapper({ element, children, className }: Props) {
  const { state, dispatch } = useEditor();
  const isSelected = state.editor.selectedElement.id === element.id;

  const handleDeleteElement = () => {
    dispatch({ type: "DELETE_ELEMENT", payload: { elementDetails: element } });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_SELECTED_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  return (
    <div
      style={{
        width: element.styles.width || "auto",
        height: element.styles.height || "auto",
      }}
      className={clsx(className, "relative p-0", {
        "!border-blue-500 !border-2":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body",
        "!border-yellow-400 !border-4":
          isSelected &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "!border-solid": isSelected && !state.editor.liveMode,
        // "border-solid border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onClick={handleOnClickBody}
    >
      {isSelected && !state.editor.liveMode && (
        <Badge
          className={clsx(
            "absolute -top-[24px] -left-[1px] rounded-none rounded-t-lg bg-primary text-primary-foreground dark:bg-background dark:text-foreground",
          )}
          style={defaultStyles}
        >
          {element.name}
        </Badge>
      )}

      <div className="overflow-hidden">{children}</div>

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

export default ElementWrapper;
