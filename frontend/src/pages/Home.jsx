import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Helmet>
        <title>Snaplink | Home</title>
      </Helmet>

      <div className="max-w-6xl mx-auto h-screen flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full mb-4 py-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-proximaextrabold">
            Your Connections Platform
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto mt-4 sm:mt-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6 md:gap-10">
            <div className="col-span-1 sm:col-span-2 md:col-span-6 bg-white rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">

                  <div className="flex border w-full rounded-sm">
                    <div className="w-full sm:w-1/2 bg-blue-100 ">
                      <img
                        src="link.png"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex w-full sm:w-1/2 flex-col items-center justify-center p-2">
                      <h4 className="text-base sm:text-lg pb-2 font-proximabold">
                        Make it short
                      </h4>
                      <Link to={"/create"} className="font-proximasemibold">
                        <button className="text-sm  text-blue-500 border rounded-sm border-blue-700 py-1 px-2 hover:bg-blue-50 transition-colors">
                          Go to links
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex border w-full rounded-sm">
                    <div className="w-full sm:w-1/2 bg-blue-100 ">
                      <img
                        src="link.png"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex w-full sm:w-1/2 flex-col items-center justify-center p-2">
                      <h4 className="text-base sm:text-lg pb-2  font-proximabold  ">
                      Make it scannable
                      </h4>
                      <Link to={"/create"} className="font-proximasemibold">
                        <button className="text-sm font-semibold text-blue-500 border rounded-sm border-blue-700 py-1 px-2 hover:bg-blue-50 transition-colors">
                          Go to Codes
                        </button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex border w-full rounded-sm">
                    <div className="w-full sm:w-1/2 bg-blue-100">
                      <img
                        src="link.png"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex w-full sm:w-1/2 flex-col items-center justify-center p-2">
                      <h4 className="text-base sm:text-lg pb-2 font-proximabold">
                        Analytics
                      </h4>
                      <Link to={"/analytics"} className="font-proximasemibold">
                        <button className="text-sm font-semibold text-blue-500 border rounded-sm border-blue-700 py-1 px-2 hover:bg-blue-50 transition-colors">
                          Go to Analytics
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-3 md:row-span-12 bg-white rounded-lg p-4"></div>
            <div className="col-span-1 sm:col-span-2 md:col-span-3 md:row-span-6 bg-white rounded-lg p-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
