import { vueTsConfigs, withVueTs } from '@vue/eslint-config-typescript'
import skipFormatting from 'eslint-config-prettier/flat'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default withVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts}'],
  },

  ...pluginVue.configs['flat/strongly-recommended'],

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  vueTsConfigs.recommendedTypeChecked,

  skipFormatting,
)
