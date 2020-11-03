<template>
  <v-card flat>
    <v-toolbar>
      <v-toolbar-title>Профиль</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab>Коммуникация</v-tab>
      <v-tab>Аутентификация</v-tab>
      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <admin-profile-email />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <admin-profile-change-password />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
