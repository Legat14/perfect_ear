import UserProfile from '../../models/user-profile';

class UserAchievementsHandler {
  userProfile: UserProfile;

  constructor(userProfile: UserProfile) {
    this.userProfile = userProfile;
  }

  private testFirstOfManyAchievement(): void {
    const currentAchievementName = 'First of many';
    const achievements = this.userProfile.getAchievements();
    const totalExercisesCount = this.userProfile.getTotalExercises();
    if (totalExercisesCount > 0) {
      const currentAchievement = achievements.find((achievementElem): boolean => achievementElem
        .achievement === currentAchievementName);
      if (currentAchievement) {
        currentAchievement.complete = true;
      }
    }
  }

  private testBegginerAchievement(): void {
    const currentAchievementName = 'Beginner';
    const achievements = this.userProfile.getAchievements();
    const totalExercisesCount = this.userProfile.getTotalExercises();
    if (totalExercisesCount >= 10) {
      const currentAchievement = achievements.find((achievementElem): boolean => achievementElem
        .achievement === currentAchievementName);
      if (currentAchievement) {
        currentAchievement.complete = true;
      }
    }
  }

  private testStudentAchievement(): void {
    const currentAchievementName = 'Student';
    const achievements = this.userProfile.getAchievements();
    const totalExercisesCount = this.userProfile.getTotalExercises();
    if (totalExercisesCount >= 50) {
      const currentAchievement = achievements.find((achievementElem): boolean => achievementElem
        .achievement === currentAchievementName);
      if (currentAchievement) {
        currentAchievement.complete = true;
      }
    }
  }

  private testSeriousAchievement(): void {
    const currentAchievementName = 'Serious';
    const achievements = this.userProfile.getAchievements();
    const totalExercisesCount = this.userProfile.getTotalExercises();
    if (totalExercisesCount >= 100) {
      const currentAchievement = achievements.find((achievementElem): boolean => achievementElem
        .achievement === currentAchievementName);
      if (currentAchievement) {
        currentAchievement.complete = true;
      }
    }
  }

  private testObsessedAchievement(): void {
    const currentAchievementName = 'Obsessed';
    const achievements = this.userProfile.getAchievements();
    const totalExercisesCount = this.userProfile.getTotalExercises();
    if (totalExercisesCount >= 500) {
      const currentAchievement = achievements.find((achievementElem): boolean => achievementElem
        .achievement === currentAchievementName);
      if (currentAchievement) {
        currentAchievement.complete = true;
      }
    }
  }

  public testAllAchievements() {
    this.testFirstOfManyAchievement();
    this.testBegginerAchievement();
    this.testStudentAchievement();
    this.testSeriousAchievement();
    this.testObsessedAchievement();
  }
}

export default UserAchievementsHandler;
