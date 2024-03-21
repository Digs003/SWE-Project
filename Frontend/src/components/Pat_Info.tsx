import { ChangeEvent, useState } from "react";
import { patInfotype } from "../InputTypes/info";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Pat_Info=({email,name}:{email:string,name:string})=>{
  const navigate=useNavigate();
  const [patInfo,setPatInfo]=useState<patInfotype>({
    mobile:"",
    age:0,
    gender:"",
    latitude:0,
    longitude:0,
  });
  function handleDropdownGender(event:ChangeEvent<HTMLSelectElement>){
    setPatInfo(c=>({
    ...c,
       gender:event.target.value
    }));
  }
  function getLocation(){
    return new Promise<{latitude:number,longitude:number}>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({latitude:position.coords.latitude,
            longitude:position.coords.longitude}); // Resolve the promise when location is received
          },
          (error) => {
            console.log(error.message);
            reject(error); // Reject the promise in case of error
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser");
        reject(new Error("Geolocation not supported"));
      }
    });
    
  }
  async function handleRequest(){
    try{
      const location=await getLocation();
      try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/patient/details/add`,
        {
          mobile:patInfo.mobile,
          age:patInfo.age,
          gender:patInfo.gender,
          latitude:location.latitude,
          longitude:location.longitude,
        },{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
          },
        });
        const json=response.data;
        if(json.message){
          alert(json.message);
        }
        navigate('/pat/dashboard');
      }
      catch(e){
        alert("Can't Update details");
      }
    }catch (error) {
      console.error("Error occurred:", error);
    }
  }


  return (
    <div className="w-screen h-screen">
      <div className="flex-wrap w-screen h-[screen]">
        <div className="relative h-screen bg-white overflow-hidden">
          <div className="absolute w-[363px] h-screen bg-indigo-800 overflow-hidden items-center">
            <img
              className="absolute w-[275px] h-[275px] top-[220px] left-[50px] object-cover rounded-full align-middle"
              alt="Profile"
              src="/profile.png"
            />
            <button className="w-[129px] h-[32px] px-[16px] py-[8px] absolute top-[550px] left-[117px] bg-indigo-400 flex items-center gap-[16px] rounded-[10px] border-none hover:scale-105 hover:bg-indigo-500]">
              <div className="relative w-fit mt-[-3.00px] mb-[-1.00px] text-white text-[14px] text-center whitespace-nowrap font-sans font-bold">
                Upload Photo
              </div>
            </button>
            <div className="absolute top-[22px] left-[90px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#eeeeee] text-[20px] text-center tracking-[0] leading-[28.0px] whitespace-nowrap">
              Welcome to OMCS
            </div>
            <div className="absolute top-[185px] w-full [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
              {email}
            </div>
            <div className="absolute top-[155px] w-full [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[21.0px] whitespace-nowrap">
              {name}
            </div>
          </div>
          <div className="absolute w-[2000px] h-screen left-[363px] bg-indigo-100 ">
            <button className="w-[172px] h-[40px] absolute top-[480px] left-[218px] bg-indigo-400 flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] hover:scale-105" onClick={handleRequest}>
              <div className="relative w-[141px]  mt-[1.00px] mr-[1px] text-white text-[16px] text-center leading-[22.4px] [-webkit-line-clamp:1] font-sans font-bold">
                Confirm &amp; Save
              </div>
            </button>
            <div className="w-[533px] h-[39px] top-[270px] left-[40px] absolute rounded-[10px]">
              <div className="w-[533px] h-[39px] px-[16px] py-[8px] absolute top-0 left-0 bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0]">
                <div className="relative w-[450px] h-[21px] text-[#8f99f8] text-[14px] leading-[19.6px] whitespace-nowrap [-webkit-line-clamp:1] [font-family:'Inter-Bold',Helvetica] font-bold tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                  Address
                </div>
              </div>
              <button onClick={getLocation}>
                <img
                  className="absolute w-[32px] h-[34px] top-[3px] left-[488px] object-cover hover:scale-110"
                  alt="Location"
                  src="/location.png"
                />
              </button>
              
            </div>
            <input className="w-[370px] h-[35px] px-[16px] py-[8px] absolute top-[120px] left-[130px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500"  
            onChange={(e)=>{
              setPatInfo(c=>({
                  ...c,
                  mobile:e.target.value
              }))
            }} placeholder="Mobile Number"/>
            <input className="w-[370px] h-[35px] px-[16px] py-[8px] absolute top-[170px] left-[130px] bg-white flex items-center gap-[16px] rounded-[10px] border border-solid border-[#e0e0e0] font-sans font-semibold text-violet-500" placeholder="Age" 
            onChange={(e)=>{
              setPatInfo(c=>({
                  ...c,
                  age:parseInt(e.target.value)
              }))
            }} pattern="[0-9]{1-3}"/>
            <div className="flex w-[370px] h-[35px] items-center gap-[16px] px-[4px] py-[8px] absolute top-[220px] left-[130px] bg-white rounded-[10px] border border-solid border-[#e0e0e0]">
              <div className="relative flex-1 mt-[-6.00px] mb-[-4.00px] text-[#8f99f8] text-[14px] leading-[24px] font-bold tracking-[0]">
              <form className="relative text-[#8f99f8] text-[14px] font-sans font-semibold">
                <select id="specialization" className=" flex h-full w-[332px] items-center gap-[16px]  border-none text-violet-700 text-sm font-sans font-semibold rounded-lg " onChange={handleDropdownGender} >
                <option selected>Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            </form>              
            </div>
            </div>
            <div className="absolute top-[29px] left-[172px] [font-family:'Inter-Bold',Helvetica] font-bold text-indigo-800 text-[20px] text-center tracking-[0] leading-[28.0px] whitespace-nowrap">
              Enter your Personal Details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};