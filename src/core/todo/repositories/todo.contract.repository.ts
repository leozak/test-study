import { Todo, TodoPresenter } from "../schemas/todo.contract";

export interface FindAllTodosRepository {
  findAll(): Promise<Todo[]>;
}

export interface CreateTodosRepository {
  create(todo: Todo): Promise<TodoPresenter>;
}

export interface DeleteTodosRepository {
  remove(id: string): Promise<TodoPresenter>;
}

export interface TodoRepository
  extends
    FindAllTodosRepository,
    CreateTodosRepository,
    DeleteTodosRepository {}
