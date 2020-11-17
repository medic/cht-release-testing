## Setting up Vscode for e2e debugging. 

1. This assumes you have gone through the (devekopment)[https://github.com/medic/cht-core/blob/master/DEVELOPMENT.md] setup guide. 
1. Open a terminal to cht-core repo.
1. Create a symlink to the vscode folder here to your cht-core repo. This will allow us to use git to manage any potential changes we need to share in this repo.
    EX:  ln -s /home/user_name/dev/medic-release-testing/ide_config/vscode/ /home/user_name/dev/cht-core/.vscode

1. Click the debug icon on the left tool bar.
1. Select launch e2e
1. This will now deploy our code as if you ran the command `grunt e2e-deploy` and start the `scripts/e2e/e2e-servers` script.


## Debugging a single spec file

1. Open `tests/conf.js`
1. Comment out the suites object.
1. Add  `specs: ['path/to/your/spec.js']` 
1. Click the debug icon on the left tool bar.
1. Select launch e2e
1. You should now see the tests defined in that spec run. 


## Debugging a single test by using grep. 

1. Open launch.json
1. Add grep argument with the name of your test to the args array. Note: if you have defined specs or suites that do not include the spec.js. It will not find the test to run.  
      EX: `["${workspaceRoot}/tests/conf.js","--grep=should show the correct privacy policy on login"]`
1. Click the debug icon on the left tool bar.
1. Select launch e2e


## Async/Await

Using async/await in tests allows us to debug the tests as they execute code. Instead of being tossed into the queue and then seeing it occur. 


Here's an example of how to use it on our login function in conf.js. Placing a breakpoint at any of the await lines will pause execution at that point. Clicking the continue button will execute the action and then move to the next breakpoint or continue. 


```
  const login = async (browser) => {
  await browser.driver.get(getLoginUrl());
  await browser.driver.findElement(by.name('user')).sendKeys(auth.username);
  await browser.driver.findElement(by.name('password')).sendKeys(auth.password);
  await browser.driver.findElement(by.id('login')).click();
  // Login takes some time, so wait until it's done.
  const bootstrappedCheck = () =>
    element(by.css('body.bootstrapped')).isPresent();
  return browser.driver.wait(
    bootstrappedCheck,
    20 * 1000,
    'Login should be complete within 20 seconds'
  );
};
```