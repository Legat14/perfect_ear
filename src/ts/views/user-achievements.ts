import ButtonBuilder from '../helpers/button-builder';
import NodeBuilder from '../helpers/node-builder';
import { IAchievementImgs } from '../types/data-types';

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

  constructor() {
    super({ parentNode: null, className: 'user-achievements' });

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
      content: 'Достижения',
      className: 'user-achievements__header',
    });

    this.achievement1Div = new NodeBuilder({
      parentNode: this.node,
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
        width: '100px',
        heignt: '100px',
      },
    });

    this.achievement1Header = new NodeBuilder({
      parentNode: this.achievement1Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: 'Первый из многих',
    });

    this.achievement2Div = new NodeBuilder({
      parentNode: this.node,
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
        width: '100px',
        heignt: '100px',
      },
    });

    this.achievement2Header = new NodeBuilder({
      parentNode: this.achievement2Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: 'Новичок',
    });

    this.achievement3Div = new NodeBuilder({
      parentNode: this.node,
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
        width: '100px',
        heignt: '100px',
      },
    });

    this.achievement3Header = new NodeBuilder({
      parentNode: this.achievement3Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: 'Студент',
    });

    this.achievement4Div = new NodeBuilder({
      parentNode: this.node,
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
        width: '100px',
        heignt: '100px',
      },
    });

    this.achievement4Header = new NodeBuilder({
      parentNode: this.achievement4Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: 'Продвинутый',
    });

    this.achievement5Div = new NodeBuilder({
      parentNode: this.node,
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
        width: '100px',
        heignt: '100px',
      },
    });

    this.achievement5Header = new NodeBuilder({
      parentNode: this.achievement5Div.node,
      tagName: 'p',
      className: 'user-achievements__achievement-header',
      content: 'Одержимый',
    });

    this.achievementImgs = {
      firstOfMany: this.achievement1Img.node,
      beginner: this.achievement2Img.node,
      student: this.achievement1Img.node,
      serious: this.achievement1Img.node,
      obsessed: this.achievement1Img.node,
    };
  }
}

export default UserAchievementsView;
