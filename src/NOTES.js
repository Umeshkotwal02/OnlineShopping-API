import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputBase, FormHelperText } from "@mui/material";
import { CameraIcon } from "../assets/SvgIcons";
import axios from "axios";
import { STORAGE } from "../config/config";
import { useUser } from "../context/UserContext ";
import toast from "react-hot-toast";

const AccountPage = () => {
  const { userDetails, setUserDetails } = useUser();
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchUserDetails = async () => {
    const userProfile = JSON.parse(localStorage?.getItem(STORAGE?.USERDETAIL));
    const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
    try {
      setLoading(true);
      const { data } = await axios.post("/userdetail", {
        user_id: userProfile?.id,
        device_id: deviceId,
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
      });

      if (data && data?.STATUS === 200) {
        const {
          user_name,
          user_last_name,
          user_email,
          user_mobile,
          user_profile,
        } = data?.DATA;
        setUserDetails({
          user_first_name: user_name,
          user_last_name: user_last_name,
          user_email: user_email,
          user_mobile: user_mobile,
          user_profile: user_profile,
        });
        setValue("user_first_name", user_name);
        setValue("user_last_name", user_last_name);
        setValue("user_email", user_email);
        setValue("user_mobile", user_mobile);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserDetails((prevState) => ({
          ...prevState,
          user_profile: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
    const userProfile = JSON.parse(localStorage?.getItem(STORAGE?.USERDETAIL));

    try {
      setLoading(true);
      const response = await axios.post("/updateprofile", {
        device_id: deviceId,
        id: userProfile?.id,
        is_admin: "0",
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
        user_first_name: data.user_first_name,
        user_last_name: data.user_last_name,
        user_email: data.user_email,
        user_mobile: data.user_mobile,
        user_profile: userDetails.user_profile,
      });
      if (response.data && response.data.STATUS === 200) {
        toast.success(data?.MESSAGE || "User updated successfully.");
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          user_first_name: data.user_first_name,
          user_last_name: data.user_last_name,
          user_email: data.user_email,
          user_mobile: data.user_mobile,
        }));
      } else {
        toast.success(data?.MESSAGE || "Failed to update user.");
      }
    } catch (err) {
      toast.success(data?.MESSAGE || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <h1>Hiii</h1>
      )}
      <Suspense>
        <div
          className="bg-repeat-x bg-[top_center] w-full pt-8 md:pt-14 max-w-[1836px] mx-auto"
          style={{ backgroundImage: "url(/images/account-bg.png)" }}
        >
          <div className="max-w-[1418px] mx-auto px-3">
            <div className="w-full bg-white py-10 md:pb-[45px] px-3">
              <h2 className="text-2xl md:text-3xl xl:text-[40px] !leading-none font-medium font-jost mb-6 md:mb-10 xl:mb-[54px] text-center">
                Complete your profile
              </h2>
              <div className="flex justify-center">
                <div className="">
                  <label
                    htmlFor="file-input"
                    className="h-40 w-40 md:h-[265px] md:w-[265px] rounded-full overflow-hidden inline-block relative cursor-pointer"
                  >
                    <span className="block">
                      <img
                        src={
                          userDetails?.user_profile ||
                          "/images/account-avatar.png"
                        }
                        className="h-full w-full object-cover"
                        alt=""
                        loading="lazy"
                      />
                    </span>
                    <span className="flex justify-center absolute bottom-0 left-0 right-0 py-1.5 md:py-2.5 bg-black/20 ">
                      <CameraIcon />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="file-input"
                      />
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full bg-[#F2F2F2] px-5 md:px-8 xl:pl-[60px] xl:pr-[75px] pt-6 pb-10">
              <div className="flex flex-wrap -mx-3 gap-y-4">
                <div className="w-full lg:w-6/12 px-3">
                  <h3 className="text-center text-lg sm:text-xl lg:text-[26px] font-medium !leading-none mb-3.5">
                    Name{" "}
                    <span className="text-[#6F6F6F]">
                      ({userDetails.user_first_name}{" "}
                      {userDetails.user_last_name})
                    </span>
                  </h3>
                  <p className="text-center max-w-[401px] mx-auto sm:text-xl lg:text-[22px] !leading-[1.27] text-[#4D4D4D] mb-4 md:mb-6 xl:mb-9">
                    My Profile allows you to share a little bit about yourself
                    with other kapoor customers
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-y-5 lg:gap-y-[30px]">
                      <div className="w-full">
                        <InputBase
                          {...register("user_first_name", {
                            required: "First name is required",
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: "Only character",
                            },
                          })}
                          classes={{ input: "py-0" }}
                          placeholder="First Name"
                          className={`h-12 sm:h-[60px] xl:h-[84px] w-full border-b ${errors.user_first_name
                              ? "border-red-500"
                              : "border-[#cdcdcd]"
                            } !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 rounded-md sm:rounded-[10px] text-black !placeholder:text-[#464646]`}
                        />
                        {errors.user_first_name && (
                          <FormHelperText error>
                            {errors.user_first_name.message}
                          </FormHelperText>
                        )}
                      </div>
                      <div className="w-full">
                        <InputBase
                          {...register("user_last_name", {
                            required: "Last name is required",
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: "Only character",
                            },
                          })}
                          classes={{ input: "py-0" }}
                          placeholder="Last Name"
                          className={`h-12 sm:h-[60px] xl:h-[84px] w-full border-b ${errors.user_last_name
                              ? "border-red-500"
                              : "border-[#cdcdcd]"
                            } !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 rounded-md sm:rounded-[10px] text-black !placeholder:text-[#464646]`}
                        />
                        {errors.user_last_name && (
                          <FormHelperText error>
                            {errors.user_last_name.message}
                          </FormHelperText>
                        )}
                      </div>
                      <div className="w-full">
                        <InputBase
                          {...register("user_mobile", {
                            required: "Mobile number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Invalid mobile number",
                            },
                          })}
                          classes={{ input: "py-0" }}
                          placeholder="Mobile Number"
                          className={`h-12 sm:h-[60px] xl:h-[84px] w-full border-b ${errors.user_mobile
                              ? "border-red-500"
                              : "border-[#cdcdcd]"
                            } !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 rounded-md sm:rounded-[10px] text-black !placeholder:text-[#464646]`}
                        />
                        {errors.user_mobile && (
                          <FormHelperText error>
                            {errors.user_mobile.message}
                          </FormHelperText>
                        )}
                      </div>
                      <div className="w-full">
                        <InputBase
                          {...register("user_email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                              message: "Invalid email address",
                            },
                          })}
                          classes={{ input: "py-0" }}
                          placeholder="Email Id"
                          className={`h-12 sm:h-[60px] xl:h-[84px] w-full border-b ${errors.user_email
                              ? "border-red-500"
                              : "border-[#cdcdcd]"
                            } !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 rounded-md sm:rounded-[10px] text-black !placeholder:text-[#464646]`}
                        />
                        {errors.user_email && (
                          <FormHelperText error>
                            {errors.user_email.message}
                          </FormHelperText>
                        )}
                      </div>
                      <div className="w-full">
                        <button
                          type="submit"
                          className="w-full h-12 sm:h-[60px] xl:h-[84px] bg-[#E9B159] hover:bg-[#E9B159] text-white text-xl xl:text-2xl font-jost rounded-md sm:rounded-[10px] px-6 py-3"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="hidden w-full lg:w-6/12 px-3 text-end lg:flex">
                  <img
                    src="/images/account-element.png"
                    className="ml-auto my-auto"
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default AccountPage;
