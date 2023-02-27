import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = () => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

    
    socket?.removeAllListeners();
    socket = manager.socket('/');


    addListeners();
}


const addListeners = () => {

    const clientsUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    const serverStatusLabel = document.querySelector('#server-status')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'connected';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${ clientId }</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if( messageInput.value.trim().length <= 0 ) return;

        socket.emit('client-usd-iota-conversion', { 
            id: 'YO!!', 
            message: messageInput.value 
        });

        socket.emit('client-usd-shimmer-conversion', { 
            id: 'YO!!', 
            message: messageInput.value 
        });

        socket.emit('transaction-info-shimmer', { 
            id: 'YO!!', 
            message: messageInput.value 
        });

        socket.emit('ping', { 
    
            message: 'Hola'
        });

        messageInput.value = '';
    });

    socket.on('pong', ( payload: { message: number }) => {
        const newMessage = `
            <li>
                <strong>${ payload.message }</strong>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );
    })

    socket.on('server-usd-iota-conversion', ( payload: { conversion: number }) => {
        console.log('iota: ', payload.conversion);
        const newMessage = `
            <li>
                <strong>${ payload.conversion }</strong>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );
    })

    socket.on('server-usd-shimmer-conversion', ( payload: { conversion: number }) => {
        console.log('smr: ', payload.conversion);
        const newMessage = `
            <li>
                <strong>${ payload.conversion }</strong>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );
    })

    socket.on('server-transaction-info-shimmer', ( payload ) => {
        console.log('smr: ', payload);
        const newMessage = `
            <li>
                <strong>${ payload }</strong>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );
    })
}