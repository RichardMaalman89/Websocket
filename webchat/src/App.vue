<template>
  <div id="app">
    
    <section>
      
      <canvas ref="canvas" style="display: none;"></canvas>
    
      <div class="container grid-3-9">
        <section class="left-section">
          <section class="top-section">
            <h1>What is your name?</h1>
            <input type="text" ref="name_input">

            <h1>Set an avatar</h1>
            <input type="file" name="avatar" id="avatar" ref="avatar_input" @change="setPreview">

            <img id="avatar_preview" alt="">

            <button @click="joinChat">Enter</button>

          </section>
          <video ref="video" autoplay="true" ></video>
          <Chat :name="name" :color="color" />
        </section>
        
        <Users /> 
      </div>  
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import Chat from './components/Chat.vue';
import Users from './components/Users';

import io from './socketio';

export default {
  name: 'app',
  data () {
    return {
      id: 0,
      name: '',
      color: '',
      avatar: '',
      defaultAvatar: 'data:image/png;base64,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'
    }
  },
  components: {
    Chat,
    Users
  },
  methods: {
    init () {
      let _this = this;

      io.emit('joined', {name: _this.name, avatar: _this.avatar, color: _this.color});

      // if(!sessionStorage.getItem('name')) {
      //   this.id = this.name;
      //   sessionStorage.setItem('name', this.name);
      // } else {
      //   this.id = sessionStorage.getItem('name');
      // }

      let video = this.$refs.video;
      let canvas = this.$refs.canvas;
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.onloadedmetadata = function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            setInterval(() => {
              canvas.getContext('2d').drawImage(video, 0, 0);
              io.emit('image', {id: io.id, image: canvas.toDataURL('image/jpeg', 0.5)});
            }, 100);
          }
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
      }
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    setPreview() {
      this.readFile(this.$refs.avatar_input.files[0], function(result) {
        document.getElementById("avatar_preview").src = result;
      });
    },

    readFile(file, callback) {
      var FR = new FileReader();
      FR.addEventListener('load', (e) => {
        callback(e.target.result);
      });
      FR.readAsDataURL(file);
    },

    joinChat (e) {
      this.name = this.$refs.name_input.value;
      this.color = this.getRandomColor();
      if(this.$refs.avatar_input.files[0]) {
        this.readFile(this.$refs.avatar_input.files[0], function(result) {
          this.avatar = result;
          this.init();
        }.bind(this));
      }else {
        this.avatar = this.defaultAvatar;
        this.init();
      }
      
    }
  },
  mounted () {
    io.on('connect', function() {

    });

    // if(sessionStorage.getItem('name')) {
    //   this.name = sessionStorage.getItem('name');
    // this.init();
    // }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
}

h1 {
  margin: 0;
}

.grid-3-9 {
  display: grid;
  grid-template-columns: 1fr 4fr;
}

video {
  width: 100%;
}

.top-section {
  border-bottom: 1px solid black;
  padding: 15px;
}

.left-section {
  border-right: 20px solid black;
}

</style>
