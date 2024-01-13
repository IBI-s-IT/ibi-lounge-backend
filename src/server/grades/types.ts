// Request
export type GradesQuery = {
  pin: string;
  last_name: string;
}

// Response
export type Grade = {
  name: string;
  type: GradeType;
  grade: GradeGrade;
}

type GradeType = 'subject_report_with_grade' | 'subject_report' | 'exam' | 'online_course_work' | 'offline_course_work' | 'unknown';

type GradeGrade = 'failed' | 'passed' | 'absence' | 'not_admitted' | '2' | '3' | '4' | '5' | 'unknown';