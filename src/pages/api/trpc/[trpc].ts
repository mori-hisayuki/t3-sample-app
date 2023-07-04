import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '~/server/api/root'
import { createTRPCContext } from '~/server/api/trpc'

export const runtime = 'edge'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext
})
