export interface ProjectModel {
    projectName: string,
    summary: string,
    link: string | null,
    technologies: string[] | null
}

export interface ProjectResponseModel {
    id: string,
    name: string,
    description: string,
    link: string | null,
    technologies: string[] | null
}

export const getAddProjectPayload = function(form: any): ProjectModel {
    let payload: ProjectModel = {
        projectName: form.name as string,
        summary: form.description as string,
        link: form.link as string | null,
        technologies: form.technologies as string[]
    }

    return payload
}

export const getAddProjectPayloads = function(form: any): ProjectModel[] {
    let payloads: ProjectModel[] = [];
    let payload: ProjectModel = {
        projectName: form.name as string,
        summary: form.description as string,
        link: form.link as string | null,
        technologies: form.technologies as string[]
    }
    payloads.push(payload)
    return payloads
}