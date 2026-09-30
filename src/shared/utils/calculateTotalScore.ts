/**
 * 방문형 상권 분석 최종 점수.
 * 활성도를 기본으로 두고, 경쟁 점수는 활성도의 2배까지만 가산합니다.
 */
export function calculateTotalScore(activityScore: number, competitionScore: number) {
  if (
    !Number.isFinite(activityScore) ||
    !Number.isFinite(competitionScore) ||
    activityScore < 0 ||
    competitionScore < 0
  ) {
    return undefined;
  }

  const activity = Math.min(100, activityScore);
  const competition = Math.min(100, competitionScore);
  const adjustedCompetition = Math.min(competition, activity * 2);

  return Math.round(activity * 0.7 + adjustedCompetition * 0.3);
}

export function calculateReportScores(
  activityScore: number,
  competitionScore: number | undefined,
  competitionCount: number | undefined,
) {
  const normalizedCompetitionScore = competitionScore ?? 0;

  return {
    activityScore,
    competitionScore: normalizedCompetitionScore,
    competitionCount,
    totalScore: calculateTotalScore(activityScore, normalizedCompetitionScore) ?? 0,
  };
}
