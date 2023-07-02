import { z } from 'zod'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '~/server/api/root'

/**
 * APIの型定義であるAppRouterが出力する型を推論するためのヘルパータイプ
 */
type RouterOutput = inferRouterOutputs<AppRouter>

/**
 * Todo一覧の配列型
 */
type TodoList = RouterOutput['todo']['all']

/**
 * Todoの型
 */
export type Todo = TodoList[number]

/**
 * Todoの作成時の入力バリデーション
 */
export const createInput = z
  .string()
  .min(1, 'todo must be at least 1 letter')
  .max(50, 'todo must be 50 letters or less')

/**
 * Todoの更新時の入力バリデーション
 */
export const updateInput = z.object({
  id: z.string(),
  text: z
    .string()
    .min(1, 'todo must be at least 1 letter')
    .max(50, 'todo must be 50 letters or less')
})

/**
 * Todoの完了/未完了の更新時の入力バリデーション
 */
export const toggleInput = z.object({
  id: z.string(),
  is_completed: z.boolean()
})
