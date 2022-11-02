/**
 * @author Subhash Jadhav
 * @description This component is used to display a refresh button, drop down list of makes, fetch models and result of fetch model action
 * @params {object} data: list of makes
 */

import { useState } from "react";

import axios from "axios";

import type { NextPage } from "next";
import { GetServerSideProps } from "next";

import useFetch from "../hook/useFetch";

import Spinner from "../components/Spinner";
import Card from "../components/Card";
import AlertMessage from "../components/AlertMessage";
import Button from "../components/Button";

import {
  myData,
  makeListObj,
  makeObj,
  FormEvent,
  stringOrNull,
} from "../types";
import { useRouter } from "next/router";

const Home: NextPage<{ data: myData }> = ({ data }) => {
  const [selectedMake, setSelectedMake] = useState<stringOrNull>(null);
  const [warning, setWarning] = useState<stringOrNull>(null);
  const [url, setUrl] = useState<stringOrNull>(null);
  const [loadAgain, setLoadAgain] = useState(false);

  const { loading, setLoading, makes, error } = useFetch(url, loadAgain);

  const router = useRouter();

  const handleSubmit = async () => {
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
        <Button
          classes="bg-blue-700 text-white px-4 py-2 rounded-full baseline hover:bg-blue-400"
          label="Refresh"
          onclick={() => router.reload()}
        />
      </div>

      <div className="container px-12 p-4  mt-7 max-w-full xl:max-w-7xl xl:mx-auto md:px-16">
        {(error || warning) && <AlertMessage error={error} warning={warning} />}

        <div className="block">
          <h1 className="text-4xl font-extrabold">Makes</h1>

          <div className="flex justify-between mt-5 flex-col md:flex-row">
            <div className="md:w-2/3 mt-2">
              <select
                name="makes"
                id="makes"
                data-testid="select"
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
                    data-testid="select-option"
                    className="w-full text-sm"
                  >
                    {make.Make_Name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Button
                classes="bg-blue-700 text-white px-4 py-2 w-full mt-2 rounded-full baseline hover:bg-blue-400"
                label="Fetch Models"
                onclick={handleSubmit}
              />
            </div>
          </div>
        </div>
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
              <div
                key={make.Model_ID}
                className="container mt-5 max-w-full"
                title="card"
              >
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
  const res = await axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
  );

  return {
    props: {
      data: res.data,
    },
  };
};
