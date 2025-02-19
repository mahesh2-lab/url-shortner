import { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"

const geoUrl =
  "https://raw.githubusercontent.com/BolajiBI/topojson-maps/refs/heads/master/world-countries.json";

const colorScale = scaleLinear()
  .domain([0, 100])
  .range(["hsl(var(--primary) / 0.2)", "hsl(var(--primary))"]);

const sampleData = [
  { id: "USA", value: 80 },
  { id: "CAN", value: 65 },
  { id: "MEX", value: 50 },
  { id: "BRA", value: 70 },
  { id: "FRA", value: 55 },
  { id: "DEU", value: 60 },
  { id: "GBR", value: 58 },
  { id: "RUS", value: 45 },
  { id: "IND", value: 75 },
  { id: "CHN", value: 85 },
  { id: "JPN", value: 72 },
  { id: "AUS", value: 68 },
];

const Tooltip = ({ content, position }) => (
  <div
    className="absolute pointer-events-none z-50 bg-orange-500   rounded-md shadow-md text-sm p-2"
    style={{
      left: `${position.x - 30}px`,
      top: `${position.y - 50}px`,
      display: content ? "block" : "none",
    }}
  >
    <p className="text-white">{content}</p>
  </div>
);

export default function GeoChart({data}) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);
  

  return (
    <div ref={mapRef} className="relative w-full overflow-hidden">
      <Card className="w-full h-[480px] items- flex flex-col  border border-stone-700 overflow-hidden rounded-lg ">
       <CardHeader>
            <CardTitle className="text-2xl">Clicks by location</CardTitle>
       </CardHeader>
        
        <ComposableMap
          projectionConfig={{ scale: 180 }}
          width={800}
          height={460}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {                
                const d = data?.find((s) => s.country === geo.id);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d.totalClicks) : "hsl(var(--muted))"}
                    stroke="hsl(var(--border))"
                    strokeWidth={0.5}
                    onMouseEnter={(evt) => {
                      if (mapRef.current) {
                        const rect = mapRef.current.getBoundingClientRect();
                        setTooltipPosition({
                          x: evt.clientX - rect.left,
                          y: evt.clientY - rect.top,
                        });
                      }
                      setTooltipContent(
                        `${geo.properties.name}: ${d ? d.totalClicks : "No data"}`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </Card>
      <Tooltip content={tooltipContent} position={tooltipPosition} />
    </div>
  );
}
