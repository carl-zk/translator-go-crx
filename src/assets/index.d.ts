declare module '*.htm'
declare module '*.png'
declare module '*.css' {
  const c: string
  export = c
}
declare module '*.scss' {
  const c: string
  export = c
}
declare module '*.handlebars'
// declare module '*.css' {
//   const content: { [className: string]: string }
//   export default content
// }
