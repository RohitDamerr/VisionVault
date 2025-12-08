import { DeviceTypes, EditorElement } from "./editor-provider";

export type EditorAction =
  | {
      type: "ADD_ELEMENT";
      payload: {
        containerId: string;
        elementDetails: EditorElement;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: "DELETE_ELEMENT";
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: "CHANGE_SELECTED_ELEMENT";
      payload: {
        elementDetails?:
          | EditorElement
          | {
              id: "";
              content: [];
              name: "";
              styles: object;
              type: null;
              category: null;
            };
      };
    }
  | {
      type: "CHANGE_DEVICE";
      payload: {
        device: DeviceTypes;
      };
    }
  | { type: "TOGGLE_PREVIEW_MODE" }
  | { type: "TOGGLE_LIVE_MODE"; payload?: { value: boolean } }
  | { type: "TOGGLE_VISIBILITY_STATUS"; payload?: { value: boolean } }
  | { type: "UNDO" }
  | { type: "REDO" }
  | {
      type: "LOAD_DATA";
      payload: { elements: EditorElement[]; withLive: boolean };
    }
  | { type: "SET_SITE_ID"; payload: { siteId: string } };
