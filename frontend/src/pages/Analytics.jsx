import React, { useState, useEffect } from "react";
import { ChartSpline } from "lucide-react";
import { GraphChart } from "../components/custom/Charts";
import {
  CardHeader,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { BarGraph } from "../components/custom/Bargraph";
import { PieGraph } from "../components/custom/PieGraph";
import { DataTable } from "../components/custom/Table";
import GeoChart from "../components/custom/GeoGraph";
import iso31661 from "iso-3166-1";
import { Helmet } from "react-helmet-async";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAnalytics(data.data);
        }
      })
      .catch((err) => console.error("Error fetching analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  function getCountryName(alpha3Code) {
    if (!alpha3Code) return null;
    const country = iso31661.whereAlpha3(alpha3Code);
    return country ? country.country : null;
  }

  if (loading) {
    return (
      <div className="max-w-[1480px] mx-auto h-screen flex flex-col">
        <div className="flex items-center justify-between w-full mb-6">
          <h2 className="text-4xl text-white font-bold">Analytics</h2>
        </div>
        <hr className="border-[0.5] border-stone-800 mb-4" />
        <div className="flex gap-4 w-full overflow-y-scroll h-full mb-24">
          <div className="flex gap-4 w-full h-full">
            <div className="w-1/2 flex flex-col gap-7">
              <div className="bg-gray-300 animate-pulse h-64 w-full rounded-lg"></div>
              <div className="bg-gray-300 animate-pulse h-64 w-full rounded-lg"></div>
              <div className="bg-gray-300 animate-pulse h-64 w-full rounded-lg"></div>
            </div>
            <div className="w-1/2 flex flex-col gap-7">
              <div className="bg-gray-300 animate-pulse h-64 w-full rounded-lg"></div>
              <div className="bg-gray-300 animate-pulse h-64 w-full rounded-lg"></div>
              <div className="bg-gray-300 animate-pulse h-64 w-full rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1480px] mx-auto  h-screen flex flex-col ">
      <div className="flex items-center justify-between w-full mb-6 ">
        <h2 className="text-4xl text-white font-bold">Analytics</h2>
      </div>
      <hr className="border-[0.5] border-stone-800 mb-4" />

      <div className="flex gap-4 w-full overflow-y-scroll h-full mb-24">
        <div className="flex gap-4 w-full h-full ">
          <div className="w-1/2 flex  flex-col gap-7  ">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Top Performing Dates</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-y-4 justify-center">
                <h3 className="flex gap-x-2 text-2xl items-center">
                  <p>
                    <ChartSpline />
                  </p>
                  <span>
                    {analytics?.topPerformingDate?.date &&
                    !isNaN(
                      new Date(analytics?.topPerformingDate?.date).getTime()
                    )
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(analytics?.topPerformingDate?.date))
                      : "January 27, 2025"}{" "}
                  </span>
                </h3>
                <p>{analytics?.topPerformingDate?.totalClicks} Clicks </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-slate-400">Feb 09 - Feb 15, 2025</p>
              </CardFooter>
            </Card>

            <div className="rounded-lg ">
              <GraphChart data={analytics?.clicksByDate} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Top Performing Location
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-y-4 justify-center">
                <h3 className="flex gap-x-2 text-2xl items-center">
                  <p>
                    <ChartSpline />
                  </p>
                  <span>
                    {getCountryName(
                      analytics?.topPerformingLocation?.country
                    ) || "Unkonwn"}
                  </span>
                </h3>
                <p>{analytics?.topPerformingLocation?.totalClicks} Clicks</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-slate-400">Feb 09 - Feb 15, 2025</p>
              </CardFooter>
            </Card>
            <div className="">
              <GeoChart data={analytics?.clicksByLocation} />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-7">
            <div className=" ">
              <BarGraph data={analytics?.clicksByReferrer} />
            </div>
            <div>
              <PieGraph data={analytics?.clicksByDevice} loading={loading} />
            </div>
            <div>
              <DataTable data={analytics?.clicksByLocation} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
