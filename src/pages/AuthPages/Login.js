import { FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, OutlinedInput, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from "../../firebaseInit";

const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user?.email) {
            navigate("/", { replace: true })
        }
    }, [navigate, user?.email])


    const [
        signInWithEmailAndPassword,
        loginUser,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    return (
        <div className="py-16">

            <div className="w-full lg:w-4/12 flex items-center justify-center mx-auto border border-primary/30 rounded-lg p-5 md:p-10">
                <div className="w-full">
                    {loading && <LinearProgress className="mb-5" />}


                    <form onSubmit={handleLogin}>
                        <div className="space-y-5">
                            <div>
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
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
                                        onChange={(e) => setPassword(e.target.value)}
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
                                {error && <p className="text-red-600">{error.message}</p>}
                            </div>
                            <div>
                                <button type="submit" className="w-full relative inline-flex items-center text-center px-12 py-1 overflow-hidden text-lg font-medium text-black border-2 border-black hover:text-white group hover:bg-gray-50">
                                    <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

                                    <span className="relative text-center mx-auto">Login</span>
                                </button>
                            </div>
                            <h4 className="text-center">OR</h4>
                            <div className="mx-auto text-center">
                                <Link to="/register"><button className="relative inline-flex items-center text-center px-12 py-1 overflow-hidden text-lg font-medium text-black border-2 border-black hover:text-white group hover:bg-gray-50">
                                    <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

                                    <span className="relative text-center mx-auto">Register</span>
                                </button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login;