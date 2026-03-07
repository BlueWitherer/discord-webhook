# discord-webhook
Simple way to send Discord webhook messages with GitHub Actions.

## Usage
Let's start off by adding this action in your workflow file!
```yaml
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
> ```yaml
> with:
>   webhook-url: ${{ secrets.YOUR_WEBHOOK_SECRET }}
> ```

#### Optional
Optional input fields.

##### `content`
The content of the message to send. Can contain multiple lines.
> ```yaml
> with:
>   content: "Hello world!"
> ```
> ```yaml
> with:
>   content: |
>     This is a test message
>     with multiple lines!
> ```

##### `author`
The author of the webhook message.
> ```yaml
> with:
>   author: "Epic Workflow"
> ```

##### `avatar`
The avatar of the webhook message author.
> ```yaml
> with:
>   avatar: "[Epic Workflow](https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png)"
> ```

##### `embed-title`
The title of the embed.
> ```yaml
> with:
>   embed-title: "Test Embed"
> ```

##### `embed-description`
The description of the embed.
> ```yaml
> with:
>   embed-description: "This is a test embed."
> ```

##### `embed-url`
The title URL of the embed.
> ```yaml
> with:
>   embed-url: "https://github.com/BlueWitherer/discord-webhook"
> ```

##### `embed-author`
The author of the embed.
> ```yaml
> with:
>   embed-author: "Some Author"
> ```

##### `embed-author-icon`
The icon of the embed author.
> ```yaml
> with:
>   embed-author-icon: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
> ```

##### `embed-color`
The color of the embed in hex format such as `#RRGGBB`.
> ```yaml
> with:
>   embed-color: "#FF7FED"
> ```

##### `embed-fields`
The fields of the embed.
Each line should be a field in the format `name=value`.

Up to 25 fields.
> ```yaml
> with:
>   embed-fields: |
>     first=First field
>     second=Second field
>     third=Third field
>     fourth=Fourth field
> ```

##### `embed-image`
The image of the embed, usually the large image.
> ```yaml
> with:
>   embed-image: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
> ```

##### `embed-thumbnail`
The thumbnail of the embed, usually the small image.
> ```yaml
> with:
>   embed-thumbnail: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
> ```

##### `embed-footer`
The footer text of the embed.
> ```yaml
> with:
>   embed-footer: "Test Footer"
> ```

##### `embed-footer-icon`
The icon of the footer.
> ```yaml
> with:
>   embed-footer-icon: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
> ```

##### `embed-timestamp`
The timestamp of the embed.
> ```yaml
> with:
>   embed-timestamp: "now"
> ```

##### `files`
The files to send with the message.
Each line should be a path to a file.
Glob patterns are supported.

Up to 10 files. Supports a total of `25MB`.
> ```yaml
> with:
>   files: |
>     *.md
>     *.json
> ```

##### `debug-print`
Print the message to the console before sending.
> ```yaml
> with:
>   debug-print: true
> ```