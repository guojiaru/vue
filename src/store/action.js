export default {
  //是否收到呼叫
  addAnswer({ commit },data)  {
    commit('ADD_ANSWER',data);
    console.log(data)
  },
  addImg({ commit },data)  {
    commit('ADD_IMG',data);
    console.log(data)
  },
  addAudio({ commit },data)  {
    commit('ADD_AUDIO',data);
    console.log(data)
  },
  qtEdit({ commit },data)  {
    commit('QT_EDIT',data);
    console.log(data)
  },
  //保存信息
  saveInfo({ commit },data)  {
    commit('SAVE_INFO',data);
    console.log(data)
  },
  //图片列表
  imgList({ commit },data)  {
    commit('IMG_LIST',data);
    console.log(data)
  },
    //答案列表
  answerList({ commit },data)  {
      commit('ANSWER_LIST',data);
      console.log(data)
    },
  //音频列表
  audioList({ commit },data)  {
      commit('AUDIO_LIST',data);
      console.log(data)
    },
    //问题列表
  questionList({ commit },data)  {
        commit('QUESTION_LIST',data);
        console.log(data)
      },
    //编辑答案列表
  editAnswer({ commit },data)  {
    commit('EDIT_ANSWER',data);
    console.log(data)
  },
  editImg({ commit },data)  {
    commit('EDIT_IMG',data);
    console.log(data)
  },
  editAudio({ commit },data)  {
    commit('EDIT_AUDIO',data);
    console.log(data)
  },
  editInfo({ commit },data)  {
    commit('EDIT_INFO',data);
    console.log(data)
  },
  
 
};
