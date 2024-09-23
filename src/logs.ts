export default function log(msg1: string, colour: string, ...msg:any[]) {
    console.log(`%c${msg1}`, `background: ${colour}; color: white; padding-inline: 4px; border-radius: 2px; font-family: Monaspace, monospace`, ...msg);
}