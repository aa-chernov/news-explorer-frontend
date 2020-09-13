export default function isLogged() {
  if (localStorage.getItem('token') || document.cookie) {
    return true;
  }
  return false;
}
