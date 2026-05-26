import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  test("deve retornar erros quando a descrição tem menos de 3 caracteres", () => {
    const description = "abc";
    const result = validateTodoDescription(description);

    expect(result.errors).toStrictEqual([
      "A descrição deve ter pelo menos 4 caracteres",
    ]);
    expect(result.success).toStrictEqual(false);
  });

  test("deve retornar sucesso quando a descrição tem mais de 3 caracteres", () => {
    const description = "abcd";
    const result = validateTodoDescription(description);

    expect(result.errors).toStrictEqual([]);
    expect(result.success).toStrictEqual(true);
  });
});
