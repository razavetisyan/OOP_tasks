
class MessagingOperation {
    constructor(messageId, sender, receiver) {
        if (new.target === MessagingOperation) {
            throw new TypeError("can't instancied from MessagingOperation");
        }

        this.messageId = messageId;
        this.sender = sender;
        this.receiver = receiver;
        this.timestamp = Date.now();
    }

    send() {
        throw new Error("abstract method");
    }

    delete() {
        throw new Error("abstract method");
    }
}

class TextMessage extends MessagingOperation {
    constructor(messageId, sender, receiver, content) {
        super(messageId, sender, receiver);

        this.content = content;
    }

    send() {
        console.log(`${this.messageId} sended from ${this.sender.name}`);
        notify(this.receiver, this);
    }

    delete() {
        console.log(`${this.messageId} deleted`);
    }
}

class MultimediaMessage extends MessagingOperation {
    constructor(messageId, sender, receiver, filePath, fileType) {
        super(messageId, sender, receiver);

        this.filePath = filePath;
        this.fileType = fileType;
    }

    send() {
        console.log(`${this.fileType} sended from ${this.sender.name} to ${this.receiver.name}`);
        notify(this.receiver, this);
    }

    delete() {
        console.log(`${this.fileType} deleted`);
    }
}

class User {
    constructor(name, contactInfo) {
        Object.defineProperty(this, "name", nameValidation);
        Object.defineProperty(this, "contactInfo", contactValidation);

        this.name = name;
        this.contactInfo = contactInfo;
        this.isOnline = true;
        this.conversations = [];
    }

    createConversation(users) {

        this.conversations.push(users);
    }
}

class Conversation {
    constructor() {
        this.users = [];
        this.history = [];
        this.mutedUsers = new Set();
    }

    addUser(user) {
        this.users.push(user);

        user.createConversation(this);
    }

    addMessage(message) {
        this.history.push(message);
    }

    muteNotifications(user) {
        this.mutedUsers.add(user);
    }

    getHistory() {
        return this.history;
    }
}

function notify(receiver, message){
    if(!receiver.isOnline){
        console.log(`${receiver.name} have new ${message.sender.name}`);
    }else{
        console.log(`${receiver.name} received ${message.sender.name}`);
    }
}

class AdditionalFeatures extends MessagingOperation {
    constructor(messageId, receiver, sender) {
        super(messageId, receiver, sender);

        this.isRead = false;
    }

    markRead() {
        this.isRead = true;
    }

    markUnread() {
        this.isRead = false;
    }

    send(){
        console.log(`${this.sender.name} send message to ${this.receiver.name}`);
        notify(this.receiver, this);
    }

    delete(){
        console.log("Text message deleted");
    }
}

const nameValidation = {
    get() {
      return  this._name;
    },

    set(name) {

        if (typeof name !== "string") {
            throw new UserNotFoundError("must be string");
        }

        this._name = name;
    }
}

const contactValidation = {
    get() {
        return this._contactInfo;
    },
    
    set(contactInfo) {
        if (typeof contactInfo !== "string") {
            throw new InvalidMessageError("Contact info must be a string");
        }

        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regEx.test(contactInfo)) {
            throw new InvalidMessageError("Invalid email format");
        }

        this._contactInfo = contactInfo;
    }
}


class InvalidMessageError extends Error{
    constructor(m){
        super(m);
        this.name = "InvalidMessageError";
    }
}

class UserNotFoundError extends Error{
    constructor(m){
        super(m);
        this.name = "UserNotFoundError";
    }
}

// 1️⃣ Users
const alice = new User("Alice", "alice@mail.com");
const bob = new User("Bob", "bob@mail.com");

// 2️⃣ Bob offline
bob.isOnline = false;

// 3️⃣ Conversation
const chat = new Conversation();
chat.addUser(alice);
chat.addUser(bob);

// 4️⃣ First message
const msg1 = new TextMessage(1, alice, bob, "Hello Bob!");
msg1.send();  // send + notify

// 5️⃣ Add to history
chat.addMessage(msg1);

// 6️⃣ Check history length
console.log("History length:", chat.getHistory().length); // 1

// 7️⃣ isRead flag
msg1.isRead = false;
console.log("msg1 isRead:", msg1.isRead);
msg1.isRead = true;
console.log("msg1 isRead after markRead:", msg1.isRead);

// 8️⃣ Mute Bob
chat.muteNotifications(bob);

// 9️⃣ Second message
const msg2 = new TextMessage(2, alice, bob, "Are you there?");
chat.addMessage(msg2);
msg2.send(); // notification + send

// 🔟 Print history
console.log("Conversation history:");
chat.getHistory().forEach(msg => console.log(`Message ${msg.messageId}: ${msg.content || msg.fileType}`));
