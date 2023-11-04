import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  const getStyle = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(
      variableName
    );
  };

  const salads = products?.filter((item) => item.product_category === "salads");
  const appetizers = products?.filter(
    (item) => item.product_category === "appetizers"
  );
  const chinese = products?.filter(
    (item) => item.product_category === "chinese"
  );
  const seafood = products?.filter(
    (item) => item.product_category === "seafood"
  );
  const quesidillas = products?.filter(
    (item) => item.product_category === "quesidillas"
  );
  const burgers = products?.filter(
    (item) => item.product_category === "burgers"
  );
  const noodles = products?.filter(
    (item) => item.product_category === "noodles"
  );
  const fajitas = products?.filter(
    (item) => item.product_category === "fajitas"
  );
  const juices = products?.filter((item) => item.product_category === "juices");
  const pizza = products?.filter((item) => item.product_category === "pizza");
  const grilled = products?.filter(
    (item) => item.product_category === "grilled"
  );
  const milkshakes = products?.filter(
    (item) => item.product_category === "milkshakes"
  );
  const tacos = products?.filter((item) => item.product_category === "tacos");
  const beverages = products?.filter(
    (item) => item.product_category === "beverages"
  );

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Salads",
                  "Appetizers",
                  "Chinese",
                  "Sea Food",
                  "Quesidillas",
                  "Burgers",
                  "Noodles",
                  "Fajitas",
                  "Juices",
                  "Pizza",
                  "Grilled",
                  "Milkshakes",
                  "Tacos",
                  "Beverages",
                ],
                datasets: [
                  {
                    label: "Category Wise Count",
                    backgroundColor: "#93c4fd",
                    data: [
                      salads?.length,
                      appetizers?.length,
                      chinese?.length,
                      seafood?.length,
                      quesidillas?.length,
                      burgers?.length,
                      noodles?.length,
                      fajitas?.length,
                      juices?.length,
                      pizza?.length,
                      grilled?.length,
                      milkshakes?.length,
                      tacos?.length,
                      beverages?.length,
                    ],
                  },
                ],
              }}
              labels="months"
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: getStyle("--cui-body-color"),
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: getStyle("--cui-border-color-translucent"),
                    },
                    ticks: {
                      color: getStyle("--cui-body-color"),
                    },
                  },
                  y: {
                    grid: {
                      color: getStyle("--cui-border-color-translucent"),
                    },
                    ticks: {
                      color: getStyle("--cui-body-color"),
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Orders",
                  "Delivered",
                  "cancelled",
                  "Paid",
                  "Not Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                      "#8A4DE8",
                    ],
                    data: [40, 20, 80, 10, 35],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: getStyle("--cui-body-color"),
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
