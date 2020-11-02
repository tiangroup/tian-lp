<template>
  <v-card flat>
    <v-toolbar>
      <v-toolbar-title>Профиль</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab>Учетная запись</v-tab>
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
