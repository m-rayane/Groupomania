export const FormField = ({className, name, defaultValue, onChange, type, children}) => {
    return (
        <div className={className}>
          <label htmlFor={name}>{children}</label>
          <input type={type} id={name} name={name} defaultValue={defaultValue} onChange={onChange}/>
        </div>
    )
}

export const TextField = ({className, name, rows, cols, wrap, placeHolder, defaultValue, children}) => {
  return (
      <div className={className}>
        <label htmlFor={name}>{children}</label>
        <textarea id={name} name={name} rows={rows} cols={cols} wrap={wrap} placeholder={placeHolder} defaultValue={defaultValue} required ></textarea>
      </div>
  )
}