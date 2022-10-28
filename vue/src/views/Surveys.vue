<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link :to="{ name : 'SurveyCreate' }"
        class="flex py-3 px-3 bg-emerald-500 rounded-md hover:bg-emerald-600 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
          Add Survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <SurveyListItem
      v-for="survey in surveys"
      :key="survey.id"
      :survey="survey"
      @delete="deleteSurvey(survey)"
      />
    </div>
  </PageComponent>
</template>

<script>
import { computed } from '@vue/runtime-core'
import PageComponent from '../components/PageComponent.vue'
import SurveyListItem from '../components/SurveyListItem.vue'
import store from '../store'
export default {
  components : { PageComponent, SurveyListItem },
  setup() {

    const surveys = computed(() => store.state.surveys.data)
    store.dispatch('getSurveys')

    function deleteSurvey(survey){
      if (confirm('Are you sure you want to delete this survey?')) {
          store.dispatch('deleteSurvey', survey.id)
            .then(() => {
               store.dispatch('getSurveys')
            })
        }
    }

    return { surveys, deleteSurvey }
  }
}

</script>
