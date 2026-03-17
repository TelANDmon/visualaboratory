import { formatCsvFileToJsonFile } from "./csvFileToJsonFile"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { readFile, writeFile } from "node:fs/promises";

vi.mock("node:fs/promises", () => ({
    readFile: vi.fn(),
    writeFile: vi.fn()
}))

const fReadFile = vi.mocked(readFile)
const fWriteFile = vi.mocked(writeFile)

describe("проверка функции formatCsvFileToJsonFile", () => {
    beforeEach(() => {
        vi.clearAllMocks();

    })
    it("проверка на чтение и запись", async () => {
        fReadFile.mockResolvedValue("p1;p2\n1;A\n2;B")
        await formatCsvFileToJsonFile("data/new.csv","data/new.json",";")
        expect(fWriteFile).toHaveBeenCalledWith("data/new.json",JSON.stringify([
            {p1: 1, p2: "A"},
            {p1: 2, p2: 'B'}
        ],null,2)
    );
});
    it("провверка на передачу пустых значений", async () => {
        await expect(
            formatCsvFileToJsonFile("","","")).rejects.toThrow("ошибочка пустого значения")
    })
    it("проверка на наличие входного файла", async () => {
        fReadFile.mockRejectedValue(new Error("ENOENT"))
        await expect(() => formatCsvFileToJsonFile("data/new.csv","data/new.json",";")).rejects.toThrow("ошибка чтения файла")
    })
    it("ошибка записи в файл", async () => {
        fReadFile.mockResolvedValue("p1;p2\n1;A\n2;B")
        fWriteFile.mockRejectedValue(new Error("EACESS"))
        await expect(() => formatCsvFileToJsonFile("data/new.csv","data/new.json",";")).rejects.toThrow("ошибка на запись в файл")
    })
    it("проработка Error вне объекта", async () => {
    const fError = "хз че" as unknown;
    fReadFile.mockRejectedValue(fError);
    await expect(
        formatCsvFileToJsonFile("data/new.csv", "data/new.json", ";")
    ).rejects.toBe(fError);
});
});