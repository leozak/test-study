import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("<Button />", () => {
  describe("props padrão e JSX", () => {
    test("deve renderizar o botão com props padrão (apenas com children)", async () => {
      render(<Button>Enviar formulário</Button>);

      const button = screen.getByRole("button", { name: /enviar formulário/i });

      expect(button).toHaveClass("bg-blue-600 hover:bg-blue-700 text-blue-100");
      expect(button).toHaveClass(
        "text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2",
      );
    });

    // test("verifica se as propriedades padrão do JSX funcionam corretamente", async () => {});
  });

  // describe("variantes (cores)", () => {
  // test("checa se default aplica a cor correta", async () => {});
  // test("checa se ghost aplica a cor correta", async () => {});
  // test("checa se danger aplica a cor correta", async () => {});
  // });

  // describe("variantes (tamanhos)", () => {
  // test("tamanho sm deve ser menor", async () => {});
  // test("tamanho md deve ser médio", async () => {});
  // test("tamanho lg deve ser maior", async () => {});
  // });

  // describe("disabled", () => {
  // test("classes para estado desativado estão corretamente", async () => {});
  // });
});
