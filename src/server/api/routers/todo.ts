import { z } from 'zod'
import { createInput, toggleInput, updateInput } from '~/server/types'
import { createTRPCRouter, protectedProcedure } from '../trpc'

/**
 * todoルーター
 *
 */
export const todoRouter = createTRPCRouter({
  /**
   * all Procedure
   *
   ** ログインしているユーザーのTodoを全て取得する
   */
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return todos.map(({ id, text, isCompleted }) => ({
      id,
      text,
      isCompleted
    }))
  }),
  /**
   * create Procedure
   *
   ** ログインしているユーザーのTodoを新規作成する。
   */
  create: protectedProcedure.input(createInput).mutation(({ ctx, input }) =>
    ctx.prisma.todo.create({
      data: {
        text: input,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }
      }
    })
  ),
  /**
   * toggle Procedure
   *
   ** ログインしているユーザーのTodoの完了/未完了を切り替える。
   */
  toggle: protectedProcedure.input(toggleInput).mutation(({ ctx, input }) => {
    const { id, is_completed } = input
    return ctx.prisma.todo.update({
      where: {
        id
      },
      data: {
        isCompleted: is_completed
      }
    })
  }),
  /**
   * update Procedure
   *
   ** ログインしているユーザーのTodoの内容を変更する。
   */
  update: protectedProcedure.input(updateInput).mutation(({ ctx, input }) => {
    const { id, text } = input
    return ctx.prisma.todo.update({
      where: {
        id
      },
      data: {
        text
      }
    })
  }),
  /**
   * delete Procedure
   *
   ** 指定したTodoを削除する。
   */
  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => ctx.prisma.todo.delete({ where: { id: input } }))
})
