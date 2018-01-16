# Pinecast Site Builder

You're goign to need to open some terminals. Ignore errors. Do them in this order:

```sh
cd packages/styles
npm run dev
```
```sh
cd packages/components
npm run dev
```
```sh
cd packages/styles
npm run dev
```
```sh
cd packages/renderer
npm run start
```
```sh
cd packages/resources
npm run build
# This will terminate. You can run `npm run build` again if you make changes to
# resources, but you probably won't.
```
```sh
cd packages/editor
npm run dev
```

## Configuring Pinecast

### Dev

Update your `settings_local.py` with

```
SITE_BUILDER = {
    'hostname': 'localhost:8001',
    'version': 'build',
}
```

Now visit `http://localhost:8000/sites/site_builder/editor/view/<podcast slug>`
