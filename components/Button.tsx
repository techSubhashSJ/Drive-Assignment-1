/**
 * @Author Subhash Jadhav
 * @Description This is a generic button component
 * @param {object} props => {string} classes => tailwind css classes, {string}  label => button label, {function} onclick => button onClick event function
 */

const Button = (props: {
  classes: string;
  label: string;
  onclick: () => void;
}) => {
  const { classes, label, onclick } = props;

  return (
    <button className={classes} onClick={onclick}>
      {label}
    </button>
  );
};

export default Button;
