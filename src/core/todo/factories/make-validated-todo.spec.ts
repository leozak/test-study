import { makeValidatedTodo } from "./make-validated-todo";
import * as makeNewTodoMod from "./make-new-todo";
import * as sanitizeStrMod from "@/app/utils/sanitize-str";
import * as validateTodoDescriptionMod from "@/core/todo/schemas/validate-todo-description";
import type { InvalidTodo, ValidTodo } from "@/core/todo/schemas/todo.contract";

describe("makeValidatedTodo (unit)", () => {
  test("deve chamar a função sanitizeStr com o valor correto", () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test("deve chamar a função validateTodoDescription com o retorno da sanitizeStr", () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();

    const sanitizedDescription = "clean description";

    sanitizeStrSpy.mockReturnValue(sanitizedDescription);

    makeValidatedTodo(description);

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizedDescription,
    );
  });

  test("deve chamar a função makeNewTodo se validateTodoDescription retornar sucesso", () => {
    const { description } = makeMocks();

    const result = makeValidatedTodo(description) as ValidTodo;

    expect(result.success).toBe(true);

    expect(result.todo.id).toBe("any-id");
    expect(result.todo.description).toBe("abcd");
    expect(result.todo.createdAt).toBe("any-created-at-date");
  });

  test("deve chamar retornar um erro se validateTodoDescription retornar erro", () => {
    const { description, validateTodoDescriptionSpy } = makeMocks();

    validateTodoDescriptionSpy.mockReturnValue({
      success: false,
      errors: ["any-error"],
    });

    const result = makeValidatedTodo(description) as InvalidTodo;

    expect(result).toStrictEqual({
      success: false,
      errors: ["any-error"],
    });
  });
});

const makeMocks = (description: string = "abcd") => {
  const todo = {
    id: "any-id",
    description,
    createdAt: "any-created-at-date",
  };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);

  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, "validateTodoDescription")
    .mockReturnValue({ success: true, errors: [] });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, "makeNewTodo")
    .mockReturnValue(todo);

  return {
    todo,
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};
