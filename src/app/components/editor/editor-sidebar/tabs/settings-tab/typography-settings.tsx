import { useEditor } from "@/app/providers/editor-provider";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ColorPicker } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  CaseLower,
  CaseSensitive,
  CaseUpper,
  Type,
} from "lucide-react";
import { useState } from "react";

type Props = {
  handleOnChange: (e: any) => void;
  handleSelectChange: (value: string, property: string) => void;
};

const TypographySettings = ({ handleOnChange, handleSelectChange }: Props) => {
  const { state } = useEditor();
  const [inputColor, setInputColor] = useState(
    state.editor.selectedElement.styles.color || "#ffffff"
  );

  return (
    <AccordionItem value="Typography" className="px-2 py-0 border-y-[1px]">
      <AccordionTrigger className="!no-underline">Typography</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-4 px-1">
          <div className="w-full">
            <p className="mb-2 text-muted-foreground">Color</p>
            <div className="flex space-x-2">
              <ColorPicker
                onChange={(color: string) => {
                  const e = { target: { id: "color", value: color } };
                  handleOnChange(e);
                  setInputColor(color);
                }}
                id="Color"
                value={state.editor.selectedElement.styles.color || "#ffffff"}
              />
              <Input
                id="color"
                type="text"
                maxLength={7}
                value={inputColor}
                onChange={(e) => {
                  const color = e.target.value;
                  setInputColor(color);
                  if (color.match(/^#[0-9A-Fa-f]{6}$/)) {
                    const event = { target: { id: "color", value: color } };
                    handleOnChange(event);
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Font</p>
              <Select
                onValueChange={(value: string) =>
                  handleSelectChange(value, "fontFamily")
                }
                value={state.editor.selectedElement.styles.fontFamily || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial" style={{ fontFamily: "Arial" }}>
                    Arial
                  </SelectItem>
                  <SelectItem
                    value="Times New Roman"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    Times New Roman
                  </SelectItem>
                  <SelectItem
                    value="Helvetica"
                    style={{ fontFamily: "Helvetica" }}
                  >
                    Helvetica
                  </SelectItem>
                  <SelectItem value="Inter" style={{ fontFamily: "Inter" }}>
                    Inter
                  </SelectItem>
                  <SelectItem value="Roboto" style={{ fontFamily: "Roboto" }}>
                    Roboto
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Weight</p>
              <Select
                onValueChange={(value: string) =>
                  handleSelectChange(value, "fontWeight")
                }
                value={
                  (state.editor.selectedElement.styles.fontWeight as string) ||
                  "300"
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300" style={{ fontWeight: 300 }}>
                    Light
                  </SelectItem>
                  <SelectItem value="400" style={{ fontWeight: 400 }}>
                    Regular
                  </SelectItem>
                  <SelectItem value="500" style={{ fontWeight: 500 }}>
                    Medium
                  </SelectItem>
                  <SelectItem value="600" style={{ fontWeight: 600 }}>
                    Semi Bold
                  </SelectItem>
                  <SelectItem value="700" style={{ fontWeight: 700 }}>
                    Bold
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Size</p>
              <Input
                id="fontSize"
                type="text"
                placeholder="16px"
                value={state.editor.selectedElement.styles.fontSize || ""}
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Line Height</p>
              <Input
                id="lineHeight"
                type="text"
                placeholder="1.5"
                value={state.editor.selectedElement.styles.lineHeight || ""}
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Letter Spacing</p>
              <Input
                id="letterSpacing"
                type="text"
                placeholder="0px"
                value={state.editor.selectedElement.styles.letterSpacing || ""}
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Text Alignment</p>
              <Tabs
                value={state.editor.selectedElement.styles.textAlign || "left"}
                onValueChange={(value: string) =>
                  handleSelectChange(value, "textAlign")
                }
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="left">
                    <AlignLeft strokeWidth={2} className="h-4 w-4 scale-[4]" />
                  </TabsTrigger>
                  <TabsTrigger value="center">
                    <AlignCenter
                      strokeWidth={2}
                      className="h-4 w-4 scale-[4]"
                    />
                  </TabsTrigger>
                  <TabsTrigger value="right">
                    <AlignRight strokeWidth={2} className="h-4 w-4 scale-[4]" />
                  </TabsTrigger>
                  <TabsTrigger value="justify">
                    <AlignJustify
                      strokeWidth={2}
                      className="h-4 w-4 scale-[4]"
                    />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Transform</p>
              <Tabs
                value={
                  state.editor.selectedElement.styles.textTransform || "normal"
                }
                onValueChange={(value: string) =>
                  handleSelectChange(value, "textTransform")
                }
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="normal">
                    <Type strokeWidth={2} className="h-4 w-4 scale-[4]" />
                  </TabsTrigger>
                  <TabsTrigger value="capitalize">
                    <CaseSensitive
                      strokeWidth={2}
                      className="h-4 w-4 scale-[4]"
                    />
                  </TabsTrigger>
                  <TabsTrigger value="uppercase">
                    <CaseUpper strokeWidth={2} className="h-4 w-4 scale-[4]" />
                  </TabsTrigger>
                  <TabsTrigger value="lowercase">
                    <CaseLower strokeWidth={2} className="h-4 w-4 scale-[4]" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TypographySettings;
