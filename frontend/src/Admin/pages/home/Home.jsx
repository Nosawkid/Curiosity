import React, { useEffect, useState } from "react";
import "./home.scss";

import Widget from "../../components/widgets/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Tables from "../../components/table/Table";
import Piechart from "../../components/piechart/Piechart";
import axios from "axios";
import NetworkErrorPage from "../../components/networkerror/NetworkError";

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [insCount, setInsCount] = useState(0);
  const [hireCount, setHireCount] = useState(0);
  const [revenue, setrevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);
  const [revenueGraph, setRevenueGraph] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [user, setUser] = useState([]);
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  const [other, setOther] = useState(0);
  const [instructors,setInstructors] = useState([])
  const [insMales,setInsMales] = useState(0)
  const [insFemales,setInsFemales] = useState(0)
  const [insOthers,setInsOthers] = useState(0)
  const [hirer,setHirer] = useState([])
  const [hirMales,setHirMales] = useState(0)
  const [hirFemales,setHirFemales] = useState(0)
  const [hirOthers,setHirOthers] = useState(0)


  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/User")
      .then((res) => {
        setUserCount(res.data.length);
      })
      .catch((err) => {
        setNetworkError(true);
      });
  };
  const fetchIns = () => {
    axios
      .get("http://localhost:5000/Instructor")
      .then((res) => {
        setInsCount(res.data.length);
      })
      .catch((err) => {
        setNetworkError(true);
      });
  };
  const fetchHirer = () => {
    axios
      .get("http://localhost:5000/Jobportal")
      .then((res) => {
        setHireCount(res.data.length);
      })
      .catch((err) => {
        setNetworkError(true);
      });
  };

  const fetchTotal = () => {
    axios
      .get("http://localhost:5000/Totalbooking")
      .then((res) => {
        setrevenue(res.data.total);
        if (res.data.total) {
          const newProfit = ((20 / 100) * res.data.total).toFixed(2);
          const newProfitPercent = (newProfit / res.data.total) * 100;
          setProfit(newProfit);
          setProfitPercent(newProfitPercent);
        }
      })
      .catch((err) => {
        setNetworkError(true);
      });
  };

  const fetchGraphData = () => {
    axios
      .get("http://localhost:5000/graphdata")
      .then((res) => {
        setRevenueGraph(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setNetworkError(true);
      });
  };

  const userGenders = ()=>{
    axios.get("http://localhost:5000/User").then((res)=>{
        setUser(res.data)
        setMales((res.data.filter((ele) => ele.gender === "Male").length / res.data.length) * 100);
        setFemales((res.data.filter((ele) => ele.gender === "Female").length / res.data.length) * 100);
        setOther((res.data.filter((ele) => ele.gender === "Others").length / res.data.length) * 100);
    })
}
  const insGenders = ()=>{
    axios.get("http://localhost:5000/Instructor").then((res)=>{
        setInstructors(res.data)
        setInsMales((res.data.filter((ele) => ele.gender === "Male").length / res.data.length) * 100);
        setInsFemales((res.data.filter((ele) => ele.gender === "Female").length / res.data.length) * 100);
        setInsOthers((res.data.filter((ele) => ele.gender === "Others").length / res.data.length) * 100);
    })
}
  const hirGenders = ()=>{
    axios.get("http://localhost:5000/Jobportal").then((res)=>{
        setHirer(res.data)
        setHirMales((res.data.filter((ele) => ele.gender === "Male").length / res.data.length) * 100);
        setHirFemales((res.data.filter((ele) => ele.gender === "Female").length / res.data.length) * 100);
        setHirOthers((res.data.filter((ele) => ele.gender === "Others").length / res.data.length) * 100);
    })
}

  useEffect(() => {
    fetchUsers();
    fetchIns();
    fetchHirer();
    fetchTotal();
    fetchGraphData();
    userGenders()
    insGenders()
    hirGenders()
  }, [profit, profitPercent]);

  if (networkError) {
    return <NetworkErrorPage />;
  }

  return (
    <div className="adminHome">
      <div className="widgets">
        <Widget userCount={userCount} type="user" />
        <Widget userCount={insCount} type="instructor" />
        <Widget userCount={hireCount} type="hirer" />
      </div>
      <div className="charts">
        <Featured
          revenue={revenue}
          profit={profit}
          profitPercent={profitPercent}
        />
        <Chart aspect={2 / 1} title={"Revenue Chart"} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
          gap:"20px",
          marginBottom:"30px"
        }}
        className="pieChart"
      >
        <div
          style={{
            boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
            padding: "5px",
          }}
          className="div"
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            Users <span style={{fontWeight:"normal",fontSize:"16px"}}>(Gender Statistics in %)</span>
          </p>
          <Piechart male={Math.round(males * 100) / 100} females={Math.round(females * 100) / 100} other={Math.round(other * 100) / 100} />
        </div>
        <div
         style={{
          boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
          padding: "5px",
        }}
        className="div">
            <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            Instructors <span style={{fontWeight:"normal",fontSize:"16px"}}>(Gender Statistics in %)</span>
          </p>
          <Piechart male={Math.round(insMales * 100) / 100} females={Math.round(insFemales * 100) / 100} other={Math.round(insOthers * 100) / 100} />
        </div>
        <div
         style={{
          boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
          padding: "5px",
        }}
        className="div">
        <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            Job Portals <span style={{fontWeight:"normal",fontSize:"16px"}}>(Gender Statistics in %)</span>
          </p>
          <Piechart male={Math.round(hirMales * 100) / 100} females={Math.round(hirFemales * 100) / 100} other={Math.round(hirOthers * 100) / 100} />
        </div>
      </div>
    </div>
  );
};

export default Home;
