# Pinecast Site Builder

## Libraries

- **Site builder components** `sb-components`: Elements used to create Piencast websites
- **Site builder editor** `sb-editor`: Web application to modify site description JSON and save back to the API
- **Site builder presets** `sb-presets`: Library of preset data for the site builder
- **Site builder renderer** `sb-renderer`: Server daemon that renders Pinecast websites
- **Site builder resources** `sb-resources`: Assorted resources for metadata, font previews, and more
- **Styles** `styles`: A Pinecast-flavored styled components library

## Linking packages

1. Add the package as a dependency in the consumer's `package.json` file.
2. Run `lerna bootstrap`
3. Update the `tsconfig.json` file to point to the package, if it isn't up-to-date

## Adding a new package

1. Update `webpack.aliases.js`
2. Add it to `tsconfig.json`s
3. Add it to `package.json`s where appropriate
4. Run `lerna bootstrap`
