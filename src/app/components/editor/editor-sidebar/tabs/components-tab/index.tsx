import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import ElementPlaceholder from "./element-placeholder";
import { elements } from "./elements";

function ComponentsTab() {
  const layoutCategories = [
    ...new Set(
      elements.filter((el) => el.group === "layout").map((el) => el.category)
    ),
  ];
  const elementCategories = [
    ...new Set(
      elements.filter((el) => el.group === "element").map((el) => el.category)
    ),
  ];

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      <AccordionItem value="Layout" className="px-2 py-0">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent>
          {layoutCategories.map((category) => (
            <div key={category} className="mb-4">
              <h4 className="mb-2 text-xs font-medium text-muted-foreground">
                {category}
              </h4>
              <div>
                {elements
                  .filter(
                    (element) =>
                      element.group === "layout" &&
                      element.category === category
                  )
                  .map((element) => (
                    <ElementPlaceholder
                      key={element.id}
                      type={element.id}
                      Icon={element.icon}
                      title={element.label}
                    />
                  ))}
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-2 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent>
          {elementCategories.map((category) => (
            <div key={category} className="mb-4">
              <h4 className="mb-2 text-xs font-medium text-muted-foreground">
                {category}
              </h4>
              <div>
                {elements
                  .filter(
                    (element) =>
                      element.group === "element" &&
                      element.category === category
                  )
                  .map((element) => (
                    <ElementPlaceholder
                      key={element.id}
                      type={element.id}
                      Icon={element.icon}
                      title={element.label}
                    />
                  ))}
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ComponentsTab;
