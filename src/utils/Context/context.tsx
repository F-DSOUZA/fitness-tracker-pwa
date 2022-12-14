import React, { useContext, useMemo, useReducer } from 'react';

export type Workout = {
  workout_date: string;
  workout_type: string;
};

type State = {
  tracker: Array<Workout | null>;
  filteredWorkouts: Array<Workout | null>;
};

type children = {
  children: React.ReactNode;
};
type FTResponse = {
  success: boolean;
  data: Array<Workout | null>;
};

type ActionType = 'getWorkouts' | 'filterWorkouts' | 'addWorkout';
type Actions = { type: ActionType; data: Array<Workout | null> };

type API = {
  onFilterWorkouts: (
    uuid: string,
    month: string,
    year: string,
    token: string
  ) => void;
  onCreateWorkouts: (uuid: string, data: FormData, token: string) => void;
  onGetWorkouts: (uuid: string, token: string) => void;
};

const getFilterURL = (
  uuid: string,
  month: string,
  year: string,
  token: string
) =>
  `http://localhost:3000/filter?month=${month}&year=${year}&uuid=${uuid}&token=${token}`;
const getURL = (uuid: string, token: string) =>
  `http://localhost:3000?uuid=${uuid}&token=${token}`;
const getPostURL = (uuid: string, token: string) =>
  `http://localhost:3000?uuid=${uuid}&token=${token}`;

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'getWorkouts':
      return { ...state, tracker: action.data || [] };
    case 'filterWorkouts':
      return {
        ...state,
        filteredWorkouts: action.data || [],
      };
    case 'addWorkout':
      return { ...state, tracker: action.data || [] };
    default:
      return state;
  }
};

const FilterContext = React.createContext<State['filteredWorkouts']>(
  [] as Array<Workout | null>
);
const TrackerContext = React.createContext<State['tracker']>([] as Array<null>);
const ApiContext = React.createContext<API>({} as API);

export const TrackerDataProvider = (props: children) => {
  const [state, dispatch] = useReducer(reducer, {} as State);

  //  const getData = async (
  //    url: string,
  //    actionType: Actions['type'],
  //    payload?: FormData
  //  ) => {
  //    console.log(url);
  //    const options =
  //      actionType === 'addWorkout' && payload
  //        ? {
  //            headers: { mode: 'cors', 'Content-Type': 'application/json' },
  //            method: 'POST',
  //            body: JSON.stringify(Object.fromEntries(payload)),
  //          }
  //        : undefined;
  //    console.log(payload?.get('workout_type'));
  //
  //    const fetchResult = await fetch(url, options);
  //    const result: FTResponse = (await fetchResult.json()) as FTResponse;
  //
  //    dispatch({ type: actionType, data: result.data });
  //  };

  const executeRequest = async (
    url: string,
    actionType: Actions['type'],
    payload?: FormData
  ) => {
    const options = payload
      ? getRequestOptions(actionType, payload)
      : undefined;
    const fetchResult = await fetch(url, options);
    const result: FTResponse = (await fetchResult.json()) as FTResponse;

    dispatch({ type: actionType, data: result.data });
  };

  const getRequestOptions = (actionType: string, payload: FormData) => {
    if (actionType === 'addWorkout' && payload) {
      return {
        headers: { mode: 'cors', 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(payload)),
      };
    }
  };

  //everytime state changes all of the state handler fns would be recreated as well, meaning any components using the handlers and the state would be re-rendered
  //to avoid this we memoize the state handlers and pass it in a separate context so they can be accessed separately from the state object
  //how can i test this?
  //when does use memo recalculate?
  //1remove it from use memo
  //2/change date

  const api = useMemo(() => {
    const onFilterWorkouts = async (
      uuid: string,
      month: string,
      year: string,
      token: string
    ) => {
      await executeRequest(
        getFilterURL(uuid, month, year, token),
        'filterWorkouts'
      );
    };
    const onCreateWorkouts = async (
      uuid: string,
      data: FormData,
      token: string
    ) => {
      await executeRequest(getPostURL(uuid, token), 'addWorkout', data);
    };
    const onGetWorkouts = async (uuid: string, token: string) => {
      await executeRequest(getURL(uuid, token), 'getWorkouts');
    };
    return {
      onCreateWorkouts,
      onGetWorkouts,
      onFilterWorkouts,
    };
  }, []);

  return (
    <ApiContext.Provider value={api}>
      <FilterContext.Provider value={state.filteredWorkouts}>
        <TrackerContext.Provider value={state.tracker}>
          {props.children}
        </TrackerContext.Provider>
      </FilterContext.Provider>
    </ApiContext.Provider>
  );
};

export const useTrackerContext = () => useContext(TrackerContext);
export const useApiContext = () => useContext(ApiContext);
export const useFilterContext = () => useContext(FilterContext);
