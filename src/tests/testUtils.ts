import { vi } from "vitest";
import { IPaginationMeta } from "../utils";

export const mockAPI = vi.fn();

const paginationMeta: IPaginationMeta = {
    TotalItemCount: 10,
    PageNr: 1,
    TotalPageCount: 1,
    Limit: 20,
};

export const paginationMetaJSON = JSON.stringify(paginationMeta);
