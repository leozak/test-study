import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr (unit)", () => {
  test("retorna uma string vazia se a entrada for falsy", () => {
    // @ts-expect-error testando função sem parâmetros
    expect(sanitizeStr()).toBe("");
  });

  test("retorna uma string vazia quando recebe um valor que NÃO é uma string", () => {
    // @ts-expect-error testando função com parâmetros incorretos
    expect(sanitizeStr(123)).toBe("");
  });

  test("retorna uma string limpa com o trim", () => {
    expect(sanitizeStr(" abc   ")).toBe("abc");
  });

  test("retorna uma string normalizada com NFC", () => {
    const original = "e\u0301";
    const expected = "é";
    expect(sanitizeStr(original)).toBe(expected);
  });
});
