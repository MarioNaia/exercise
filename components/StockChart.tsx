import React, { useEffect } from "react";
import * as d3 from "d3";
import { useTheme } from '../context/ThemeContext';

interface StockData {
  date: string;
  price: number;
}

interface D3ChartProps {
  data: StockData[];
}

const D3Chart: React.FC<D3ChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)';

  useEffect(() => {
    if (data.length > 0) {
      const svgWidth = 1000;
      const svgHeight = 500;
      const margin = { top: 20, right: 20, bottom: 50, left: 50 };

      const svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", svgHeight)
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

      const xScale = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([margin.left, svgWidth - margin.right])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price)!])
        .nice()
        .range([svgHeight - margin.bottom, margin.top]);

      svg.append("g")
        .attr("transform", `translate(0,${svgHeight - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat((d, i) => (i % Math.floor(data.length / 10) === 0 ? d : "")))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .style("fill", textColor);

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("fill", textColor);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.date)!)
        .attr("y", (d) => yScale(d.price))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => yScale(0) - yScale(d.price))
        .attr("fill", "teal")
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible")
            .html(`<strong>Date:</strong> ${d.date}<br><strong>Price:</strong> $${d.price.toFixed(2)}`)
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mousemove", (event) => {
          tooltip.style("left", `${event.pageX}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });

      // Tooltip
      const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("padding", "10px")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("border-radius", "5px")
        .style("pointer-events", "none")
        .style("visibility", "hidden");

      // X axis label
      svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", svgWidth / 2)
        .attr("y", svgHeight - 10)
        .text("Date")
        .style("fill", textColor);

      // Y axis label
      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("y", 15)
        .attr("x", -svgHeight / 2 + margin.top)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Price")
        .style("fill", textColor);

      return () => {
        d3.select("#chart").selectAll("*").remove();
      };
    }
  }, [data, textColor]);

  return <div id="chart"></div>;
};

export default D3Chart;
