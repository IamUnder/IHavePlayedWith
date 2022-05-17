
<template>
  <div class="flex h-screen bg-gray-100">
    <div class="m-auto">
      <h2 class="text-3xl font-extrabold leading-9 tracking-tight text-indigo-600 sm:text-4xl sm:leading-10 text-center">
        I Have Played With...
      </h2>
      <div class="flex pt-4">
        <input v-model="user" type="text" name="summonerName" id="summonerName" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300" placeholder="Your account">
        <input v-model="teammates" @change="updateArrayTeammates" type="text" name="team" id="team" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300" placeholder="Teammates">
      </div>
      <div class="flex pt-4 justify-center">
        <button
            @click="check"
            class="items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
            >Check it</button>
          
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    user: "",
    teammates: "",
    arrayTeammates: [],
  }),
  methods: {
    check() {
      // Comprobamos que ninguno de los das campos este vacio
      if (this.user == "" || this.arrayTeammates.length == 0) console.log("Los campos estan vacios fiera");

      // Comprobamos que el usuario no este en el array
      this.notYourself(this.arrayTeammates, this.user)

      // Redireccionamos a la pagina de resultados
      if (this.arrayTeammates.length != 0) this.$router.push({ path: `/${this.user}&team=${this.arrayTeammates.join(',')}` })
    },
    updateArrayTeammates() {
      if (!this.teammates) return this.arrayTeammates = [];
      while (this.teammates.includes(" joined the lobby")) {
        this.teammates = this.teammates.replace(" joined the lobby", ",");
      }
      while (this.teammates.includes(" se ha unido a la sala.")) {
        this.teammates = this.teammates.replace(" se ha unido a la sala.", ",");
      }
    
      if (!this.teammates.includes(",")) return this.arrayTeammates = [this.teammates.toLowerCase()];

      this.arrayTeammates = this.teammates.toLowerCase().split(",");
      // Comprbamos que la ultima posicion del array no este vacia
      if (this.arrayTeammates[this.arrayTeammates.length - 1] === "") {
        this.arrayTeammates.pop();
      }

    },
    notYourself(arr, name) {
      var i = arr.indexOf(name.toLowerCase());
      if (i !== -1) {
        arr.splice(i, 1)
      }
    }
  }  
}
</script>
