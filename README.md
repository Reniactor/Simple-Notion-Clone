## Setup Instructions

### Prerequisites

- Docker Desktop installed to run the PostgreSQL database container.
- Node.js installed - 18 or higher

## Running the Application

## Important Notes

- Port Requirements: Ensure that ports 3000 (frontend), 3001 (backend), and 5432 (PostgreSQL) are free and not in use by any other applications to avoid conflicts. The bash script will check for this in any case.

- Backend API: Swagger UI is available for API documentation at http://localhost:3001/api.

- To run: just type ./run.sh on the terminal. Please make sure docker desktop is running first.


## Requirements

_Frontend Dependencies_

    next: 14.2.4
    react: ^18
    react-dom: ^18
    react-icons: ^5.2.1
    @types/node: ^20
    @types/react: ^18
    @types/react-dom: ^18
    eslint: ^8
    eslint-config-next: 14.2.4
    postcss: ^8
    tailwindcss: ^3.4.1
    typescript: ^5

_Backend Dependencies_

    @nestjs/cli: ^10.0.0
    @nestjs/schematics: ^10.0.0
    @nestjs/testing: ^10.0.0
    @types/express: ^4.17.17
    @types/jest: ^29.5.2
    @types/node: ^20.3.1
    @types/supertest: ^6.0.0
    @typescript-eslint/eslint-plugin: ^6.0.0
    @typescript-eslint/parser: ^6.0.0
    eslint: ^8.42.0
    eslint-config-prettier: ^9.0.0
    eslint-plugin-prettier: ^5.0.0
    jest: ^29.5.0
    prettier: ^3.0.0
    source-map-support: ^0.5.21
    supertest: ^6.3.3
    ts-jest: ^29.1.0
    ts-loader: ^9.4.3
    ts-node: ^10.9.1
    tsconfig-paths: ^4.2.0
    typescript: ^5.1.3
