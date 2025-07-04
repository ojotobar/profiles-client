import { AuditActionEnum } from "../enums/audit-action-enum";
import { UserStatusEnum } from "../enums/status-enum";
import { AccountCodeTypeEnum, SystemRoleEnum, UserRoleEnum } from "../enums/user-role-enum";
import { ChangeForgottenPasswordModel, ChangePasswordModel } from "../models/account/accounts-models";
import { LoginModel } from "../models/account/login-model";
import { RegisterModel } from "../models/account/register-model";
import { CertificationModel } from "../models/certifications/certifications-models";
import { EducationModel } from "../models/education/education-models";
import { ExperienceModel } from "../models/experience/experience-models";
import { ProfileLocationModel, ProfilesInputModel, ProfileUpdateModel, SocialMediaModel } from "../models/profile/profile-models";
import { ProjectModel } from "../models/project/project-models";
import { SkillModel } from "../models/skills/skills-models";

export function getIdInput(id: string){
    return {
        input: {
          id: id
        }
    }
}

export function getAddExperiencesInputs(payloads: ExperienceModel[]) {
    return {
        input: {
          inputs: payloads
        }
    }
}

export function getUpdateExperienceInput(id: string, payload: ExperienceModel) {
    return {
        input: {
            id: id,
            input: {
                organization: payload.organization,
                title: payload.title,
                startDate: payload.startDate,
                endDate: payload.endDate,
                summaries: payload.summaries,
                location: {
                    city: payload.location.city,
                    country: payload.location.country
                }
            }
        }
    };
}

export function getAddEducationInput(payload: EducationModel){
  return {
    input: {
      input: {
        course: payload.course,
        level: payload.level,
        schoolName: payload.schoolName,
        startDate: payload.startDate,
        endDate: payload.endDate,
        location: payload.location,
        otherLevelSpecification: payload.otherLevelSpecification
      }
    }
  }
}

export function getUpdateEducationInput(id: string, payload: EducationModel){
    return {
        input: {
          id: id,
          input: {
            schoolName: payload.schoolName,
            course: payload.course,
            level: payload.level,
            startDate: payload.startDate,
            endDate: payload.endDate,
            location: {
              city: payload.location.city,
              state: payload.location.state,
              country: payload.location.country,
              latitude: payload.location.latitude,
              longitude: payload.location.longitude
            },
            otherLevelSpecification: payload.otherLevelSpecification
          }
        }
    }
}

export const getAddCertificationsInput = function(data: CertificationModel[]) {
    return {
        input: {
          inputs: data
        }
    }
}

export const getUpdateCertificationInput = function(id: string, data: CertificationModel){
    return {
        input: {
          id: id,
          input: {
            name: data.name,
            institutionName: data.institutionName,
            date: data.date,
            yearsOfValidity: data.yearsOfValidity,
            link: data.link
          }
        }
    }
}

export const getAddProjectInput = function(payloads: ProjectModel[]){
    return {
        input: {
          inputs: payloads
        }
    }
}

export const getUpdateProjectInput = function(id: string, payload: ProjectModel){
    return {
        input: {
          id: id,
          input: {
            projectName: payload.projectName,
            summary: payload.summary,
            link: payload.link,
            technologies: payload.technologies
          }
        }
    }
}

export const getUpdateCareerSummaryInput = function(id: string, summary: string, heading: string){
    return {
        input: {
          id: id,
          input: {
            summary: summary,
            heading: heading
          }
        }
    }
}

export const getAddCareerSummaryInput = function(summary: string, heading: string){
    return {
        input: {
          input: {
            summary: summary,
            heading: heading
          }
        }
    }
}

export const getAddSkillsInput = function(payloads: SkillModel[]){
  return {
    inputs: {
      inputs: payloads
    }
  }
}

export const getUpdateSkillsInput = function(id: string, payload: SkillModel){
  return {
    input: {
      id: id,
      input: {
        name: payload.name,
        level: payload.level,
        years: payload.years,
        isCertified: payload.isCertified
      }
    }
  }
}

export const getUploadFileInput = function(file: any){
  return {
    input: {
      file: file
    }
  }
}

export const getLocationInput = function(model: ProfileLocationModel){
  return {
    input: {
      input: model
    }
  }
}

export const getProfileDetailsInput = function(payload: ProfileUpdateModel){
  return {
    input: {
      input: payload
    }
  }
}

export const getChangePasswordInput = function(payload: ChangePasswordModel){
  return {
    input: payload
  }
}

export const getResendCodeInput = function(email: string | null, code: AccountCodeTypeEnum) {
  return {
    input: {
      email: email,
      codeType: code
    }
  }
}

export const getConfirmAccountInput = function(otp: string, email: string) {
  return {
    input: {
      otp: otp.toString(),
      email: email
    }
  }
}

export const getRegisterInput = function(payload: RegisterModel){
  return {
    input: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      middleName: payload.middleName,
      emailAddress: payload.emailAddress,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
      phoneNumber: payload.phoneNumber,
      gender: payload.gender
    }
  }
}

export const getLoginInput = function(payload: LoginModel){
  return {
    input: {
      input: {
        email: payload.email,
        password: payload.password
      }
    }
  }
}

export const getChangeForgottenPassInput = function(payload: ChangeForgottenPasswordModel){
  return {
    input: {
      input: payload
    }
  }
}

export const getEmailInput = function(email: string){
  return {
    input: {
      input: {
        email: email
      }
    }
  }
}

export const getAuditLogInput = function(search: string | null, action: AuditActionEnum | null
  , skip: number, take: number) {
  return {
    input: {
      search: search,
      action: action
    },
    skip: skip,
    take: take
  }
}

export const getProfilesInput = function(query: ProfilesInputModel | null, skip: number, take: number) {
  return {
    search: query,
    skip: skip,
    take: take
  }
}

export function getStatusChangeInput(email: string, status: UserStatusEnum) {
  return {
    input: {
      userEmail: email,
      newStatus: status
    }
  }
}

export function getRoleChangeInput(email: string, role: SystemRoleEnum){
  return {
    input: {
      userEmail: email,
      role: role
    }
  }
}

export function getDeleteAccountInput(userId: string){
  return {
    input: {
      userId: userId
    }
  }
}

export function getAddRoleInput(name: string){
  return {
    input: {
      roleName: name
    }
  }
}

export function getUpdateRoleInput(id: string, name: string){
  return {
    input: {
      input: {
        id: id,
        name: name
      }
    }
  }
}

export function getAddOrUpdateSMInput(socialMedia: SocialMediaModel[]){
  return {
    "input": {
      "inputs": socialMedia
    }
  }
}
