const socket = io('http://localhost:3000');
new Vue({
  el: '#app',
  data: {
    title: 'Chat with sockets',
    message: '',
    author: '',
    userCount: 0,
    messages: []
  },
  created () {
    this.listenIo()
  },
  methods: {
    listenIo () {
      socket.on('newUser', this.handleNewUser)
      socket.on('newMessage', this.handleNewMessage)
      socket.on('disconnect', this.handleDisconnect)
      socket.on('existingMessages', this.handleExistingMessages)
    },
    sendMessage () {
      const message = { author: this.author, message: this.message }
      socket.emit('postMessage', message)
      this.message = ''
    },
    handleNewUser (userCount) {
      this.userCount = userCount
    },
    handleNewMessage (message) {
      this.messages.push(message)
      this.scrollToBottom()
    },
    handleDisconnect (userCount) {
      this.userCount = userCount
    },
    handleExistingMessages (messages) {
      this.messages = messages
      this.scrollToBottom()
    },
    retrieveTime (value) {
      const date = new Date(value)
      return date.toLocaleTimeString()
    },
    scrollToBottom () {
      setTimeout(() => {
        const messageSection = document.querySelector('#messages')
        messageSection.scrollTop = messageSection.scrollHeight
      }, 0)
    }
  }
})