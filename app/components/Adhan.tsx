"use client";
import React, { useEffect, useState } from "react";

type PrayerTimes = {
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
  sunrise: string;
  hijri_date: string;
  hijri_month: string;
};

type IqamahTimes = {
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jummah1: string;
  jummah2: string;
};

const Adhan = () => {
  const getOrdinalNum = (n) => {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const date = getOrdinalNum(today.getDate());

  const formattedDate = `${month} ${date}, ${year}`;

  const [currentDate, setCurrentDate] = useState(formattedDate);
  const [salahTimes, setSalahTimes] = useState<PrayerTimes[]>([]);
  const [iqamahTimes, setIqamahTimes] = useState<IqamahTimes[]>([]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://masjidal.com/api/v1/time/range?masjid_id=lJAmmGAR"
        );
        const result = await response.json();

        console.log(result.data);

        if (result.status === "success" && result.data) {
          if (result.data.salah) {
            setSalahTimes(result.data.salah);
          }
          if (result.data.iqamah) {
            setIqamahTimes(result.data.iqamah);
          }
        } else {
          console.error("Data not found or in unexpected format:", result);
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  const todaysSalahTimes = salahTimes.length > 0 ? salahTimes[0] : null;
  const todaysIqahamahTimes = iqamahTimes.length > 0 ? iqamahTimes[0] : null;

  return (
    <div className="flex   flex-col">
      <div className=" px-80 py-4 bg-[#009AF4] gap-5 rounded-t-xl rounded-b-none flex justify-center items-center">
        <h1 className="font-bold text-xl text-white">
          Salah Timings for {currentDate}
        </h1>
      </div>
      <div className="bg-black py-5 w-full text-white flex gap-6 flex-col justify-evenly ">
        <div className="grid grid-cols-3 text-center gap-6  ">
          <h1 className="font-bold text-xl">Salah</h1>
          <h1 className="font-bold text-xl">Adhaan</h1>
          <h1 className="font-bold text-xl">Iqamah</h1>
        </div>
        <div className="">
          <div className="gap-7 py-3 grid grid-cols-3 w-full text-center flex-row">
            <h1>Fajr</h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysSalahTimes.fajr}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysIqahamahTimes?.fajr}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
          </div>
          <div className="grid grid-cols-3 py-3  gap-7 w-full text-center  flex-row">
            <h1>Dhuhr</h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysSalahTimes.zuhr}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysIqahamahTimes?.zuhr}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
          </div>
          <div className=" grid grid-cols-3 py-3 relative  gap-7 w-full text-center ">
            {" "}
            <h1>Jummah</h1>
            <div className="flex flex-row justify-evenly">
              {" "}
              <h1 className="absolute right-80">
                {todaysSalahTimes ? (
                  <h1 className="text-white">{todaysIqahamahTimes?.jummah1}</h1>
                ) : (
                  <h1>Loading...</h1>
                )}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-3 py-3  gap-7 w-full text-center  ">
            <h1>Asr</h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysSalahTimes.asr}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysIqahamahTimes?.asr}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
          </div>
          <div className="grid grid-cols-3 py-3  gap-7 w-full text-center  flex-row">
            <h1>Maghrib</h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysSalahTimes.maghrib}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysIqahamahTimes?.maghrib}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
          </div>
          <div className="grid grid-cols-3 py-3  gap-7 w-full text-center  flex-row">
            <h1>Isha</h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysSalahTimes.isha}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
            <h1 className="">
              {todaysSalahTimes ? (
                <h1 className="text-white">{todaysIqahamahTimes?.isha}</h1>
              ) : (
                <h1>Loading...</h1>
              )}
            </h1>
          </div>
        </div>
      </div>
      <div className="px-80 py-4 bg-[#009AF4]  flex justify-center items-center">
        <h1 className="font-bold text-xl text-white">Khateebs for the Month</h1>
      </div>
      <div className="bg-black py-5 rounded-b-xl  text-white flex  flex-row justify-around  ">
        <div className="flex flex-col text-center px-10 gap-6  ">
          <h1 className="font-bold text-xl">Khateeb</h1>
          <h1 className="">Fajr</h1>
          <h1>Dhuhr</h1>
          <h1>Jummah</h1>
          <h1>Asr</h1>
          <h1>Maghrib</h1>
          <h1>Isha</h1>
        </div>
        <div className="flex flex-col px-10 gap-6  ">
          <h1 className="font-bold text-xl">Date</h1>
          <h1 className="">Fajr</h1>
          <h1>Dhuhr</h1>
          <h1>Jummah</h1>
          <h1>Asr</h1>
          <h1>Maghrib</h1>
          <h1>Isha</h1>
        </div>
      </div>
    </div>
  );
};

export default Adhan;
