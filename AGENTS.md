# AGENTS.md

## Global project information

**Fluent Tongue Angular** is an Angular application focused on helping users remember **English words and phrases grouped by topic**.

### Main goal

Allow users to:

- Create and manage thematic topic collections.
- Save and organize English words, expressions, and phrases.
- Practice vocabulary through review sessions.
- Track retention and learning progress by topic.

### Main stack

- **Framework:** Angular
- **Language:** TypeScript
- **Styling:** SCSS or CSS depending on the project setup
- **Recommended architecture:** feature-based + shared/core

### Functional domains

- **Authentication:** access and session management.
- **Dashboard/Home:** progress summary and quick access.
- **Topics:** topic listing, detail, creation, and editing.
- **Vocabulary:** word and phrase management by topic.
- **Study/Review:** spaced review and memorization sessions.
- **Progress:** metrics, history, and retention progress.
- **Settings/Profile:** study preferences and user information.

---

## Recommended project structure

```text
src/
  app/
    core/
      guards/
      interceptors/
      models/
      services/
      constants/
    shared/
      components/
      directives/
      pipes/
      ui/
    features/
      auth/
        pages/
        components/
        services/
        models/
      dashboard/
        pages/
        components/
      topics/
        pages/
        components/
        services/
        models/
      vocabulary/
        pages/
        components/
        services/
        models/
      study/
        pages/
        components/
        services/
        models/
      progress/
        pages/
        components/
        services/
      settings/
        pages/
        components/
    layout/
      components/
    app.routes.ts
    app.config.ts
  assets/
    images/
    icons/
    i18n/
    data/
  environments/
```

---

## Structure conventions

### `src/app/core`

Contains cross-cutting logic for the whole application:

- Singleton services.
- Navigation guards.
- HTTP interceptors.
- Base models.
- Global configuration.
- Reusable constants.
- Shared domain interfaces in `src/app/core/models.ts`.
- Local persistence services for browser storage access.

**Expected examples:**

- `src/app/core/services/auth.service.ts`
- `src/app/core/services/storage.service.ts`
- `src/app/core/services/storage.service.ts`
- `src/app/core/guards/auth.guard.ts`

### `src/app/shared`

Contains reusable pieces shared across features:

- Shared UI components.
- Pipes.
- Directives.
- Generic visual elements.

**Expected examples:**

- `src/app/shared/components/vocabulary-card/vocabulary-card.component.ts`
- `src/app/shared/components/empty-state/empty-state.component.ts`
- `src/app/shared/pipes/topic-label.pipe.ts`

### `src/app/features`

Contains logic grouped by functional domain. Each feature should encapsulate:

- Pages.
- Feature-specific components.
- Domain services.
- Domain models.

---

## Page location

**Pages** should be placed inside:

```text
src/app/features/<feature>/pages/
```

### Recommended examples

#### Auth

```text
src/app/features/auth/pages/login-page/
src/app/features/auth/pages/register-page/
```

#### Dashboard

```text
src/app/features/dashboard/pages/home-page/
```

#### Topics

```text
src/app/features/topics/pages/topic-list-page/
src/app/features/topics/pages/topic-detail-page/
src/app/features/topics/pages/topic-form-page/
```

Temporary implementation in this project also uses:

```text
src/app/pages/topics.page/
```

#### Vocabulary

```text
src/app/features/vocabulary/pages/vocabulary-list-page/
src/app/features/vocabulary/pages/vocabulary-form-page/
```

#### Study

```text
src/app/features/study/pages/study-session-page/
src/app/features/study/pages/study-result-page/
```

#### Progress

```text
src/app/features/progress/pages/progress-page/
src/app/features/progress/pages/history-page/
```

#### Settings

```text
src/app/features/settings/pages/profile-page/
src/app/features/settings/pages/preferences-page/
```

---

## Component location

**Feature-specific components** should be placed inside:

```text
src/app/features/<feature>/components/
```

### Examples

```text
src/app/features/topics/components/topic-card/
src/app/features/topics/components/topic-filters/
src/app/features/vocabulary/components/vocabulary-form/
src/app/features/study/components/study-toolbar/
src/app/features/study/components/review-card/
src/app/features/progress/components/progress-summary/
```

**Global reusable components** should be placed inside:

```text
src/app/shared/components/
```

### Examples

```text
src/app/shared/components/button/
src/app/shared/components/modal/
src/app/shared/components/loader/
src/app/shared/components/confirm-dialog/
```

**Layout components** should be placed inside:

```text
src/app/layout/components/
```

### Examples

```text
src/app/layout/components/sidebar/
src/app/layout/components/topbar/
src/app/layout/components/main-shell/
```

---

## Recommended organization rules

- Place each feature in its own directory inside `features/`.
- Keep each domain's routes close to its pages.
- Avoid business logic inside presentational components.
- Centralize API access and persistence in services.
- Reuse common UI from `shared/`.
- Reserve `core/` for global services and cross-cutting configuration.
- Name pages with the `-page` suffix and components according to their purpose.

---

## Suggested routes

Example main navigation:

- `/login`
- `/register`
- `/home`
- `/topics`
- `/topics/new`
- `/topics/:id`
- `/topics/:id/edit`
- `/topics/:id/vocabulary`
- `/study/:topicId`
- `/progress`
- `/settings`

Home page topic cards should redirect to `/topics/:id`.

---

## Main domain entities

### Topic

Represents a thematic learning category.

- `id`
- `name`
- `description`
- `slug`
- `level`
- `createdAt`

### VocabularyItem

Represents an English word, phrase, or expression.

- `id`
- `topicId`
- `term`
- `translation`
- `example`
- `notes`
- `lastReviewedAt`

### ReviewSession

Represents a vocabulary review session.

- `id`
- `topicId`
- `startedAt`
- `finishedAt`
- `correctAnswers`
- `wrongAnswers`

### UserProgress

Represents the user's learning progress.

- `totalTopics`
- `totalVocabularyItems`
- `reviewsCompleted`
- `streak`
- `accuracy`

---

## Purpose of this guide

This file serves as a quick reference to:

- Understand the purpose of the project.
- Maintain a consistent structure.
- Correctly place pages and components.
- Support product growth without losing architectural order.
