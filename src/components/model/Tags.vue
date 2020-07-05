<template>
  <q-select
    v-model="tags"
    dark
    square
    filled
    :input-debounce="300"
    :max-values="15"
    :options="options"
    :loading="loading"
    @filter="filterOptions"
    clearable
    counter
    use-chips
    hide-dropdown-icon
    label="Tags"
    stack-label
    multiple
    option-label="name"
    option-value="id"
    options-dark
    options-sanitize
    use-input
  >
    <template v-slot:prepend>
      <q-icon name="local_offer" />
    </template>

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label v-text="scope.opt.name" />
          <q-item-label caption class="text-capitalize">{{ scope.opt.type }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:selected-item="scope">
      <q-chip
        removable
        dense
        square
        @remove="scope.removeAtIndex(scope.index)"
        :tabindex="scope.tabindex"
      >
        <span>{{ scope.opt.name }}</span>&nbsp;
        <span class="text-capitalize">({{ scope.opt.type }})</span>
      </q-chip>
    </template>
  </q-select>
</template>

<script>
import { validateHandler } from 'src/mixins/form'
import paginateModule from 'src/store/paginate'

export default {
  mixins: [validateHandler],

  computed: {
    loading () {
      return this.$store.getters[this.namespace + '_tags/isLoading']
    },

    options () {
      return this.$store.getters[this.namespace + '_tags/getData']
    },

    tags: {
      get () {
        return this.data.tags
      },

      set (value) {
        this.$store.commit(this.namespace + '/setData', {
          tags: value
        })
      }
    }
  },

  async created () {
    if (!this.$store.hasModule(this.namespace + '_tags')) {
      this.$store.registerModule(this.namespace + '_tags', paginateModule)
    }

    await this.setOptions()
  },

  methods: {
    async setOptions () {
      await this.$store.dispatch(this.namespace + '_tags/create', {
        path: 'tags',
        params: {
          'page[size]': 5,
          sort: 'media' // TODO: use generic name
        }
      })
    },

    async filterOptions (val, update, abort) {
      await this.$store.dispatch(this.namespace + '_tags/reset', {
        params: {
          'filter[query]': val || null,
          sort: val.length ? 'relevance' : 'media' // TODO: use generic name
        }
      })

      update()
    }
  }
}
</script>