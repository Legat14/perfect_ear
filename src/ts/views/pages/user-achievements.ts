import Translation from '../../constants/translation';
import { LangEmitter } from '../../controllers/emitters/emitters';
import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IAchievementImgs, Languages } from '../../types/data-types';

class UserAchievementsView extends NodeBuilder {
  backToMainBtn: ButtonBuilder;

  userAchievementsHeader: NodeBuilder;

  achievement1Div: NodeBuilder;

  achievement2Div: NodeBuilder;

  achievement3Div: NodeBuilder;

  achievement4Div: NodeBuilder;

  achievement5Div: NodeBuilder;

  achievement1Header: NodeBuilder;

  achievement2Header: NodeBuilder;

  achievement3Header: NodeBuilder;

  achievement4Header: NodeBuilder;

  achievement5Header: NodeBuilder;

  achievement1Img: NodeBuilder;

  achievement2Img: NodeBuilder;

  achievement3Img: NodeBuilder;

  achievement4Img: NodeBuilder;

  achievement5Img: NodeBuilder;

  achievementImgs: IAchievementImgs;

  achievementRow: HTMLElement | null;

  constructor(state: keyof typeof Languages) {
    super({ parentNode: null, className: 'user-achievements' });
    console.log(state);

    this.backToMainBtn = new ButtonBuilder({
      parentNode: this.node,
      className: 'field__back-btn',
      content: '←',
    });

    this.backToMainBtn.node.addEventListener('click', (): void => {
      window.location.hash = '#/user-stats';
    });

    this.userAchievementsHeader = new NodeBuilder({
      parentNode: this.node,
      tagName: 'h2',
      content: Translation.achievementsPageHeader[state],
      className: 'user-achievements__header',
    });

    this.achievementRow = new NodeBuilder({
      parentNode: this.node,
      tagName: 'div',
      className: 'user-achievements__achievement-row',
    }).node;

    this.achievement1Div = new NodeBuilder({
      parentNode: this.achievementRow,
      tagName: 'div',
      className: 'user-achievements__achievement-div',
    });

    this.achievement1Img = new NodeBuilder({
      parentNode: this.achievement1Div.node,
      tagName: 'img',
      className: 'user-achievements__achievement-img',
      attributes: {
        alt: 'first-of-many',
        src: './assets/img/achievements/first_of_many_unreached.png',
        width: '120px',
        heignt: '120px',
      },
    });

    this.achievement1Header = new NodeBuilder({
      parentNode: this.achievement1Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: Translation.achievementsPageBadge1[state],
    });

    this.achievement2Div = new NodeBuilder({
      parentNode: this.achievementRow,
      tagName: 'div',
      className: 'user-achievements__achievement-div',
    });

    this.achievement2Img = new NodeBuilder({
      parentNode: this.achievement2Div.node,
      tagName: 'img',
      className: 'user-achievements__achievement-img',
      attributes: {
        alt: 'beginner',
        src: './assets/img/achievements/beginner_unreached.png',
        width: '120px',
        heignt: '120px',
      },
    });

    this.achievement2Header = new NodeBuilder({
      parentNode: this.achievement2Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: Translation.achievementsPageBadge2[state],
    });

    this.achievement3Div = new NodeBuilder({
      parentNode: this.achievementRow,
      tagName: 'div',
      className: 'user-achievements__achievement-div',
    });

    this.achievement3Img = new NodeBuilder({
      parentNode: this.achievement3Div.node,
      tagName: 'img',
      className: 'user-achievements__achievement-img',
      attributes: {
        alt: 'student',
        src: './assets/img/achievements/student_unreached.png',
        width: '120px',
        heignt: '120px',
      },
    });

    this.achievement3Header = new NodeBuilder({
      parentNode: this.achievement3Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: Translation.achievementsPageBadge3[state],
    });

    this.achievement4Div = new NodeBuilder({
      parentNode: this.achievementRow,
      tagName: 'div',
      className: 'user-achievements__achievement-div',
    });

    this.achievement4Img = new NodeBuilder({
      parentNode: this.achievement4Div.node,
      tagName: 'img',
      className: 'user-achievements__achievement-img',
      attributes: {
        alt: 'serious',
        src: './assets/img/achievements/serious_unreached.png',
        width: '120px',
        heignt: '120px',
      },
    });

    this.achievement4Header = new NodeBuilder({
      parentNode: this.achievement4Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: Translation.achievementsPageBadge4[state],
    });

    this.achievement5Div = new NodeBuilder({
      parentNode: this.achievementRow,
      tagName: 'div',
      className: 'user-achievements__achievement-div',
    });

    this.achievement5Img = new NodeBuilder({
      parentNode: this.achievement5Div.node,
      tagName: 'img',
      className: 'user-achievements__achievement-img',
      attributes: {
        alt: 'obsessed',
        src: './assets/img/achievements/obsessed_unreached.png',
        width: '120px',
        heignt: '120px',
      },
    });

    this.achievement5Header = new NodeBuilder({
      parentNode: this.achievement5Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: Translation.achievementsPageBadge5[state],
    });

    this.achievementImgs = {
      firstOfMany: this.achievement1Img.node,
      beginner: this.achievement2Img.node,
      student: this.achievement1Img.node,
      serious: this.achievement1Img.node,
      obsessed: this.achievement1Img.node,
    };

    LangEmitter.add((lang) => {
      this.userAchievementsHeader.node.innerHTML = Translation.achievementsPageHeader[lang];
      this.achievement1Header.node.innerHTML = Translation.achievementsPageBadge1[lang];
      this.achievement2Header.node.innerHTML = Translation.achievementsPageBadge2[lang];
      this.achievement3Header.node.innerHTML = Translation.achievementsPageBadge3[lang];
      this.achievement4Header.node.innerHTML = Translation.achievementsPageBadge4[lang];
      this.achievement5Header.node.innerHTML = Translation.achievementsPageBadge5[lang];
    });
  }
}

export default UserAchievementsView;
