<template>
  <div class="flex h-screen bg-gray-100">
    <div class="m-auto">
      <h1>texto de ejemplo</h1>
      <p>
        {{ user }}
        {{ teammates }}
      </p>
      <p>
        {{ data }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  data: () => ({
    data: "",
    user: "",
    teammates: []
  }),
  methods: {
    
  },
  mounted() {
    console.log("mounted");
    this.user = this.$route.params.user
    this.teammates = this.$route.params.team.split(",")

    axios.post('http://localhost:3000/user/',{
      user: this.user,
      team: this.teammates
    }).then(res => {
      this.data = res.data
    }).catch(err => {
      console.log(err);
    })

  },

}
</script>