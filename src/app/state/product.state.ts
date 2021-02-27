export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface AppDataState<T>{
    dataState?:string,
    data?:T,
    errorMessage?:string,
}