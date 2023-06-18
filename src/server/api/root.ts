import { createTRPCRouter } from '~/server/api/trpc'
import { todoRouter } from './routers/todo'

/**
 * サーバーのプライマリルーター
 *
 * `/api/routers`に追加した全てのルーターをここに追加する
 */
export const appRouter = createTRPCRouter({
  todo: todoRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
