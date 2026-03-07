import fs from "fs";
import path from "path";

export interface WebhookOptions {
    url: string;
    throwErrors: boolean;
    debugPrint: boolean;
};

export interface WebhookEmbed {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    timestamp?: string;

    author?: {
        name?: string;
        icon_url?: string;
        url?: string;
    };

    footer?: {
        text?: string;
        icon_url?: string;
    };

    image?: {
        url?: string;
    };

    thumbnail?: {
        url?: string;
    };

    fields?: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
};

export interface WebhookValues {
    username?: string;
    avatar_url?: string;
    content?: string;
    embeds?: WebhookEmbed[];
};

export default class Webhook {
    private options: WebhookOptions;

    private values: WebhookValues = {};
    private files: string[] = [];

    private async buildFormData(content: string) {
        const formData = new FormData();

        this.values.content = content;
        formData.append('payload_json', JSON.stringify(this.values));

        for (const file of this.files) {
            const fileBuffer = fs.readFileSync(file);

            formData.append(
                'upload-file',
                new Blob([fileBuffer]),
                path.basename(file),
            );
        };

        return formData;
    };

    constructor(options: WebhookOptions) {
        this.options = options;
    };

    public setUsername(username: string) {
        this.values.username = username;
    };

    public setAvatar(avatar: string) {
        this.values.avatar_url = avatar;
    };

    public setFiles(file: string[]) {
        this.files = file;
    };

    public addEmbed(embed: WebhookEmbed) {
        this.values.embeds = [embed];
    };

    public async send(content: string) {
        const formData = await this.buildFormData(content);

        if (this.options.debugPrint) {
            console.log('Sending webhook:');
            console.log(this.values);
        };

        const res = await fetch(this.options.url, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Failed to send webhook: ${text}`);
        };

        return res;
    };
};