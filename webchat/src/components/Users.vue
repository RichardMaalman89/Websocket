<template>
  <div>
    <section class="grid" v-if="users.length > 0">
      <User v-for="user in users" :width="totalTop" :height="totalLeft" :image="images[user.user_id].image" v-if="images[user.user_id]" :color="user.user_data.color" :name="user.user_data.name">
        
      </User>
    </section>
  </div>
</template>

<script>

import Vue from 'vue';
import User from './User';
import io from '../socketio';

export default {
  name: 'Users',
  data () {
    return {
      total: 1,
      users: [],
      images: {}
    }
  },
  components: {
    User
  },
  computed: {
    totalResults () {
      return this.users.filter(user => {
        return this.images[user]
      }).length;
    },
    totalTop () {
      return 100 / Math.ceil(Math.sqrt(this.totalResults)) + '%';
    },
    totalLeft () {
      return 100 / Math.ceil(Math.sqrt(this.totalResults)) + '%';
    }
  },
  mounted() {
    let _this = this;

    io.on('init_others', (users) => {
      _this.users = users;
      console.log(_this.users);
    });

    io.on('user_joined', function(data) {
      _this.users.push(data);
    });

    io.on('user_disconnected', function(id) {
      for (let i = 0; i < _this.users.length; i++) {
        const element = _this.users[i];
        if(element.user_id == id) {
          _this.users.splice(i, 1);
          return;
        }
      }
    });

    io.on('image', a => {
      if(!this.images[a.id]) {
        Vue.set(this.images, a.id, {});
      }

      Vue.set(this.images[a.id], 'image', a.image);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
*[class^="grid"] {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  flex-wrap: wrap;
  width: 100%;
  /* grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  align-items: flex-start; */
}
.grid-1 > * {
  height: 100%;
  width: 100%;
}

.grid-2 > * {
  height: 100%;
  width: 50%;
}

.grid-3 > *,
.grid-4 > * {
  height: 50%;
  width: 50%;
}

.grid-5,
.grid-6 {
  height: 50%;
  width: 33.3333%;
} 



</style>
