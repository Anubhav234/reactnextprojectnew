import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "../components/Products";

const Frontend = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    s: "",
    sort: "",
    page: 1,
  });
  const [lastPage, setLastPage] = useState(0);
  const perPage = 8;

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/front", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9,hi;q=0.8",
          authorization: "Basic c3RvcmVmcm9udDpUYXBlc3RyeTIwMjE=",
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },

        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      });

      const content = await response.json();
      const { hits, schemaData } = content;

      const filtereddata = schemaData?.itemListElement.map((info, idx) => {
        let price = 0;
        try {
          price = hits[idx]?.variants[0].price;
        } catch (ex) {
          console.error("Not able to fetch price");
        }
        return {
          ...info,
          price,
        };
      });

      setAllProducts(filtereddata);
      setFilteredProducts(filtereddata.slice(0, filters.page * perPage));
      setLastPage(Math.ceil(filtereddata.length / perPage));
    })();
  }, [filteredProducts]);
  useEffect(() => {
    console.log("running on load more", allProducts, filters);
    
    setFilteredProducts(allProducts.slice(0, filters.page * perPage));
    setLastPage(Math.ceil(allProducts.length / perPage));
  }, []);

  useEffect(() => {
    let products = allProducts.filter(
      (p) =>
        p.name?.toLowerCase().indexOf(filters.s?.toLowerCase()) >= 0
    
    );

    if (filters.sort === "asc" || filters.sort === "desc") {
      products.sort((a, b) => {
        const diff = a.price - b.price;

        if (diff === 0) return 0;

        const sign = Math.abs(diff) / diff; //-1, 1

        return filters.sort === "asc" ? sign : -sign;
      });
    }

    setLastPage(Math.ceil(products.length / perPage));
    setFilteredProducts(products.slice(0, filters.page * perPage));
  }, [filters,allProducts]);

  return (
    <Layout>
      <Products
        products={filteredProducts}
        filters={filters}
        setFilters={setFilters}
        lastPage={lastPage}
      />
    </Layout>
  );
};

export default Frontend;
