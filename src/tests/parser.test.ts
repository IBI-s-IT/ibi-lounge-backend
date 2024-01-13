import {describe, expect, test} from '@jest/globals';
import {parse} from '@server/schedules/parser';
import {
  onlineEventsHtml,
  onlineEventsReceive,
  combinedEventsHtml,
  combinedEventsReceive,
  customTimeEventHtml,
  customTimeEventReceived,
  examEventHtml,
  examEventReceived,
  lectureEventHtml,
  lectureEventReceived,
  combinedMultipleSubgroupsHtml,
  combinedMultipleSubgroupsReceived,
  subjectReportEventHtml,
  subjectReportEventReceived,
  noSubjectLectureHtml,
  noSubjectLectureReceived,
  subjectReportWithGradeHtml,
  subjectReportWithGradeReceived,
  customTimeDotHtml,
  customTimeDotReceived, compensationHtml, compensationReceived
} from "./parser.mocks";

function toSafeData(data: any) {
  return JSON.parse(JSON.stringify(data));
}

describe('Schedules parsing', () => {
  test('parse exam event', () => {
    const data = parse(examEventHtml);
    expect(toSafeData(data)).toEqual(examEventReceived);
  })

  test('parse subject report events', () => {
    const data = parse(subjectReportEventHtml);
    expect(toSafeData(data)).toEqual(subjectReportEventReceived);
  })

  test ('parse subject report with grade and consultation events', () => {
    const data = parse(subjectReportWithGradeHtml);
    expect(toSafeData(data)).toEqual(subjectReportWithGradeReceived);
  })

  test('parse lecture event', () => {
    const data = parse(lectureEventHtml);
    expect(toSafeData(data)).toEqual(lectureEventReceived);
  })

  test('parse online event', () => {
    const data = parse(onlineEventsHtml);
    expect(toSafeData(data)).toEqual(onlineEventsReceive);
  })

  test('parse custom timed event', () => {
    const data = parse(customTimeEventHtml);
    expect(toSafeData(data)).toEqual(customTimeEventReceived);
  })

  test('parse custom timed with dot event', () => {
    const data = parse(customTimeDotHtml);
    expect(toSafeData(data)).toEqual(customTimeDotReceived);
  })

  test('parse combined event', () => {
    const data = parse(combinedEventsHtml);
    expect(toSafeData(data)).toEqual(combinedEventsReceive);
  })

  test('parse combined event with multiple subgroups', () => {
    const data = parse(combinedMultipleSubgroupsHtml);
    expect(toSafeData(data)).toEqual(combinedMultipleSubgroupsReceived);
  })

  test('parse lecture event without subject', () => {
    const data = parse(noSubjectLectureHtml);
    expect(toSafeData(data)).toEqual(noSubjectLectureReceived);
  })

  test('parse compensation', () => {
    const data = parse(compensationHtml);
    expect(toSafeData(data)).toEqual(compensationReceived);
  })
});
