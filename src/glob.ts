import { readdirSync } from "fs";
import { join } from "path";

export function expand(pattern: string): string[] {
    if (!pattern.includes("*")) return [pattern];

    const dir = pattern.includes("/") ? pattern.slice(0, pattern.lastIndexOf("/")) : ".";
    const match = pattern.slice(pattern.lastIndexOf("/") + 1);

    const regex = new RegExp("^" + match.replace("*", ".*") + "$");
    return readdirSync(dir)
        .filter((file) => regex.test(file))
        .map((file) => join(dir, file));
};