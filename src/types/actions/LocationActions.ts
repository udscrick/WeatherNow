// Action type constants
const SET_SELECTED_LOCATION = 'location/setSelectedLocation';

// Interface for the location action's payload
interface Location {
  city: string;
}

// Action interfaces
export interface SetSelectedLocationAction {
  type: typeof SET_SELECTED_LOCATION;
  payload: Location;
}

