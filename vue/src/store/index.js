import { createStore } from 'vuex'
import axiosClient from '../axios'

const tempSurveys = [
  {
    id : 100,
    title : "TheCodeHolic YouTube channel content",
    slug : "thecodeholic-yotube-channel-content",
    status : "draft",
    image :
      "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description :
      "My name is Zura:<br>I am Web Developer with 9+ years experience",
    created_at : "2022-10-25 18:00:00",
    updated_at : "2022-10-25 18:00:00",
    expire_date : "2022-10-26 18:00:00",
    questions : [
      {
        id : 1,
        type : "select",
        question : "From which country are you?",
        description : null,
        data : {
          options : [
            {
              uuid : "6d6a39d0-552a-11ed-bdc3-0242ac120002",
              text : "USA",
            },
            {
              uuid : "8541c532-552a-11ed-bdc3-0242ac120002",
              text : "Georgia",
            },
            {
              uuid : "986aebfc-552a-11ed-bdc3-0242ac120002",
              text : "Argentina",
            },
            {
              uuid : "9e882392-552a-11ed-bdc3-0242ac120002",
              text : "Philippines",
            },
            {
              uuid : "a3c30dea-552a-11ed-bdc3-0242ac120002",
              text : "Switzerland",
            },

          ]
        }
      },
      {
        id : 2,
        type : "checkbox",
        question : "Which language videos do you want to see on my channel?",
        description : "lLorem ipsum dolor sit amet consectetur adipisicing elit.",
        data : {
          options : [
            {
              uuid : "2af800c2-552b-11ed-bdc3-0242ac120002",
              text : "Javascript",
            },
            {
              uuid : "3a3fa8be-552b-11ed-bdc3-0242ac120002",
              text : "Laravel",
            },
            {
              uuid : "3ff2b5da-552b-11ed-bdc3-0242ac120002",
              text : "VueJs",
            },
          ]
        }
      },
      {
        id : 5,
        type : "checkbox",
        question : "What project do you want to see on my channel build with Laravel?",
        description : "lLorem ipsum dolor sit amet consectetur adipisicing elit.",
        data : {
          options : [
            {
              uuid : "82f90ece-552b-11ed-bdc3-0242ac120002",
              text : "REST API",
            },
            {
              uuid : "8bf951be-552b-11ed-bdc3-0242ac120002",
              text : "E-commerce",
            },
            {
              uuid : "96ab7b14-552b-11ed-bdc3-0242ac120002",
              text : "Real State",
            },
            {
              uuid : "9f1534de-552b-11ed-bdc3-0242ac120002",
              text : "All of the above",
            },
          ]
        }
      },
      {
        id : 6,
        type : "text",
        question : "What's your favorite youtube channel?",
        description : null,
        data : {}
      },
      {
        id : 7,
        type : "textarea",
        question : "What do you think about TheCodeHolic channel?",
        description : "Write your honest opinion, everything is anonymous",
        data : {}
      }
    ]
  },
  {
    id : 200,
    title : "Laravel 9",
    slug : "laravel-9",
    status : "active",
    image :
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/400px-Laravel.svg.png",
    description :
      "Laravel aims to make the development process a pleasing one for the developer without sacrificing application functionality",
    created_at : "2022-10-25 18:00:00",
    updated_at : "2022-10-25 18:00:00",
    expire_date : "2022-10-26 18:00:00",
    questions : []
  },
  {
    id : 300,
    title : "Vue 3",
    slug : "vue-3",
    status : "active",
    image :
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/400px-Vue.js_Logo_2.svg.png",
    description :
      "It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.",
    created_at : "2022-10-25 18:00:00",
    updated_at : "2022-10-25 18:00:00",
    expire_date : "2022-10-26 18:00:00",
    questions : []
  },
  {
    id : 400,
    title : "Tailwind 3",
    slug : "tailwind-3",
    status : "active",
    image :
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tailwind_CSS_logo.svg/1920px-Tailwind_CSS_logo.svg.png",
    description :
      "Tailwind CSS makes it quicker to write and maintain the code of your application.",
    created_at : "2022-10-25 18:00:00",
    updated_at : "2022-10-25 18:00:00",
    expire_date : "2022-10-26 18:00:00",
    questions : []
  }

]

const store = createStore({
  state: {
    user: {
      data : {},
      token: sessionStorage.getItem('TOKEN')
    },
    surveys : [...tempSurveys],
    questionTypes : ['text', 'select', 'radio', 'checkbox', 'textarea']
  },
  getters: {},
  actions: {
    saveSurvey({commit}, survey){
      delete survey.image_url
      let response;
      if(survey.id){
        response = axiosClient.put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit('updateSurvey', res.data)
            return res
          })
      }else{
        response = axiosClient.post(`/survey`, survey)
        .then((res) => {
          commit('saveSurvey', res.data)
          return res
        })
      }
      return response
    },
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data)
          return data
        })

      // return fetch('http://127.0.0.1:8000/api/register', {
      //   headers : {
      //     "Content-Type" : "application/json",
      //     Accept : "application/json"
      //   },
      //   method: "POST",
      //   body: JSON.stringify(user)
      // })
      // .then((res) => res.json())
      // .then((res) => {
      //   commit('setUser', res)
      //   return res
      // })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data)
          return data
        })
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then((response) => {
          commit('logout')
          return response
        })
    }

  },
  mutations: {
    saveSurvey : (state, survey) => {
      state.surveys = [...state.surveys, survey]
    },
    updateSurvey : (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if(s.id === survey.data.id){
          return survey.data
        }
        return s
      })
    },
    logout: (state) => {
      state.user.token = null
      state.user.data = {}
      sessionStorage.removeItem('TOKEN')
    },
    setUser: (state, userData) => {
      state.user.token = userData.token
      state.user.data = userData.user
      sessionStorage.setItem('TOKEN', userData.token)
    }
  },
  modules: {},

})

export default store
