"use client";

import { useEditor } from "@/app/providers/editor-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import TypographySettings from "./typography-settings";
import AppearanceSettings from "./appearance-settings";
import { Textarea } from "@/components/ui/textarea";
import TransformSettings from "./transform-settings";
import StrokeSettings from "./stroke-settings";
import { categoriesWithCustomSettings } from "@/lib/constants";

const SettingsTab = () => {
  const { state, dispatch } = useEditor();

  const handleCustomValuesChange = (e: any) => {
    const settingProperty = e.target.id;
    const value = e.target.value;
    const styleObject = { [settingProperty]: value };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleOnChange = (e: any) => {
    const styleSettings = e.target.id;
    const value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleSelectChange = (value: string, property: string) => {
    const styleObject = {
      [property]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={[
        "Custom",
        "Transform",
        "Appearance",
        "Typography",
        "Stroke",
      ]}
    >
      <AccordionItem
        value="Custom"
        className="px-2 py-0"
        hidden={
          !categoriesWithCustomSettings.includes(
            state.editor.selectedElement.category,
          )
        }
      >
        <AccordionTrigger className="!no-underline capitalize">
          {state.editor.selectedElement.category === "Text"
            ? "Text"
            : state.editor.selectedElement.type}
        </AccordionTrigger>
        <AccordionContent className="px-1">
          {(() => {
            if (Array.isArray(state.editor.selectedElement.content))
              return null;

            switch (state.editor.selectedElement.category) {
              case "Link":
                return (
                  <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground">Link Path</p>
                    <Input
                      id="href"
                      placeholder="https:www.visionvault.site/editor"
                      onChange={handleCustomValuesChange}
                      value={state.editor.selectedElement.content.href}
                    />
                  </div>
                );
              case "Text":
                return (
                  <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground">Content</p>
                    <Textarea
                      id="innerText"
                      placeholder="Enter text..."
                      onChange={handleCustomValuesChange}
                      value={state.editor.selectedElement.content.innerText}
                    />
                  </div>
                );
              case "Basic":
                switch (state.editor.selectedElement.type) {
                  case "image":
                    return (
                      <div className="grid grid-rows-2 gap-2">
                        <div className="flex flex-col gap-2">
                          <p className="text-muted-foreground">Image Url</p>
                          <Input
                            id="imageUrl"
                            placeholder="Enter Url..."
                            onChange={handleCustomValuesChange}
                            value={
                              state.editor.selectedElement.content.imageUrl
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-muted-foreground">Alt Text</p>
                          <Input
                            id="altText"
                            placeholder="Enter alt text..."
                            onChange={handleCustomValuesChange}
                            value={state.editor.selectedElement.content.altText}
                          />
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              default:
                return null;
            }
          })()}
        </AccordionContent>
      </AccordionItem>
      <TransformSettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
      <AppearanceSettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
      <TypographySettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
      <StrokeSettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
    </Accordion>
  );
};

export default SettingsTab;
