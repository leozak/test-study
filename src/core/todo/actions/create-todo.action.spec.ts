import { createTodoAction } from "./create-todo.action";
import { makeTestTodoMocks } from "@/core/__tests__/utils/make-test-todo-mocks";

vi.mock("next/cache", () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe("createTodoAction (unit)", () => {
  test("deve chamar o createTodoUseCase com os valores corretos", async () => {
    const { createTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = "any_description";
    await createTodoAction(expectedParamCall);
    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test("deve chamar o revalidatePath se o use case retornar sucesso", async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = "any_description";

    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith("/");
  });

  test("deve retornar o mesmo valor do usecase em caso de sucesso", async () => {
    const { successResult } = makeTestTodoMocks();
    const description = "any_description";

    const result = await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });

  test("deve retornar o mesmo valor do usecase em caso de erro", async () => {
    const { createTodoUseCaseSpy, errorResult } = makeTestTodoMocks();
    createTodoUseCaseSpy.mockResolvedValueOnce(errorResult);
    const description = "any_description";

    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});
