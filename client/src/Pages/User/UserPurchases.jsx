import React, { useEffect, useState } from "react";
import cookies from "js-cookie";

const UserPurchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const userJWT = cookies.get("userJWT");
      const url = "http://localhost:3000/user/purchases";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userJWT}`,
        },
        credentials: "include",
      };

      try {
        const fetchData = await fetch(url, options);
        const response = await fetchData.json();
        console.log(response);
        // setPurchases(response);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, []);

  return <div>user purchases page</div>;
};

export default UserPurchases;
