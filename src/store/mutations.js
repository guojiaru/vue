const ADD_ANSWER = 'ADD_ANSWER'; 
const ADD_IMG = 'ADD_IMG'; 
const ADD_AUDIO = 'ADD_AUDIO';
const QT_EDIT = 'QT_EDIT';
const SAVE_INFO = 'SAVE_INFO';
const IMG_LIST = 'IMG_LIST';
const ANSWER_LIST = 'ANSWER_LIST';
const AUDIO_LIST = 'AUDIO_LIST';
const QUESTION_LIST = 'QUESTION_LIST';
const EDIT_ANSWER = 'EDIT_ANSWER';
const EDIT_IMG = 'EDIT_IMG';
const EDIT_AUDIO = 'EDIT_AUDIO';
const EDIT_INFO = 'EDIT_INFO';
export default {
 
  [ADD_ANSWER] (state, data) { 
    state.addAnswer = data;
  },
  [ADD_IMG] (state, data) {
    state.add_Img = data;
  },
  [ADD_AUDIO] (state, data) {
    state.addAudio = data;
  },
  [QT_EDIT] (state, data) {
    state.qtEdit = data;
  },
  [SAVE_INFO] (state, data) {
    state.saveInfo = data;
    console.log(data)
  },
  [IMG_LIST] (state, data) {
    state.imgList = data;
    console.log(data)
  },
  [ANSWER_LIST] (state, data) {
    state.answerList = data;
    console.log(data)
  },
  [AUDIO_LIST] (state, data) {
    state.audioList = data;
    console.log(data)
  },
  [QUESTION_LIST] (state, data) {
    state.questionList = data;
    console.log(data)
  },
  [EDIT_ANSWER] (state, data) {
    state.editAnswer = data;
    console.log(data)
  },
  [EDIT_IMG] (state, data) {
    state.editImg = data;
    console.log(data)
  },
  [EDIT_AUDIO] (state, data) {
    state.editAudio = data;
    console.log(data)
  },
  [EDIT_INFO] (state, data) {
    state.editInfo = data;
    console.log(data)
  },
};
