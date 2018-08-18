# Pinecast Site Builder

## Libraries

- **Common** `common`: Pinecast component library
- **Common showcase** `common-showcase`: Pinecast component library documentation and examples
- **Dashboard analytics** `db-analytics`: The analytics dashboard
- **Dashboard categories** `db-categories`: The component used to choose and edit categories in the dashboard
- **Dashboard import tool** `db-import-tool`: The podcast importer
- **Dashboard omnibus** `db-omnibus`: The dashboard root entry point
- **Dashboard spotify** `db-spotify`: The Spotify settings dashboard
- **Dashboard upgrade** `db-upgrade`: The Upgrade page componentry
- **Dashboard uploader** `db-uploader`: The upload widget used for uploading images and audio
- **Externals** `externals`: Node module overrides
- **Internationalization** `i18n`: Tooling for L10n and i18n
- **Site builder components** `sb-components`: Elements used to create Piencast websites
- **Site builder editor** `sb-editor`: Web application to modify site description JSON and save back to the API
- **Site builder presets** `sb-presets`: Library of preset data for the site builder
- **Site builder renderer** `sb-renderer`: Server daemon that renders Pinecast websites
- **Site builder resources** `sb-resources`: Assorted resources for metadata, font previews, and more
- **Styles** `styles`: A Pinecast-flavored styled components library
- **XHR** `xhr`: A common library for fetching data

## Linking packages

1. Add the package as a dependency in the consumer's `package.json` file.
2. Run `lerna bootstrap`
3. Update the `tsconfig.json` file to point to the package, if it isn't up-to-date

## Adding a new package

1. Update `webpack.aliases.js`
2. Add it to `tsconfig.json`s
3. Add it to `package.json`s where appropriate
4. Run `lerna bootstrap`
