import {EducationLevel} from "../types/schedules";

export function getCodFromEducationLevel(level: EducationLevel) {
  switch (level) {
    case "undergraduate":
      return 1;
    case "specialty":
      return 2;
    case "magistracy":
      return 3;
    case "postgraduate":
      return 4;
    case "additionals":
      return 5;
    default:
      throw new Error('Unknown education_level')
  }
}