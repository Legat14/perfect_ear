interface IGameResult {
  gameName: string,
  gameScore: number,
  rightAnswersScore: number,
  timeBonusScore: number,
  finesScore: number,
  rightAnswersCountToRoundCount: string,
  gameTime: number,
  gameTimeHR: string,
  averageTimeHR: string,
}

export default IGameResult;
