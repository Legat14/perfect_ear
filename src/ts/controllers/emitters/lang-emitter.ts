import Emitter from '../../helpers/emitter';
import { Languages } from '../../types/data-types';

const LangEmitter = new Emitter<keyof typeof Languages>();

export default LangEmitter;
