/**
 * @Author Subhash Jadhav
 * @Description This is a spinner component
 */

import Image from "next/image";

const Spinner = () => {
  return (
    <div className="container flex mx-auto mt-7 justify-center">
      <Image
        src="/spinner.gif"
        alt="Picture of the author"
        width={200}
        height={200}
      />
    </div>
  );
};

export default Spinner;
