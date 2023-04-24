## IBIRaspNG backend

Backend server which is used to retrieve schedules in more readable format than International Banking Institute provides by default. Also includes calendar feed generator. Made by student for students, published for sustainability over some time.

### Note
- There are some yikes in this repo that need a shave.

### Features
- Schedules retriever/parser
- Groups retriever/parser
- Subscriptional calendar feed generator

### Dependencies
- `express` web framework
- `axios` http client
- `ical-generator` calendar generator
- `jsdom` DOM parser
- `jest` testing library
- `typescript` for typings
- `yarn` package manager

### Routes

- `/ping`:
  - **returns** `pong`, can be used for avalaibility checks.

- `/groups`
  - **requires** `education_level` param, possible values:
    - `undergraduate`
    - `specialty`
    - `magistracy`
    - `postgraduate`
    - `additionals`
  - **returns** an array of objects with keys such as `id` and `name`. `id` later is needed to retrieve schedules.
- `/schedules`
  - **requires** `group` param, can be retrieved by fetching `/getGroups` endpoint;
  - **requires** `dateStart` and `dateEnd` params. It's a date in `dd.MM.yyyy` format.
  - **returns** an array of days with schedules. Examples can be found at `test/parser.mocks.ts` file.
- `/calendar`
  - **requires** `group` param, can be retrieved by fetching `/getGroups` endpoint;
  - **returns** an icalendar feed with `text/calendar` content type

### Contributing

1. Fork this repo and clone it somewhere
2. Run `yarn install` in root project directory to install project dependencies
3. Run `yarn dev` to start locally, default port is `8000`, but can be overrided via `PORT` env variable
4. Make your changes, cover them with tests if possible and submit pull request.