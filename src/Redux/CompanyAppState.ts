import { CompanyModel } from "../Models/Company";

export class CompanyAppState {
    public companies: CompanyModel[] =[];
}

export enum CompanyActionType {
    CompaniesDownloaded = "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted",
    CompaniesClear = "CompaniesClear"
}

export interface CompanyAction{
    type: CompanyActionType;
    payload?: any; 
}

export function companiesDownloadedAction(companies: CompanyModel[]): CompanyAction{
    return { type: CompanyActionType.CompaniesDownloaded, payload: companies };
}

export function companyAddedAction(company: CompanyModel): CompanyAction{
    return { type: CompanyActionType.CompanyAdded, payload: company };
}

export function companyUpdatedAction(company: CompanyModel): CompanyAction{
    return { type: CompanyActionType.CompanyUpdated, payload: company };
}

export function companyDeletedAction(id: number): CompanyAction{
    return { type: CompanyActionType.CompanyDeleted, payload: id };
}

export function companiesClearAction(): CompanyAction {
    return { type: CompanyActionType.CompaniesClear, payload: {} };
}

export function companiesReducer(
    currentState: CompanyAppState = new CompanyAppState(),
    action: CompanyAction): CompanyAppState {
    const newState = { ...currentState};
    switch (action.type) {
        case CompanyActionType.CompaniesDownloaded:
            newState.companies = action.payload;
            break;
        case CompanyActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;
        case CompanyActionType.CompanyUpdated:
            const idx = newState.companies.findIndex((company) => company.id === action.payload.id);
            newState.companies[idx] = action.payload;
            break;
        case CompanyActionType.CompanyDeleted:
            newState.companies = newState.companies.filter(company => company.id !== action.payload);
            break;
        case CompanyActionType.CompaniesClear:
            newState.companies = [];
            break;
    }
    return newState;
}