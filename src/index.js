import Webhook from "./discord";
const { WebhookEmbed } = require("./discord");

import { expandPattern } from "./glob";

const env = process.env;

/**
 * 
 * @param {string} name 
 * @returns {string | null}
 */
const getEnv = name => env[name]?.trim() || null;

/**
 * @param {string} webhook 
 * @param {string} func 
 * @param {string} name 
 */
function applySetting(webhook, func, name) {
    const value = getEnv(name);
    if (value) webhook[func](value);
};

class EmbedBuilder {
    /**
     * @type {WebhookEmbed}
     */
    embed = {
        "author": {},
        "color": undefined,
        "description": undefined,
        "fields": [],
        "footer": {},
        "image": {},
        "thumbnail": {},
        "timestamp": undefined,
        "title": undefined,
        "url": undefined
    };

    /**
     * @type {boolean}
     */
    changed = false;

    constructor() { };

    /**
     * @param {string} key 
     * @param {any} value 
     */
    #set(key, value) {
        this.embed[key] = value;
        this.changed = true
    };

    /**
     * @param {string} description 
     */
    setDescription(description) {
        this.#set("description", description);
    };

    /**
     * @param {string} title 
     */
    setTitle(title) {
        this.#set("title", title);
    };

    /**
     * @param {string} url 
     */
    setURL(url) {
        this.#set("url", url);
    };

    /**
     * @param {string} color 
     */
    setColor(color) {
        if (color.startsWith('#')) {
            color = parseInt(color.slice(1), 16);
        } else {
            color = parseInt(color);
        };

        this.#set("color", color);
    };

    /**
     * @param {string} path 
     * @param {any} value 
     */
    #setObj(path, value) {
        let target = this.embed;

        const keys = path.split(".");
        const lastKey = keys.pop();

        for (const key of keys) {
            if (!(key in target)) target[key] = {};
            target = target[key];
        };

        target[lastKey] = value;
        this.changed = true;
    };

    /**
     * @param {string} timestamp 
     */
    setTimestamp(timestamp) {
        if (timestamp === 'now') {
            this.embed.timestamp = new Date().toISOString();
        } else if (timestamp === 'today') {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            this.embed.timestamp = date.toISOString();
        } else {
            const parsed = parseInt(timestamp);
            this.embed.timestamp = new Date(parsed).toISOString();
        };

        this.changed = true;
    };

    /**
     * @param {string} text 
     */
    setFooterText(text) {
        this.#setObj("footer.text", text);
    };

    /**
     * @param {string} icon 
     */
    setFooterIcon(icon) {
        this.#setObj("footer.icon_url", icon)
    };

    /**
     * @param {string} name 
     */
    setAuthorName(name) {
        this.#setObj("author.name", name);
    };

    /**
     * @param {string} icon 
     */
    setAuthorIcon(icon) {
        this.#setObj("author.icon_url", icon);
    };

    /**
     * @param {string} url 
     */
    setAuthorURL(url) {
        this.#setObj("author.url", url);
    };

    /**
     * @param {string} url 
     */
    setImage(url) {
        this.#setObj("image.url", url)
    };

    /**
     * @param {string} url 
     */
    setThumbnail(url) {
        this.#setObj("thumbnail.url", url);
    };

    /**
     * @param {string} keyvalues 
     */
    addFields(keyvalues) {
        const lines = keyvalues.trim().split('\n');

        for (const line of lines) {
            const [name, value] = line.split('=');
            this.embed.fields?.push({ name, value });
        };

        this.changed = true;
    };
};

/**
 * 
 * @returns {WebhookEmbed | null}
 */
function buildEmbed() {
    const builder = new EmbedBuilder();

    applySetting(builder, 'setTitle', 'EMBED_TITLE');
    applySetting(builder, 'setDescription', 'EMBED_DESCRIPTION');
    applySetting(builder, 'setURL', 'EMBED_URL');
    applySetting(builder, 'setAuthorName', 'EMBED_AUTHOR');
    applySetting(builder, 'setAuthorIcon', 'EMBED_AUTHOR_ICON');
    applySetting(builder, 'setColor', 'EMBED_COLOR');
    applySetting(builder, 'addFields', 'EMBED_FIELDS');
    applySetting(builder, 'setImage', 'EMBED_IMAGE');
    applySetting(builder, 'setThumbnail', 'EMBED_THUMBNAIL');
    applySetting(builder, 'setFooterText', 'EMBED_FOOTER');
    applySetting(builder, 'setFooterIcon', 'EMBED_FOOTER_ICON');
    applySetting(builder, 'setTimestamp', 'EMBED_TIMESTAMP');

    return builder.changed ? builder.embed : null;
};

async function main() {
    const webhookURL = env.WEBHOOK_URL;
    const content = env.CONTENT?.trim();
    const debugPrint = env.DEBUG_PRINT === 'true';
    const filesPatterns = getEnv('FILES');
    const files = [];

    if (filesPatterns) {
        for (const pattern of filesPatterns.split("\n")) files.push(...expandPattern(pattern));
    };

    const webhook = new Webhook({
        url: webhookURL,
        throwErrors: true,
        debugPrint,
    });

    applySetting(webhook, 'setUsername', 'AUTHOR');
    applySetting(webhook, 'setAvatar', 'AVATAR');

    const embed = buildEmbed();
    if (embed) webhook.addEmbed(embed);

    webhook.setFiles(files);

    try {
        await webhook.send(content);
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    };
};

main();