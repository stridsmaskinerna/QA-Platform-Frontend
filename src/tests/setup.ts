import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../mocks/network/node";

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    cleanup();
});
afterAll(() => server.close());
