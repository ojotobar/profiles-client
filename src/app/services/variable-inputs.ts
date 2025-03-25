import { EducationModel } from "../models/education/education-models";
import { ExperienceModel } from "../models/experience/experience-models";

export function getIdInput(id: string){
    return {
        input: {
          "id": id
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