import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import { SetSelectedLocationAction } from "@/types/actions/LocationActions";
import { fetchWeather } from "../features/weather/weatherSlice";
import { Location } from "@/types/Location";

// Define a type guard
function isSetSelectedLocationAction(action: any): action is SetSelectedLocationAction {
  return action.type === 'location/setSelectedLocation';
}
export const weatherMiddleware:  Middleware<{}, RootState, AppDispatch> = (api: MiddlewareAPI<AppDispatch, RootState>) => next => action => {
  console.log("Action intercepted: ",action)
  if (isSetSelectedLocationAction(action)) {
    // Now TypeScript knows `action` is `SetSelectedLocationAction`
    // const selectedLocationAction = action as SetSelectedLocationAction;
    const locationPayload: Location = action.payload;
    api.dispatch(fetchWeather(locationPayload));
  }
    return next(action);
  };