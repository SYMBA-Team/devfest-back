interface PersonalInformation {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
}
interface AcademicInformation {
    university: string;
    major: string;
}
interface RefrencialInformation {
    knewFrom: RefrencialPlaces;
}
interface RefrencialPlaces {
    facebook: boolean;
    instagram: boolean;
    discord: boolean;
    friend: boolean;
    other: boolean;
}
interface ProfessionalInformation {
    portfolio: string;
    linkedIn: string;
    github: string;
    skills: string[];
    otherOrganizations: string;
}
interface Motivations {
    whatKnow: string;
    expectations: string;
    motivation: string;
    explained: string;
    trainings: boolean;
    events: boolean;
    experience: boolean;
}

interface Registration {
    personalInfo: PersonalInformation;
    academicInfo: AcademicInformation;
    refrence: RefrencialInformation;
    professional: ProfessionalInformation;
    motivations: Motivations;
}
