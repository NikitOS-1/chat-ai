import type {TypedUseSelectorHook} from 'react-redux';
import {useSelector} from 'react-redux';
import {RootState} from "../store/store.ts";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
