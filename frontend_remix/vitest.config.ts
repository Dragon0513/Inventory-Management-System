/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        coverage: {
            provider: "c8",
            reporter: ["text", "json", "html"],
        },
        globals: true,
        environment: "happy-dom",
        setupFiles: ["./test/setup-test-env.ts"],
        reporters: "verbose",
        cache: false,
    },
})
