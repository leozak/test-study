import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo", () => {
  test("deve retornar um novo todo válido", () => {
    // AAA -> Arrange, Act, Assert

    // Arrange
    const expectedTodo = {
      id: expect.any(String),
      description: "meu novo todo",
      createdAt: expect.any(String),
    };

    // Act
    const newTodo = makeNewTodo(expectedTodo.description);

    // Assert
    expect(newTodo.description).toBe(expectedTodo.description);
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
