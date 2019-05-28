<template>
  <div class="chat">
    <h2>Chat</h2>
    <ul>
      <li v-for="post in posts"><p>{{ post }}</p></li>
    </ul>
    <input type="text" v-model="text" v-on:keyup.enter="sendMsg"><button @click="sendMsg">Send text</button>
  </div>
</template>

<script>
import io from '../socketio';

export default {
  name: 'Chat',
  props: ['name', 'color'],
  data () {
    return {
      posts: [],
      text: ''
    }
  },
  methods: {
    sendMsg () {
      if (this.text) {
        io.emit('chat message', this.name +': ' + this.text);
      }
      this.text = '';
    }
  },
  mounted () {
    io.on('chat message', (data) => {
      this.posts.push(data);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chat {
  padding: 15px;
}
.chat ul {
  min-height: 200px;
  height: 100%;
  overflow-y: scroll;
  border: 2px solid black;
  padding: 0;
  margin: 0;
  list-style: none;
}

.chat li {
  border-bottom: 1px solid grey;
  padding: 10px;
}

.chat p {
  margin: 0;
}
</style>
