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

  public testAllAchievements() {
    this.testFirstOfManyAchievement();
  }
}

export default UserAchievementsHandler;
