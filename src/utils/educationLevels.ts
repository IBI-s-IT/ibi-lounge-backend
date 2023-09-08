import {EducationLevel} from "../types/schedules";

/**
 * @deprecated Use `level_id` instead from /levels
 * */
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
      throw new Error('no_education_level_specified')
  }
}
