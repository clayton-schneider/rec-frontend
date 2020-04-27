<template>
  <v-bottom-navigation class="d-flex d-sm-none" app>
    <v-btn class="remove-width" to="/dashboard">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      absolute
      top
      fab
      color="accent"
      class="fab-round remove-width"
      to="/request"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn class="remove-width" to="/add-credits">
      <v-icon>mdi-credit-card-plus</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<style>
.fab-round {
  border-radius: 50% !important;
  height: 56px !important;
  width: 56px !important;
}

.remove-width {
  height: 56px !important;
  min-width: 0 !important;
}
</style>
