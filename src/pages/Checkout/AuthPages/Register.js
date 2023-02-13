import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React from 'react'
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";

const Register = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="py-16">

            <div className="w-full lg:w-4/12 flex items-center justify-center mx-auto border border-primary/30 rounded-lg p-5 md:p-10">
                <div className="w-full">

                    <form action="">
                        <div className="space-y-5">
                            <div>
                                <TextField
                                    className="w-full"
                                    id="input-with-icon-textfield"
                                    label="Email"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HiOutlineMail />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                            </div>
                            <div>
                                <FormControl sx={{ width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <button className="w-full relative inline-flex items-center text-center px-12 py-1 overflow-hidden text-lg font-medium text-black border-2 border-black hover:text-white group hover:bg-gray-50">
                                    <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

                                    <span className="relative text-center mx-auto">Register</span>
                                </button>
                            </div>
                            <h4 className="text-center">OR</h4>
                            <div className="mx-auto text-center">
                                <Link to="/login"><button className="relative inline-flex items-center text-center px-12 py-1 overflow-hidden text-lg font-medium text-black border-2 border-black hover:text-white group hover:bg-gray-50">
                                    <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

                                    <span className="relative text-center mx-auto">Login</span>
                                </button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register;