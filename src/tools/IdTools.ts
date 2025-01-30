export function generateNumId(): string {
    return Number(Math.random().toString().substring(3, 3) + Date.now()).toString(36);
}