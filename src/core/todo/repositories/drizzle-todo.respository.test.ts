import {
  insertTestTodos,
  makeTestTodoRepository,
} from "@/core/__tests__/utils/make-test-todo-repository";

describe("DrizzleTodoRepository (integration)", () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  describe("findAll", () => {
    test("deve retornar um array vazio se a tabela estiver limpa", async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });

    test("deve retornar todos os TODOs em ordem decrescente", async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.findAll();
      // { id: '4', description: 'Todo 4', createdAt: 'date 4' }
      expect(result[0].createdAt).toBe("date 4");
      expect(result[1].createdAt).toBe("date 3");
      expect(result[2].createdAt).toBe("date 2");
      expect(result[3].createdAt).toBe("date 1");
      expect(result[4].createdAt).toBe("date 0");
      expect(result).toHaveLength(5);
    });
  });

  describe("create", () => {
    test("cria um todo se os dados estão válidos", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const result = await repository.create(todos[0]);
      expect(result).toStrictEqual({ success: true, todo: todos[0] });
    });

    test("falha se houver uma descrição igual na tabela", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      // Cria o primeiro todo
      await repository.create(todos[0]);

      // Tenta criar outro todo com a mesma descrição
      const result = await repository.create({
        id: "new-id",
        description: todos[0].description, // Mesma descrição do primeiro todo
        createdAt: "new-date",
      });
      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe um todo com a mesma descrição ou id."],
      });
    });

    test("falha se houver um id igual na tabela", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      // Cria o primeiro todo
      await repository.create(todos[0]);

      // Tenta criar outro todo com o mesmo id
      const result = await repository.create({
        id: todos[0].id, // Mesmo id do primeiro todo
        description: "new-description",
        createdAt: "new-date",
      });
      expect(result).toStrictEqual({
        success: false,
        errors: ["Já existe um todo com a mesma descrição ou id."],
      });
    });
  });

  describe("delete", () => {
    test("apaga um todo se ele existir", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.remove(todos[0].id);
      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test("falha ao apagar se o todo não existir", async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.remove("non-existing-id");
      expect(result).toStrictEqual({
        success: false,
        errors: ["Todo não encontrado."],
      });
    });
  });
});
