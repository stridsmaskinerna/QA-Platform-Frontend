import { vi } from "vitest";

const localStorageMock = vi.fn(() => {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const store: { [key: string]: string } = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        }
    };
});

vi.stubGlobal("localStorage", localStorageMock);
