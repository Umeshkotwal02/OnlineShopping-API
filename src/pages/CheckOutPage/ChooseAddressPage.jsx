import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { STORAGE } from "../config/config";
import { Box, Drawer, InputBase } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";

// convert following tailwind css in bootstrap or normal css and use here static data and map it display

const AddressCard = ({ info, fetchAddresses, onSelectAddress }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (selectedAddress) {
            setValue("address_country", selectedAddress.address_country);
            setValue("address_name", selectedAddress.address_name);
            setValue("address_mobile", selectedAddress.address_mobile);
            setValue(
                "address_flate_house_company",
                selectedAddress.address_flate_house_company
            );
            setValue(
                "address_area_street_village",
                selectedAddress.address_area_street_village
            );
            setValue("isDefault", selectedAddress.isDefault);
            setValue("address_landmark", selectedAddress.address_landmark);
            setValue("address_pincode", selectedAddress.address_pincode);
            setValue("address_city", selectedAddress.address_city);
            setValue("address_state", selectedAddress.address_state);
        } else {
            reset();
        }
    }, [selectedAddress, setValue, reset]);

    const editAddress = async (address) => {
        setSelectedAddress(address);
        setShowAddressForm(true);
    };
    const saveAddress = async (data) => {
        // console.log("response::", data);
        const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
        try {
            const payload = {
                user_id: userProfile?.id,
                ...data,
            };
            if (selectedAddress) {
                payload.address_id = selectedAddress.address_id;
            }
            const response = await axios.post("saveaddress", payload);

            if (response.data && response.data.STATUS === 200) {
                fetchAddresses();
                setShowAddressForm(false);
                toast.success("Address saved successfully.");
            } else {
                toast.error(
                    response.data.MESSAGE || "Failed to save address. Please try again."
                );
            }
        } catch (err) {
            // console.error(err);
            toast.error(err?.response?.data?.MESSAGE || "Failed to save address.");
        }
    };

    const deleteAddress = async (addressId) => {
        // console.log("DATA", {
    };

    return (
        <>
            <div className="bg-[#F6F6F6] border border-[#CACACA] rounded-[10px] p-4 md:p-5 xl:p-[18px]">
                <div className="flex items-center gap-4 mb-5 xl:mb-[27px]">
                    <h4 className="text-lg md:text-xl xl:text-[26px] font-medium !leading-none">
                        {info?.address_name}
                    </h4>
                    {Boolean(info?.address_is_default) && (
                        <span className="inline-block text-[10px] xl:text-sm font-medium font-jost leading-4 text-[#E9B159] border border-[#E9B159] rounded-3xl bg-[#FFF9F0] px-2 xl:px-4 py-1.5 ">
                            DEFAULT
                        </span>
                    )}
                </div>
                <p className="text-base truncate hover:text-clip xl:text-xl !leading-[120%] font-jost text-[#404040] max-w-[293px] mb-5 xl:mb-[30px]">
                    {info?.address_address}
                </p>
                <div className="flex items-center gap-[15px] flex-wrap">
                    <button
                        className="inline-block bg-[#F4F4F4] border border-[#D1D1D1] rounded-[5px] text-black xl:text-lg !leading-none font-normal font-jost py-2.5 px-4 xl:px-8"
                        onClick={() => editAddress(info)}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteAddress(info?.address_id)}
                        className="inline-block bg-[#F4F4F4] border border-[#D1D1D1] rounded-[5px] text-black xl:text-lg !leading-none font-normal font-jost py-2.5 px-4 xl:px-8"
                    >
                        Delete
                    </button>
                    <button
                        className="inline-flex items-center gap-[7px] bg-black border border-[#D1D1D1] rounded-[5px] text-white xl:text-lg !leading-none font-normal font-jost py-2.5 px-4 xl:px-4"
                        onClick={() => onSelectAddress(info)}
                    >
                        Deliver Here <FaArrowRightLong />
                    </button>
                </div>
            </div>

            <Drawer
                open={showAddressForm}
                onClose={() => setShowAddressForm(false)}
                anchor="right"
            >
                <Box
                    role="presentation"
                    className="scrollbar max-w-[300px] lg:!max-w-[450px] w-screen"
                >
                    <div className="w-screen max-w-[300px] lg:max-w-[450px] h-full bg-white absolute top-0 right-0">
                        <div className="bag-header flex justify-between items-center border-b border-[#C5C5C5] p-3">
                            <h3 className="text-xl md:text-2xl xl:text-[26px] !leading-none font-medium">
                                {selectedAddress ? "Edit Address" : "New Address"}
                            </h3>
                            <button
                                className="w-10 aspect-square flex items-center justify-center"
                                onClick={() => setShowAddressForm(false)}
                            >
                                <IoIosClose size={40} />
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit(saveAddress)}
                            className="h-[calc(100%-97px)]"
                        >
                            <div className="p-6 lg:pt-[30px] lg:pb-10 lg:px-11 h-[calc(100%-53px)] md:h-[calc(100%-101px)] lg:h-[calc(100%-133px)] xl:h-[calc(100%-165px)] overflow-auto scrollbar">
                                <h4 className="text-xl md:text-2xl xl:text-[22px] !leading-none font-medium mb-3 xl:mb-6">
                                    Address
                                </h4>
                                <div className="grid gap-y-3">
                                    <div className="w-full">
                                        <Controller
                                            name="address_country"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            classes={{ input: "py-0" }}
                                                            placeholder="Country"
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                        />
                                                        <p className="text-red-500">
                                                            {errors.address_country?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Controller
                                            name="address_name"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            classes={{ input: "py-0" }}
                                                            placeholder="Name"
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                        />
                                                        <p className="text-red-500">
                                                            {errors?.address_name?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Controller
                                            name="address_mobile"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            classes={{ input: "py-0" }}
                                                            placeholder="Mobile Number"
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                        />
                                                        <p className="text-red-500">
                                                            {errors?.address_mobile?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Controller
                                            name="address_flate_house_company"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            placeholder="Flat,House,No,Building"
                                                            sx={{ "&::placeholder": { color: "#858585" } }}
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                        />
                                                        <p className="text-red-500">
                                                            {errors.address_flate_house_company?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Controller
                                            name="address_area_street_village"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            placeholder="Area,Street,Village"
                                                            sx={{ "&::placeholder": { color: "#858585" } }}
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                        />
                                                        <p className="text-red-500">
                                                            {errors.address_area_street_village?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Controller
                                            name="address_landmark"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            classes={{ input: "py-0" }}
                                                            placeholder="Landmark"
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                        />
                                                        <p className="text-red-500">
                                                            {errors.address_landmark?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Controller
                                            name="address_pincode"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            classes={{ input: "py-0" }}
                                                            placeholder="Pincode"
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                            type="number"
                                                        />
                                                        <p className="text-red-500">
                                                            {errors.address_pincode?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Controller
                                            name="address_city"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            classes={{ input: "py-0" }}
                                                            placeholder="City"
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                        />
                                                        <p className="text-red-500">
                                                            {errors.address_city?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Controller
                                            name="address_state"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <InputBase
                                                            classes={{ input: "py-0" }}
                                                            placeholder="State"
                                                            className="h-12 sm:h-[60px] xl:h-10 w-full border-b border-[#cdcdcd] !text-lg sm:!text-xl xl:!text-2xl 3xl:!text-[28px] !leading-none font-jost bg-[#f5f5f5] px-4 py-3 xl:p-6 text-black"
                                                            {...field}
                                                        />
                                                        <p className="text-red-500">
                                                            {errors.address_state?.message}
                                                        </p>
                                                    </>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 md:p-6 lg:px-11 2xl:py-10">
                                <button
                                    className="w-full bg-[#E9B159] p-2 lg:p- text-lg lg:text-2xl font-medium !leading-tight text-center text-white"
                                    type="submit"
                                >
                                    Ship to this address
                                </button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Drawer>
        </>
    );
};

export default AddressCard;
