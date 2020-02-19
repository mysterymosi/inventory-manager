export default function (context) {
    // console.log('context.req says: ', context.req)
    context.store.dispatch('initAuth', context.req)
}