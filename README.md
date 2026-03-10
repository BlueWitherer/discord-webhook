# discord-webhook
Simple way to send Discord webhook messages with GitHub Actions.

This action runs using the latest version of Bun.

## Usage
Let's start off by adding this action in your workflow file!
```yml
- uses: BlueWitherer/discord-webhook@main
  with:
    webhook-url: ${{ secrets.RELEASE_WEBHOOK }}
```

### Inputs
Here are the inputs this workflow receives to build your Discord embed.

#### Required
Required input fields.

##### `webhook-url`
The webhook URL to send the message to.
```yml
with:
  webhook-url: ${{ secrets.YOUR_WEBHOOK_SECRET }}
```

#### Optional
Optional input fields.

##### `content`
The content of the message to send. Can contain multiple lines.
```yml
with:
  content: "Hello world!"
```
```yml
with:
  content: |
    This is a test message
    with multiple lines!
```

##### `author`
The author of the webhook message.
```yml
with:
  author: "Epic Workflow"
```

##### `avatar`
The avatar of the webhook message author.
```yml
with:
  avatar: "[Epic Workflow](https://i.imgur.com/vIVtTrU.png)"
```

##### `embed-title`
The title of the embed.
```yml
with:
  embed-title: "Test Embed"
```

##### `embed-description`
The description of the embed.
```yml
with:
  embed-description: "This is a test embed."
```

##### `embed-url`
The title URL of the embed.
```yml
with:
  embed-url: "https://github.com/BlueWitherer/discord-webhook"
```

##### `embed-author`
The author of the embed.
```yml
with:
  embed-author: "Some Author"
```

##### `embed-author-icon`
The icon of the embed author.
```yml
with:
  embed-author-icon: "https://i.imgur.com/vIVtTrU.png"
```

##### `embed-color`
The color of the embed in hex format such as `#RRGGBB`.
```yml
with:
  embed-color: "#FF7FED"
```

##### `embed-fields`
The fields of the embed.
Each line should be a field in the format `name=value`.

Up to 25 fields.
```yml
with:
  embed-fields: |
    first=First field
    second=Second field
    third=Third field
    fourth=Fourth field
```

##### `embed-image`
The image of the embed, usually the large image.
```yml
with:
  embed-image: "https://i.imgur.com/vIVtTrU.png"
```

##### `embed-thumbnail`
The thumbnail of the embed, usually the small image.
```yml
with:
  embed-thumbnail: "https://i.imgur.com/vIVtTrU.png"
```

##### `embed-footer`
The footer text of the embed.
```yml
with:
  embed-footer: "Test Footer"
```

##### `embed-footer-icon`
The icon of the footer.
```yml
with:
  embed-footer-icon: "https://i.imgur.com/vIVtTrU.png"
```

##### `embed-timestamp`
The timestamp of the embed.
```yml
with:
  embed-timestamp: "now"
```

##### `files`
The files to send with the message.
Each line should be a path to a file.
Glob patterns are supported.

Up to 10 files. Supports a total of `25MB`.
```yml
with:
  files: |
    *.md
    *.json
```

##### `debug-print`
Print the message to the console before sending it.
```yml
with:
  debug-print: true
```