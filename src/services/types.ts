type Activity = string
type StandType = string
type ParticipationType = string
type PartnerStatus = string
type Field<T> = {
    SORT: number
    NAME: string
    EDITABLE: boolean
    EDITABLE_TYPE: string,
    LINK_TEXT: string,
    HEADER_FILTER: boolean,
    HEADER_FILTER_TYPE: string,
    maxWidth?: number
    minWidth?: number
    defaultWidth?: number
    TYPE: T
}

export type CompanyFields = {
    ID: Field<number>,
    MODIFIED: Field<Date>,
    NAME: Field<string>,
    ACTIVITY: Field<string>,
    PARTICIPATION_TYPE: Field<string>,
    STAND_TYPE: Field<string>,
    CONTACT_NAME: Field<string>,
    CONTACT_JOB: Field<string>,
    CONTACT_TEL: Field<string>,
    CONTACT_EMAIL: Field<string>,
    WEBSITE: Field<string>,
    REGION: Field<string>,
    LOGO_FILE: Field<string>,
    PARTNER_STATUS: Field<string>,
    COMPANY_INN: Field<string>,
    COMPANY_KPP: Field<string>,
    COMPANY_LEGAL_ADDRESS: Field<string>,
    COMPANY_POST_ADDRESS: Field<string>,
    SIGNER_NAME: Field<string>,
    SIGNER_JOB: Field<string>,
    SIGNER_DOC: Field<string>,
    COMPANY_BANK: Field<string>,
    COMPANY_BIC: Field<string>,
    COMPANY_RS: Field<string>,
    COMPANY_KS: Field<string>,
    STAND_ADD_PLASMA: Field<string>,
    STAND_ADD_LTE: Field<string>
    COMPANY_CARD: Field<boolean>
    [key: string]: Field<any>
}

export type SettingsData = {
    rowViewsValues: number[],
    defaultRowViewValue: number,
    confirm: boolean
}

export type UpdateResponse = {
    RESULT: { STATUS: string, MESSAGE: string[] }
}

export type CompanyData = {
    ID: string,
    MODIFIED: string,
    FULL_NAME: string,
    FIRST_NAME: string,
    MIDDLE_NAME: string,
    LAST_NAME: string,
    JOB: string,
    TEL: string,
    EMAIL: string,
    TOUR_NAME: string,
    COMPANY: string,
    COMPANY_SHORT: string,
    CONTACT: string,
    REGION_ID: string,
    ACTIVITY: Activity
    PARTICIPATION_TYPE: ParticipationType
    REGISTERED: boolean
}

type Participants = Record<string, CompanyData>;

export type Data = {
    PARTICIPANTS: Participants;
    THESAURUS: ParticipantDataSaurus;
    "STATUS": "error" | 'success';
    "MESSAGE": string
}
export type ParticipantDataSaurus = {
    ACTIVITY: Record<Activity, string>
    PARTICIPATION_TYPE: Record<ParticipationType, string>
    REGION: { [key: string]: string }
    FIELDS: ParticipantFields
    [key: string]: any
}

export type CompaniesList = {
    "ID": string,
    "MODIFIED": string,
    "NAME": string,
    "ACTIVITY": string,
    "PARTICIPATION_TYPE": string,
    "STAND_TYPE": string,
    "CONTACT_NAME": string,
    "CONTACT_JOB": string,
    "CONTACT_TEL": string,
    "CONTACT_EMAIL": string,
    "WEBSITE": string,
    "REGION": string,
    "LOGO_FILE": string,
    "PARTNER_STATUS": string,
    "COMPANY_INN": string,
    "COMPANY_KPP": string,
    "COMPANY_LEGAL_ADDRESS": string,
    "COMPANY_POST_ADDRESS": string,
    "SIGNER_NAME": string,
    "SIGNER_JOB": string,
    "SIGNER_DOC": string,
    "COMPANY_BANK": string,
    "COMPANY_BIC": string,
    "COMPANY_RS": string,
    "COMPANY_KS": string,
    "STAND_ADD_PLASMA": string,
    "STAND_ADD_LTE": string,
    "COMPANY_CARD": string
}

export type CompaniesListForRender = Omit<CompaniesList, "STAND_ADD_PLASMA" | "STAND_ADD_LTE"> & {
    STAND_ADD_PLASMA: boolean,
    STAND_ADD_LTE: boolean
};


export type CompaniesDataSaurus = {
    ACTIVITY: Record<Activity, string>
    PARTICIPATION_TYPE: Record<ParticipationType, string>
    REGION: { [key: string]: string }
    STAND_TYPE: Record<StandType, string>
    PARTNER_STATUS: Record<PartnerStatus, string>
    FIELDS: CompanyFields
    [key: string]: any
}

export type CompaniesData = {
    "COMPANIES": Record<string, CompaniesList>
    "THESAURUS": CompaniesDataSaurus
    "STATUS": "error" | 'success',
    "MESSAGE": string
}

export type ParticipantUpdateData = {
    ID: string,
    REGISTERED?: boolean,
    ACTIVITY?: string,
    FULL_NAME?: string,
    CONTACT?: string,
    JOB?: string,
    COMPANY?: string,
    COMPANY_SHORT?: string,
    TEL?: string,
    EMAIL?: string,
    REGION_ID?: string,
    VISITING_PROGRAMME?: string,
    PARTICIPATION_TYPE?: string,
    STAND_ADD_PLASMA?: boolean,
    STAND_ADD_LTE?: boolean,
}

export type CompanyUpdateData = {
    ID: string,
    PARTICIPATION_TYPE?: string,
    STAND_ADD_PLASMA?: boolean,
    STAND_ADD_LTE?: boolean,
    PARTNER_STATUS?: string
}

export type CompanyDetail = {
    NAME: string
    VALUE: string
}

export type CompanyDetailData = {
    SUMMARY: CompanyDetail[]
}

export type ParticipantFields = {
    MODIFIED: Field<Date>,
    APP_ID: Field<string>,
    FIRST_NAME: Field<string>,
    MIDDLE_NAME: Field<string>,
    LAST_NAME: Field<string>,
    JOB: Field<string>,
    COMPANY: Field<string>,
    TEL: Field<string>,
    CONTACT: Field<string>,
    EMAIL: Field<string>,
    ACTIVITY: Field<string>,
    PARTICIPATION_TYPE: Field<string>,
    REGION: Field<string>,
    COMPANY_SHORT: Field<string>,
    ROSASFALT_MEMBERSHIP: Field<string>,
    REGISTRED: Field<number>,
    [key: string]: Field<any>
}