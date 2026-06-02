import { drizzleDatabase } from "@/db";
import { DrizzleTodoRepository } from "./drizzle-todo.respository";
import { TodoRepository } from "./todo.contract.repository";

export const todoRepository: TodoRepository = new DrizzleTodoRepository(
  drizzleDatabase.db,
);
