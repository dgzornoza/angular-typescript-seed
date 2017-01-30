import { infraestructure } from "app/infraestructure";

export interface IBaseModel {
    id: number;
}

/** Modelo con una propiedad */
export interface IPropertyModel<T> {
    /** Nombre de la propiedad */
    propertyName: string;
    /** Valor de la propiedad */
    propertyValue: T;
}

export interface IRangeListModel<T> {
    /** Registros totales sin filtrar */
    totalItems: number;
    /** Registros totales como resultado de un filtrado */
    totalFilteredItems: number;
    /** Items de la lista */
    rangeItems: T[];
}

export interface IRangeDynamicListModel<T> {
    /** Registros totales sin filtrar */
    totalItems?: number;
    /** Registros totales como resultado de un filtrado */
    totalFilteredItems: number;
	/** Items de la lista */
    rangeItems: IDynamic<T>;
}

/** Modelo para implementar una ordenacion sobre una propiedad en operaciones con filtros */
export interface ISortFilterModel {
    /** Nombre de la propiedad en el filtro */
    sortPropertyName?: string;
    /** Orden de clasificacion establecido por la enumeracion ::enumSortOrder. */
    sortOrder?: infraestructure.enumSortOrder;
}

/** Modelo para implementar un filtro generico para un rango de valores con orden de clasificacion (Elementos ordenados) */
export interface IRangeFilterModel<T> extends ISortFilterModel {
    /** Indice incial del rango */
    skip: T;
    /** Numero de elementos a obtener */
    take: T;
}

/** Modelo para implementar un filtro base con paginacion, identificadores y busqueda general */
export interface IBaseFilterModel extends IRangeFilterModel<number> {
    /** Enumeracion de identificadores unicos para el filtro */
    ids?: number[];
    /** Cadena usada en el filtro para una busqueda general en cualquier campo string */
    search?: string;
}


