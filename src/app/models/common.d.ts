

/** Modelo con una propiedad */
export interface IPropertyModel<T> {
    /** Nombre de la propiedad */
    PropertyName: string;
    /** Valor de la propiedad */
    PropertyValue: T;
}

export interface IRangeListModel<T> {
    TotalListItems: number;
    RangeItems: T[];
}

export interface IRangeDynamicListModel<T> {
    TotalListItems: number;
    RangeItems: IDynamic<T>;
}

/** Modelo para implementar una ordenacion sobre una propiedad en operaciones con filtros */
export interface ISortFilterModel {
    /** Nombre de la propiedad en el filtro */
    SortPropertyName: string;
    /** Orden de clasificacion establecido por la enumeracion ::enumSortOrder. */
    SortOrder?: infraestructure.enumSortOrder;
}

/** Modelo para implementar un filtro generico para un rango de valores con orden de clasificacion (Elementos ordenados) */
export interface IRangeFilterModel<T> extends ISortFilterModel {
    /** Indice incial del rango */
    Skip: T;
    /** Numero de elementos a obtener */
    Take: T;
}

/** Modelo para implementar un filtro base con paginacion, identificadores y busqueda general */
export interface IBaseFilterModel extends IRangeFilterModel<number> {
    // ...
}


