<template>
  <div class="toolbar-input">
    <q-input
      v-model="model"
      dark
      clearable
      dense
      square
      filled
      input-class="text-grey-5 text-weight-light"
      :debounce="900"
      :placeholder="placeholder"
      type="search"
      @focus="onFocus"
    >
      <template v-slot:prepend>
        <q-icon
          name="search"
          color="grey-5"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('search', {
      query: 'getQuery'
    }),

    model: {
      get () {
        return this.query
      },

      async set (value) {
        await this.setQuery({ type: null, query: value })
      }
    },

    placeholder () {
      return this.$q.screen.lt.sm ? 'Search MediaDB' : 'Search'
    }
  },

  methods: {
    ...mapActions('search', {
      setQuery: 'query'
    }),

    onFocus () {
      if (this.$route.name !== 'search') {
        this.$router.push({ name: 'search' })
      }
    }
  }
}
</script>
