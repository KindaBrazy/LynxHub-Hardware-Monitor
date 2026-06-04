---
trigger: always_on
---

# AI Agent Guidelines & Development Workflow

Please follow these specific rules and instructions when developing or modifying the Hardware Monitor Extension.

---

## 🚫 Commands & Testing

- **Do NOT run the production build (`npm run build` or `npm run build:extension`) to verify your code changes.**
  - Build steps are slow and unnecessary during early coding stages.
  - Rely on hot reloading in the dev server (`npm run dev` in the parent directory) to verify UI and logic updates if the app is running.
- **Linting & Formatting**:
  - Always run the parent directory's formatting script after finishing code changes:
    ```powershell
    # Run this in the parent directory (d:/Programming/LynxHub)
    npm run fix-linter-ext
    ```
  - This runs Prettier and ESLint specifically on the `extension` subdirectory.
- **Type-checking**:
  - Run the parent directory's type-checker script:
    ```powershell
    # Run this in the parent directory (d:/Programming/LynxHub)
    npm run typecheck
    ```
  - **CRITICAL**: The script type-checks both the main application and the extension. **Ignore any type errors originating from the main app.** Focus strictly on resolving type errors inside the `extension/` subdirectory.

---

## 🧩 Tooling & MCP Integration

- **UI Components & Styling**:
  - Use the `heroui-react` MCP server tools (`list_components`, `get_component_docs`, etc.) to lookup information on UI components (the project uses `@heroui/react`).
- **General Documentation**:
  - Use the `context7` MCP server tools (`query-docs`, `resolve-library-id`) for any library documentation lookups other than HeroUI.

---

## 💡 Important Extension Context

- **Settings Updates & Configuration Lifecycle**:
  - If you alter settings schemas in `src/cross/types.ts` and `src/cross/constants.ts`, you **must** increment `configVersion` in `initialSettings` and add migration mappings inside `HardwareMonitorService.ts` (`loadConfig()`).
  - IPC communications use JSON-serialized strings over channels like `HMONITOR_IPC_SET_CONFIG`.
