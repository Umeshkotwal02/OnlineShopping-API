import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { Box, Drawer, InputBase } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import { STORAGE } from "../../config/config";
import { Button, Col, Container, Row } from "react-bootstrap";
import { API_URL } from "../../constants/constApi";

const AddressCard = ({ info, fetchAddresses, onSelectAddress }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [showAddresscanvas, setShowAddresscanvas] = useState(false); // Address Offcanvas
    const [isOpen, setIsOpen] = useState(false);

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

    // Save Address API
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
            const response = await axios.post(`${API_URL}saveaddress`, payload);

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

    // delete address API
    const deleteAddress = async (addressId) => {
        const userProfile = JSON.parse(localStorage.getItem(STORAGE.USERDETAIL));
        try {
            const { data } = await axios.post(`${API_URL}deleteaddress`, {
                device_id: localStorage.getItem(STORAGE.DEVICEID),
                address_id: addressId,
                user_id: userProfile.id,
            });

            if (data && data.STATUS === 200) {
                fetchAddresses();
                toast.success("Address deleted successfully.");
            } else if (data && data.STATUS === 400) {
                toast.error("Failed to delete address. Please try again.");
                // console.log("errrrr:::", data);
            }
        } catch (err) {
            // console.error("Error deleting address:", err);
            toast.error("Failed to delete address. Please try again.");
        }
    };

    //Address
    const handleShowAddresscanvas = () => {
        setIsOpen(false);
        setShowAddresscanvas(true);
    };
    const handleCloseAddresscanvas = () => {
        setShowAddresscanvas(false);
    };

    return (
        <>
            <div className="col-md-6 mb-4 card border p-3 web-bg-color" style={{ borderRadius: "10px" }}>
                <div className="d-flex align-items-center mb-3">
                    <h4 className="mb-0">{info.address_name}</h4>
                    {Boolean(info?.address_is_default) && (
                        <span className="badge ms-4 bg-white py-2 px-3 default-Add-btn1" style={{ borderRadius: "50px" }} >DEFAULT</span>
                    )}
                </div>
                <p className="text-muted">{info.address_address}</p>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-light border-rad-fivepx"
                        onClick={() => editAddress(info)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-light border-rad-fivepx"
                        onClick={() => deleteAddress(info.address_id)}
                    >
                        Delete
                    </button>
                    <Button
                        variant="dark"
                        onClick={() => onSelectAddress(info)}
                        className="border-rad-fivepx d-flex align-items-center text-white"
                    >
                        Deliver Here <FaArrowRightLong className="ms-2" />
                    </Button>
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
