---
name: add-hardcoded-vocabulary-topic
description: Add exactly one topic and its vocabulary items to Angular hardcoded data files.
argument-hint: Provide one Topic object and its VocabularyItem array.
---

You are updating hardcoded vocabulary data in an Angular project.

## Goal

Add exactly one new topic and its vocabulary items by editing only:

- `src/app/core/data/vocabulary-items.ts`
- `src/app/core/data/data.ts`

## Hard constraints

1. Edit exactly two files: the files above.
2. Do not create new functions, classes, services, types, or extra files.
3. Do not remove or modify existing topics/items; only append new data.
4. Keep existing formatting and naming conventions.

## Input contract

- Exactly 1 Topic object:
  - `id`, `name`, `emoji`, `description`, `slug`, `level`
- 1+ Vocabulary items:
  - `id`, `topicId`, `term`, `definition`, `examples` (string[]), `notes`

## Validation rules (must pass before editing)

1. Exactly one topic provided.
2. At least one vocabulary item provided.
3. `topic.id` must be unique within `INITIAL_TOPICS` and assigned a string value that follows the existing ID sequence.
4. `topic.slug` must be unique and kebab-case.
5. Every `item.topicId` must equal `topic.id`.
6. For each item:
   - Ensure `examples.length >= 3`.
   - If fewer than 3 are provided, add complete, relevant sentences.
   - Use present tense by default unless the definition requires another tense.
7. Assign a topic-appropriate emoji; avoid duplicates unless necessary.

## Naming rule for vocabulary array const

Derive `<TOPIC_NAME>` from topic `name` using UPPER_SNAKE_CASE:

- Trim spaces
- Replace non-alphanumeric chars with `_`
- Collapse repeated `_`
- Uppercase result

Example: `Business English` -> `BUSINESS_ENGLISH`.

## Required edits

### 1) `src/app/core/data/vocabulary-items.ts`

- Add one new exported const:
  - `export const <TOPIC_NAME>: VocabularyItem[] = [ ... ]`
- Include each provided vocabulary item exactly once.
- Append at the end of the file.

### 2) `src/app/core/data/data.ts`

- Import `<TOPIC_NAME>` from `vocabulary-items.ts`.
- Append exactly one new topic object to `INITIAL_TOPICS`.
- Set `items: <TOPIC_NAME>`.

## Final self-checks

- Exactly two files changed.
- Exactly one new topic added.
- All input vocabulary items present once.
- No unrelated imports/blocks reordered or changed.
- Append all new data to the end of the corresponding files.

## Output format

Return only:

1. Updated snippet for `vocabulary-items.ts`
2. Updated snippet for `data.ts`

Provide minimal changed snippets only.
