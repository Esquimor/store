<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title >
        <q-btn flat label="Funiture" :to="{ name: 'home'}" />
      </q-toolbar-title>

      <div>
        <q-btn
          round
          color="white"
          text-color="primary"
          icon="person"
        >
          <q-menu auto-close>
            <q-item clickable :to="{ name: 'settings-account'}" v-ripple>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                Settings
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "LayoutHeader"
}
</script>

<style>

</style>