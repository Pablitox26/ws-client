import './style.css'
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
<h2>Websocket - Client</h2>
<button id="btn-connect">Connect</button>
<br/>
<span id="server-status">offline</span>
<ul id="clients-ul"></ul>
<form id="message-form">
    <input placeholder="message" id="message-input" />
</form>
<h3>Messages</h3>
<ul id="messages-ul"></ul>
</div>
`

const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  connectToServer();
})