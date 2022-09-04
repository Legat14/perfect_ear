import UserProfile from '../../models/user-profile';
import { IAchievementImgs } from '../../types/data-types';

class UserAchievementsHandler {
  userProfile: UserProfile;

  achievementImgs: IAchievementImgs;

  constructor(userProfile: UserProfile, achievementImgs: IAchievementImgs) {
    this.userProfile = userProfile;
    this.achievementImgs = achievementImgs;
  }

  private changeImgToReached(img: HTMLElement) {
    const oldSrc = img.getAttribute('src');
    if (oldSrc) {
      const newSrc = oldSrc.replace('_unreached', '_reached');
      img.setAttribute('src', newSrc);
    }
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
        this.changeImgToReached(this.achievementImgs.firstOfMany);
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
        this.changeImgToReached(this.achievementImgs.beginner);
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
        this.changeImgToReached(this.achievementImgs.student);
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
        this.changeImgToReached(this.achievementImgs.serious);
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
        this.changeImgToReached(this.achievementImgs.obsessed);
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
