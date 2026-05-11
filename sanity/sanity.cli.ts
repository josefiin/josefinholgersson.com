import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'no50snex',
    dataset: 'production',
  },
  deployment: {
    appId: 'sjvmfdb5qnujlbhx0rd9bv51',
    autoUpdates: true,
  },
})
