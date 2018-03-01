# Pinecast Site Builder

## Running

```sh
cd packages/renderer
npm run start
```
```sh
cd packages/editor
npm run dev
```

## Configuring dev installation

Update your `settings_local.py` with

```
SITE_BUILDER = {
    'hostname': 'localhost:8001',
    'version': 'build',
}
```

Now visit `http://localhost:8000/sites/site_builder/editor/view/<podcast slug>`

## Deploying

```sh
# Deploy the editor to production or staging
./deployEditor.sh

# Deploy the renderer
./deployRenderer.sh
```

To deploy the editor, you must have the Heroku command line tools installed and configured, and the AWS CLI installed and configured.

To deploy the renderer, you must have the correct key for the application server(s) installed.
