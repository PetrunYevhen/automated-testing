import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // describe, it, expect доступні без імпорту (узгоджено з types у tsconfig.json)
    globals: true,
    // тестуємо чисту бізнес-логіку без DOM, тому достатньо середовища node
    environment: 'node',
    // шукаємо тести лише в каталозі tests за суфіксом .test.ts
    include: ['tests/**/*.test.ts'],
    coverage: {
      // вбудований у V8 механізм: не потребує інструментування коду
      provider: 'v8',
      // text — підсумок у терміналі, html — детальний звіт coverage/index.html
      reporter: ['text', 'html'],
      // рахуємо покриття лише для коду продукту, без тестів і конфігурацій
      include: ['src/**/*.ts'],
      // нижче цих значень прогін із покриттям завершується з помилкою
      thresholds: {
        lines: 80,
        branches: 80,
        // кожна функція модуля має бути викликана хоча б одним тестом
        functions: 100,
      },
    },
  },
});
