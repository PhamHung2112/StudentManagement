import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListParams, ListResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
  filter: ListParams;
}

const initialState: CityState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 5,
  },
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

export const cityActions = citySlice.actions;

export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityFilter = (state: RootState) => state.city.filter;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);
export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

const cityReducer = citySlice.reducer;
export default cityReducer;
