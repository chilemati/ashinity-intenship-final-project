interface p{
  name?: string,
  title?: string
}
const Greet = ({name="Chile",title="Mr"}:p) => {
  return (
    <div>Welcome! {title}. {name}</div>
  )
}

export default Greet