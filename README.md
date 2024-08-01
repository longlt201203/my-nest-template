# My NestJS Template

## Set up

- Create and edit `.env` file base on `.env.example`
- Run `npm install` to install dependencies
- Run `npm run migration:generate` and `npm run migration:run` to generate and run database migration
- Run `npm run start:dev` to start in watch mode

## Project structure

### Overview

- `@db`: located at `src/db`, contains entities and other files relating to database.
- `@modules`: located at `src/modules`, contains modules that prepresents the features of the project.
- `@utils`: located at `src/utils`, contains utilities.
- `@errors`: located at `src/errors`, contains error definitions.
- `@providers`: located at `src/providers`, contains 3rd party services like AWS, Google, etc.

### `@db`

Inside `@db` module, we have the following files:

- `datasource.ts`: the TypeORM datasource file, which is the connection driver that connect our code and database.
- `database.module.ts`: NestJS module that import TypeORM root module with datasource config.

Guide for creating entity (example: `Sample` entity):

1. Create your `sample.entity.ts` file inside the `entities` folder:

```ts
@Entity()
export class Sample {
  // Your column definitions
}
```

2. Export entity in `index.ts`:

```ts
export * from './sample.entity'
```

3. Re-run migration to apply change to database:

```shell
npm run migration:generate
npm run migration:run
```

### `@modules`

The `@modules` module is the root folder of all the main feature modules in our project. Example for creating a new feature module (`Sample` module):

1. Create a module folder name `sample`

```
@modules
  | sample
    | Your files here...
```

2. Create module file and service file: `sample.module.ts`, `sample.service.ts`

```ts
// sample.service.ts
@Injectable()
export class SampleService {
  // your code...
}
```

```ts
// sample.module.ts
@Module({
  providers: [SampleService],
})
export class SampleModule {}
```

3. Export them in `index.ts` file:

```ts
export * from './sample.module'
export * from './sample.service'
```

4. Other folders and files convention:
   - `dto`: contains request/response DTOs
   - `errors`: contains module error
   - Other related files like `pipe`, `filter`, `guard`, etc.

### `@utils`

`@utils` module provides utilities to out project. These are some important files:

- `env.ts`: provides `Env` constants, edit this file whenever an environment variable change.
- `validation.pipe.ts`: provides global data transform & validation.
- `iaa-exception.filter.ts`: provides global error catching and filtering.
- `api-response.dto.ts`: provides a standardizing response DTO for app. Usage example:

```ts
@Get()
getSomething() {
  return new ApiResponseDto(something, pagination, mesasge);
}
```

### `@errors`

`@errors` module provides top-level error definition. Every error should inherit `ApiError`, which is located at `api-error.ts`. Usage example:

```ts
// sample.error.ts
export class SampleError extends ApiError<DataType> {
  constructor(data: DataType) {
    super({
      code: 'sample_err',
      message: 'Sample Error!',
      detail: data,
    })
  }
}
```

You can provide module scope error by creating an `errors` folder at your module and provide error definitions inside that folder.

```
@modules
  | sample
    | errors
      | your-error-name.error.ts
      | index.ts
    | sample.module.ts
    | ...
```

When throwing error, it is catched by the exception filter.

### `@providers`

`@providers` module adds a buffer layer to 3rd party services which enable us to customize their SDKs or APIs for easy usage. The structure of our provider is almost the same as the `@modules` module, except we will have a provider module and provider's service modules inside of it.

```
@providers
  | aws
    | modules
      | s3
        | s3.module.ts
        | s3.service.ts
        | index.ts
    | aws.module.ts
    | aws.service.ts
    | index.ts
```
