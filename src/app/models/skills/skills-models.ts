import { SkillLevelEnum } from "../../enums/skill-level-enum"

export interface SkillResponseModel {
    id: string
    userId: string
    name: string
    level: SkillLevelEnum
    levelDescription: string
    yearsOfExperience: number
    certified: boolean
}

export interface SkillModel{
    name: string,
    level: SkillLevelEnum,
    years: number,
    isCertified: boolean | false
}