export default function({ $axios, store, app }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401 || code === 403) {
      app.$auth.logout();
      //window.location.reload();
      //store.commit("auth/SET", { key: "loggedIn", value: false });
    }
  });
}
