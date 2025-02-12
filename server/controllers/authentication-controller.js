async function signUp(request, response, next) {
  response.send("sign-up");
}

async function signIn(request, response, next) {
  response.send("sign-in");
}

async function signOut(request, response, next) {
  response.send("sign-out");
}

export { signUp, signIn, signOut };
