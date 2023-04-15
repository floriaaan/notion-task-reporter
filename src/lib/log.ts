/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

function getStackTrace() {
    let stack;
  
    try {
      throw new Error("");
    } catch (error) {
      stack = (error as Error).stack || "";
    }
  
    stack = stack.split("\n").map((line) => line.trim());
    return stack.splice(stack[0] === "Error" ? 2 : 1);
  }
  
  const getInitiator = () => {
    // _getInitiatorLine, _ObjectInfoLine, caller
    const [, , caller] = getStackTrace();
    const file = caller.split("/").at(-1) || "";
    return file.replace(")", "");
  };
  
  const warn = (...args: any[]) => {
    console.group(
      `\x1b[33m${new Date().toISOString()} - WARN - ${getInitiator()}\x1b[0m`
    );
    console.warn(...args);
    console.groupEnd();
  };
  const error = (...args: any[]) => {
    console.group(
      `\x1b[31m${new Date().toISOString()} - ERROR - ${getInitiator()}\x1b[0m`
    );
    console.error(...args);
    console.groupEnd();
  };
  const info = (...args: any[]) => {
    console.group(
      `\x1b[34m${new Date().toISOString()} - INFO - ${getInitiator()}\x1b[0m`
    );
    console.log(...args);
    console.groupEnd();
  };
  const debug = (...args: any[]) => {
    console.log(...args);
  };
  
  /**
   * @description a simple interface logger for logging to the console and into a log drain in the future
   * @example
   * log.warn('this is a warning');
   * log.error('this is an error');
   * log.info('this is an info');
   * @exports log
   */
  export const log = {
    warn,
    error,
    info,
    debug,
  };
  
  export const utils = {
    bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
    red: (text: string) => `\x1b[31m${text}\x1b[0m`,
    green: (text: string) => `\x1b[32m${text}\x1b[0m`,
    yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
    blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
    magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
    cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
    white: (text: string) => `\x1b[37m${text}\x1b[0m`,
    gray: (text: string) => `\x1b[90m${text}\x1b[0m`,
    pink: (text: string) => `\x1b[95m${text}\x1b[0m`,
  };

  export const header = `
                                                                                       
  888b      88                       88                       888888888888  88888888ba   
  8888b     88                ,d     ""                            88       88      "8b  
  88 \`8b    88                88                                   88       88      ,8P  
  88  \`8b   88   ,adPPYba,  MM88MMM  88   ,adPPYba,   8b,dPPYba,   88       88aaaaaa8P'  
  88   \`8b  88  a8"     "8a   88     88  a8"     "8a  88P'   \`"8a  88       88""""88'    
  88    \`8b 88  8b       d8   88     88  8b       d8  88       88  88       88    \`8b    
  88     \`8888  "8a,   ,a8"   88,    88  "8a,   ,a8"  88       88  88       88     \`8b   
  88      \`888   \`"YbbdP"'    "Y888  88   \`"YbbdP"'   88       88  88       88      \`8b  
                                                                                         
  Notion Task Reporter - the easiest way to generate a reporting your tasks to Notion!
  @floriaaan - 2023                                                                                  
  `
