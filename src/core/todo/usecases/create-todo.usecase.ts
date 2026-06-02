import { makeValidatedTodo } from "../factories/make-validated-todo";
import { todoRepository } from "../repositories/default.repository";

export async function createTodoUseCase(description: string) {
  const result = makeValidatedTodo(description);

  if (!result.success) {
    return result;
  }

  const createResult = await todoRepository.create(result.todo);

  return createResult;
}
