import { useEditor } from "@/app/providers/editor-provider";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ColorPicker } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  handleOnChange: (e: any) => void;
  handleSelectChange: (value: string, property: string) => void;
};

function StrokeSettings({ handleOnChange }: Props) {
  const { state } = useEditor();

  return (
    <AccordionItem value="Stroke" className="px-2 py-0 border-y-[1px]">
      <AccordionTrigger className="!no-underline">Stroke</AccordionTrigger>
      <AccordionContent className="flex flex-col px-1 gap-4">
        <div>
          <p className="mb-2 text-muted-foreground">Border Width</p>
          <Input
            id="borderWidth"
            placeholder="0px"
            value={state.editor.selectedElement.styles.borderWidth || ""}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <p className="mb-2 text-muted-foreground">Border Color</p>
          <div className="flex gap-2">
            <ColorPicker
              onChange={(color: string) => {
                const e = { target: { id: "borderColor", value: color } };
                handleOnChange(e);
              }}
              id="borderColor"
              value={state.editor.selectedElement.styles.borderColor || "#ffff"}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-muted-foreground">Border Radius</p>
          <Input
            id="borderRadius"
            placeholder="0px"
            value={state.editor.selectedElement.styles.borderRadius || ""}
            onChange={handleOnChange}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default StrokeSettings;
