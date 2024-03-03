// Action type constants
const SET_SELECTED_IMAGE = 'image/setImageInfo';

// Interface for the location action's payload
// interface Image {
//   city: string;
// }

// Action interfaces
export interface SetSelectedImageAction {
  type: typeof SET_SELECTED_IMAGE;
  payload: any;
}

