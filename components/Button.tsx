const Button = (props: { classes: string, label: string, onclick: () => void }) => {
  const { classes, label, onclick } = props;


  return  (
    <button className={classes} onClick={onclick}>
      {label}
    </button>
  ) 
};

export default Button;
