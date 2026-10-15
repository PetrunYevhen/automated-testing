# Лабораторна робота № 1. Розгортання середовища автоматизації тестування

Дисципліна «Автоматизація тестування», спеціальність F2 «Інженерія програмного забезпечення», 4 курс.

- **Виконавець:** Петрунь Євген Валерійович
- **Група:** _<вказати групу>_
- **Варіант:** 9 — визначення, чи є рядок паліндромом, без урахування регістру та пробілів; відхилення порожнього рядка

## Структура проєкту

```
.
├── src/
│   ├── temperature.ts     # показовий модуль: celsiusToFahrenheit
│   └── palindrome.ts      # модуль варіанта 9: isPalindrome
├── tests/
│   ├── temperature.test.ts
│   └── palindrome.test.ts
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Встановлення та запуск

Потрібно: Node.js ≥ 20, npm, git.

```bash
git clone https://github.com/PetrunYevhen/automated-testing.git
cd automated-testing
git checkout lab1
npm install
```

| Команда              | Призначення                              |
| -------------------- | ---------------------------------------- |
| `npm test`           | одноразовий прогін тестів                |
| `npm run test:watch` | режим спостереження                      |
| `npm run coverage`   | прогін із покриттям (звіт у `coverage/`) |
| `npm run lint`       | статичний аналіз (ESLint)                |
| `npm run format`     | форматування (Prettier)                  |

Пороги покриття: lines ≥ 80 %, branches ≥ 80 %, functions = 100 %.
