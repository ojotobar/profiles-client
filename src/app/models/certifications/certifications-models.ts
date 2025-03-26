export interface CertificationModel {
    name: string,
    institutionName: string,
    date: Date,
    yearsOfValidity: number | null,
    link: string | null
}

export interface CertificationResultModel {
    id: string,
    name: string,
    institution: string,
    dateObtained: Date,
    yearsOfValidity: number | null,
    link: string | null,
    expires: Date | null
}