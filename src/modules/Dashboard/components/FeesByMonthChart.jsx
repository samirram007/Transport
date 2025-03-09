 
import { useTheme } from "@/contexts/ThemeContextProvider";
import ReactApexChart from "react-apexcharts";
const FeesByMonthChart = ({ data  }) => {
    // Prepare data for ApexCharts
    const {theme}=useTheme()
    const chartOptions = {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false, // Hides toolbar by default
        },
      },
      grid: {
        borderColor: theme === "dark" ? "#28A0A0" : "#285080", // Light gray for light mode, dark gray for dark mode
        strokeDashArray: 4, // Dashed grid lines (optional)
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: data.map((item) => item.month_name + " " + item.year), // Months as X-axis labels
        labels: {
          style: {
            colors: theme === "dark" ? "#FFFFFF" : "#333333", // Label color based on theme
          },
        },
      },
      yaxis: {
        title: {
          text: "Total Amount (₹)",
          style: {
            color: theme === "dark" ? "#FFFFFF" : "#333333", // Title color based on theme
          },
        },
        labels: {
          style: {
            colors: theme === "dark" ? "#FFFFFF" : "#333333", // Label color for values
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: theme, // Automatically adjusts tooltip theme (dark/light)
        y: {
          formatter: (val) => `₹${val.toLocaleString()}`,
        },
      },
      title: {
        text: "Monthly Fee Collection",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: theme === "dark" ? "#FFFFFF" : "#333333", // Title color based on theme
        },
      },
    };
  
    const chartSeries = [
      {
        name: "Total Amount",
        data: data.map((item) => parseFloat(item.total_amount)), // Values for bars
      },
    ];
  
    return (
      <div>
        <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </div>
    );
  };
  
  export default FeesByMonthChart;
  
 