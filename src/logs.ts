export default function log(msg1: string, colour: string, ...msg: any[]) {
  let fn;
  // if the final argument is a function
  if (typeof msg[msg.length - 1] === "function")
    // use the final argument as the function instead of console.log
    fn = msg.pop();
  // otherwise use console.log
  else fn = console.log;
  fn(
    `%c${msg1}`,
    `background: ${colour}; color: white; padding-inline: 4px; border-radius: 2px; font-family: Monaspace, monospace`,
    ...msg
  );
}
