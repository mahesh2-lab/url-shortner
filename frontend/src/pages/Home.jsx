import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Helmet>
        <title>Snaplink | Home</title>
      </Helmet>

      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-4xl text-white font-bold">
            Your Connections Platform
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto mt-7">
          <div className="grid grid-cols-6  gap-10 ">
            <div className="col-span-6  bg-white rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center justify-center gap-4">
                <div className="flex border w-full rounded-sm ">
                  <div className=" h-full w-1/2 bg-blue-100">
                    <img src="link.png" alt="" className="  bg-cover" />
                  </div>
                  <div className="flex w-1/2 flex-col items-center justify-center ">
                    <h4 className="text-lg pb-2 font-bold">Make it short</h4>
                    <button className="text-sm font-semibold text-blue-500 border rounded-sm border-blue-700 py-1 px-2">
                      <Link to={"/create"}>
                      Go to links
                      </Link>
                    </button>
                  </div>
                </div>

                <div className="flex border w-full rounded-sm ">
                  <div className=" h-full w-1/2 bg-blue-100">
                    <img
                      src="https://app.bitly.com/s/bbt2/images/dashboard_qrcs.png"
                      alt=""
                      className="  bg-cover"
                    />
                  </div>
                  <div className="flex w-1/2 flex-col items-center justify-center ">
                    <h4 className="text-lg pb-2 font-bold">
                      Make it scannable
                    </h4>
                    <button className="text-sm font-semibold text-blue-500 border rounded-sm border-blue-700 py-1 px-2">
                      Go to Codes
                    </button>
                  </div>
                </div>

                <div className="flex border w-full rounded-sm ">
                  <div className=" h-full w-1/2 bg-blue-100">
                    <img src="link.png" alt="" className="  bg-cover" />
                  </div>
                  <div className="flex w-1/2 flex-col items-center justify-center ">
                    <h4 className="text-lg pb-2 font-bold">Analytics</h4>
                    <button className="text-sm font-semibold text-blue-500 border rounded-sm border-blue-700 py-1 px-2">
                      Go to Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 row-span-12 bg-white rounded-lg p-4 flex items-center justify-between"></div>
            <div className="col-span-3 row-span-6 bg-white rounded-lg p-4 flex items-center justify-between"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
