export default function (context) {
    if(!context.store.state.token) {
        context.redirect('/login')
    }
}