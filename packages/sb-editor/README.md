# Site Builder - Editor

## Running

```sh
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
# In the root of the monorepo
./deployEditor.sh
```

To deploy the editor, you must have the Heroku command line tools installed and configured, and the AWS CLI installed and configured.
