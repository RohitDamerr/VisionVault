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

function AppearanceSettings({ handleOnChange }: Props) {
  const { state } = useEditor();

  return (
    <AccordionItem value="Appearance" className="px-2 py-0 border-y-[1px]">
      <AccordionTrigger className="!no-underline">Appearance</AccordionTrigger>
      <AccordionContent className="flex flex-col px-1 gap-4">
        <div className="w-full">
          <p className="mb-2 text-muted-foreground">Fill Color</p>
          <div className="flex space-x-2">
            <ColorPicker
              onChange={(color: string) => {
                const e = { target: { id: "backgroundColor", value: color } };
                handleOnChange(e);
              }}
              id="backgroundColor"
              value={
                state.editor.selectedElement.styles.backgroundColor || "#ffff"
              }
            />
            <Input
              id="backgroundCOlor"
              type="text"
              maxLength={7}
              value={
                state.editor.selectedElement.styles.backgroundColor || "#ffff"
              }
              onChange={handleOnChange}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default AppearanceSettings;
