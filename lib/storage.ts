export interface UrlRecord {
  id: number;
  code: string;
  originalUrl: string;
  createdAt: number;
}

let currentId = 100000;
const codeMap = new Map<string, UrlRecord>();

export const db = {
  createUrl: (originalUrl: string, code: string) => {
    currentId++;
    const record: UrlRecord = {
      id: currentId,
      code,
      originalUrl,
      createdAt: Date.now(),
    };
    codeMap.set(code, record);
    return record;
  },

  getNextId: () => currentId + 1,

  findByCode: (code: string) => codeMap.get(code) || null,
};