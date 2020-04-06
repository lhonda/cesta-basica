export async function validateLogin (args) {
  console.log(args.login)
  return {
    login: args.login
  }
}
