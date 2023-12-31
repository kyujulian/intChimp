import * as os from 'os';

import * as repl from './repl/repl';

async function main() {
  try {
    const userInfo = os.userInfo();

    console.log(
      `Welcome ${userInfo.username}! to the Monkey Programming Language console`,
    );
    console.log(`Feel free to type in commands`);
    await repl.Start();
  } catch (err) {
    console.error(err);
  }
}

main();
