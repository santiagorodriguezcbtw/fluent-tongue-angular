[![Netlify Status](https://api.netlify.com/api/v1/badges/ff302063-4b43-483a-b583-82818d939e72/deploy-status)](https://app.netlify.com/projects/startling-dieffenbachia-a90272/deploys)

# Fluent Tongue

**Live URL:** [Fluent Tongue](https://startling-dieffenbachia-a90272.netlify.app)\
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Folder Structure

```text
app/
├── core/ # Singleton services, guards, interceptors, config global
│   ├── services/
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   └── core.module.ts
│
├── shared/ # Reutilizable en toda la app
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   ├── ui/
│   └── shared.module.ts
│
├── layouts/ # Estructuras visuales principales
│   ├── main-layout/
│   │   ├── components/
│   │   ├── main-layout.component.ts
│   │   ├── main-layout.component.html
│   │   └── main-layout.component.scss
│   ├── auth-layout/
│   └── admin-layout/
│
├── routes/ # Configuración central de rutas
│   ├── app.routes.ts
│   ├── auth.routes.ts
│   └── admin.routes.ts
│
├── pages/ # Páginas agrupadas por dominio/feature
│   ├── home/
│   │   ├── components/
│   │   ├── services/
│   │   ├── home.page.ts
│   │   ├── home.page.html
│   │   └── home.page.scss
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── services/
│   ├── users/
│   │   ├── components/
│   │   ├── services/
│   │   ├── pages/
│   │   │   ├── user-list/
│   │   │   └── user-detail/
│   │   └── models/
│   └── dashboard/
│
├── components/ # Componentes globales si no van en shared
│   ├── header/
│   ├── footer/
│   └── sidebar/
│
├── services/ # Servicios globales si no pertenecen a core
│   ├── api.service.ts
│   └── storage.service.ts
│
├── app.component.ts
├── app.component.html
├── app.component.scss
└── app.config.ts
```
