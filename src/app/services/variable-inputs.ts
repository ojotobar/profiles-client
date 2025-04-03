import { CertificationModel } from "../models/certifications/certifications-models";
import { EducationModel } from "../models/education/education-models";
import { ExperienceModel } from "../models/experience/experience-models";
import { ProfileLocationModel } from "../models/profile/profile-models";
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
                schoolName: payload.schoolName,
                course: payload.course,
                startDate: payload.startDate,
                endDate: payload.endDate,
                level: payload.level,
                location: payload.location
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
            }
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

export const getUpdateCareerSummaryInput = function(id: string, summary: string){
    return {
        input: {
          id: id,
          input: {
            summary: summary
          }
        }
    }
}

export const getAddCareerSummaryInput = function(summary: string){
    return {
        input: {
          input: {
            summary: summary
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