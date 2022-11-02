/**
 * @author Subhash Jadhav
 * @description This component is used to display a refresh button, drop down list of makes, fetch models and result of fetch model action
 * @params {object} data: list of makes
 */

// React import
import { useState } from "react";

//Next imports
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

//Custom hook
import useFetch from "../hook/useFetch";

//Utility
import Spinner from "../components/Spinner";
import Card from "../components/Card";

//types
import {
  myData,
  makeListObj,
  makeObj,
  FormEvent,
  stringOrNull,
} from "../types";

const Home: NextPage<{ data: myData }> = ({ data }) => {
  const [selectedMake, setSelectedMake] = useState<stringOrNull>(null);
  const [warning, setWarning] = useState<stringOrNull>(null);
  const [url, setUrl] = useState<stringOrNull>(null);
  const [loadAgain, setLoadAgain] = useState(false);

  const { loading, setLoading, makes, error } = useFetch(url, loadAgain);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setWarning(null);
    setLoading(true);

    if (selectedMake === null) {
      setWarning("Please select a make");
      setLoading(false);
      return;
    } else if (
      url ===
      `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`
    ) {
      setLoadAgain((flag) => !flag);
    } else {
      setUrl(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`
      );
    }
  };

  return (
    <>
      <div className="container px-12 p-4  mt-7 max-w-full xl:max-w-7xl xl:mx-auto md:px-16">
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-full baseline hover:bg-blue-400"
          onClick={() => router.reload()}
        >
          Refresh
        </button>
      </div>

      <div className="container px-12 p-4  mt-7 max-w-full xl:max-w-7xl xl:mx-auto md:px-16">
        {(error || warning) && (
          <div
            className={
              (error && "my-3 bg-red-300 p-3") ||
              (warning && "my-3 bg-yellow-100 p-3") ||
              ""
            }
          >
            <h1 className="text-lg">
              {error}
              {warning}
            </h1>
          </div>
        )}

        <form className="block" onSubmit={handleSubmit}>
          <label className="text-4xl font-extrabold" htmlFor="makes">
            Makes
          </label>

          <div className="flex justify-between mt-5 flex-col md:flex-row">
            <div className="md:w-2/3 mt-2">
              <select
                name="makes"
                id="makes"
                defaultValue="Select a make"
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full border-black border-2 rounded h-full  p-2"
              >
                <option value="Select a make" disabled>
                  Select a make
                </option>
                {data.Results?.map((make: makeListObj) => (
                  <option
                    value={make.Make_Name}
                    key={make.Make_ID}
                    className="w-full text-sm"
                  >
                    {make.Make_Name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button className="bg-blue-700 text-white px-4 py-2 w-full mt-2 rounded-full baseline hover:bg-blue-400">
                Fetch Models
              </button>
            </div>
          </div>
        </form>
      </div>

      {loading && makes?.length === 0 ? (
        <Spinner />
      ) : !loading && error === null && url !== null && makes.length === 0 ? (
        <div className="container p-4 px-12 mt-7 max-w-full xl:max-w-7xl xl:mx-auto md:px-16">
          <h1 className="text-2xl font-bold">No Result Found</h1>
        </div>
      ) : (
        <>
          <div className="container px-12 p-4  mt-7 max-w-full xl:max-w-7xl xl:mx-auto md:px-16">
            <h1 className="text-2xl font-extrabold">
              {makes[0] ? `${makes[0]?.Make_Name} Models: ` : ""}
            </h1>
            {makes?.map((make: makeObj) => (
              <div key={make.Model_ID} className="container mt-5 max-w-full">
                <Card
                  Make_ID={make.Make_ID}
                  Model_Name={make.Model_Name}
                  Model_ID={make.Model_ID}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
