import Emitter from '../../helpers/emitter';
import LangPack from '../../constants/translation';

const LangEmitter = new Emitter<typeof LangPack[keyof typeof LangPack]>();

export default LangEmitter;
