export function isServer(): boolean {
    return typeof window === "undefined";
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
