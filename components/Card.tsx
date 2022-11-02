/**
 * @Author Subhash Jadhav
 * @Description This is a card component used to display models information
 * @Param {object} props => { Make_ID, Model_Name, Model_ID }
 */

import { cardProps } from "../types/card";

const Card = (props: cardProps) => {
  const { Make_ID, Model_Name, Model_ID } = props;

  return (
    <div
      className="flex  flex-col border-2 border-black rounded-lg p-4 justify-between md:justify-between md:flex-row md:px-10"
      title="card"
    >
      <h1 className="text-xl md:text-lg" title="heading1">ID: {Make_ID}</h1>
      <h1 className="text-xl md:text-lg" title="heading2">Make: {Model_Name}</h1>
      <h1 className="text-xl md:text-lg" title="heading3">Model: {Model_ID}</h1>
    </div>
  );
};

export default Card;
