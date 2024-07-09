import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
    CompaniesData,
    CompanyDetailData,
    CompanyUpdateData,
    Data,
    ParticipantUpdateData,
    UpdateResponse
} from "./types.ts";
import {getBaseUrl} from "../utils/getBaseUrl.ts";


export const dataService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/admin`,
        // baseUrl: `https://www.itsrussiaforum.ru/admin/`,
        prepareHeaders: (headers) => {
            headers.set('x-api-key', '85V53Ja0XuV30Tm9ZyBePvtJs3IRTT2G1HVvOMaw');
            return headers;
        },
    }),
    keepUnusedDataFor: 0,
    endpoints: builder => {
        return {
            getData: builder.query<Data, void>({
                query: () => `service/participants.list.php`,
            }),
            getCompanies: builder.query<CompaniesData, void>({
                query: () => `service/companies.list.php`,
            }),
            getCompanyData: builder.query<CompanyDetailData, { id: string }>({
                query: (body) => `service/company-requisites.get.php?type=json&COMPANY_ID=${body.id}`,
            }),
            updateParticipant: builder.mutation<UpdateResponse, ParticipantUpdateData>({
                query: (data) => ({
                    body: data,
                    method: "POST",
                    url: `service/participant.update.php`,
                }),
            }),
            updateCompany: builder.mutation<UpdateResponse, CompanyUpdateData>({
                query: (data) => ({
                    body: data,
                    method: "POST",
                    url: `service/company.update.php`,
                })
            })
        }
    },

})

export const {
    useGetCompanyDataQuery,
    useGetDataQuery,
    useGetCompaniesQuery,
    useUpdateParticipantMutation,
    useUpdateCompanyMutation
} = dataService
