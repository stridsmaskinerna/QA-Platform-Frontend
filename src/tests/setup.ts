import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../mocks/network/node";
import { mockAPI } from "./testUtils";

beforeAll(() => server.listen());

afterEach(() => {
    server.resetHandlers();
    mockAPI.mockClear();
    cleanup();
});
afterAll(() => server.close());
