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
  onFilterWorkouts: (uuid: string, month: string, year: string) => void;
  onCreateWorkouts: (uuid: string, data: FormData) => void;
  onGetWorkouts: (uuid: string) => void;
};

const filterURL = (uuid: string, month: string, year: string) =>
  `http://localhost:3000/filter?month=${month}&year=${year}&uuid=${uuid}`;
const getURL = (uuid: string) => `http://localhost:3000?uuid=${uuid}`;
const postURL = (uuid: string) => `http://localhost:3000?uuid=${uuid}`;

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
  const getData = async (
    url: string,
    actionType: Actions['type'],
    payload?: FormData
  ) => {
    console.log(url);
    const options = payload
      ? {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      : undefined;

    const fetchResult = await fetch(url, options);
    const result: FTResponse = (await fetchResult.json()) as FTResponse;

    dispatch({ type: actionType, data: result.data });
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
      year: string
    ) => {
      await getData(filterURL(uuid, month, year), 'filterWorkouts');
    };
    const onCreateWorkouts = async (uuid: string, data: FormData) => {
      await getData(postURL(uuid), 'addWorkout', data);
    };
    const onGetWorkouts = async (uuid: string) => {
      await getData(getURL(uuid), 'getWorkouts');
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
