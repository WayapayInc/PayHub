"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import lottie from "lottie-web";

import state from "@/app/store";
import { CustomButton } from "@/app/components";
import { AuthFormHeader } from "../../components";
import { slideAnimation } from "@/app/config/motion";
import { sleep, emailRegex, strongPasswordRegex } from "@/app/utils";

const AuthSignIn = ({ handleClick }) => {
  const router = useRouter();

  const [isAuthenticating, setIsAuthenticating] = useState(false); // SETS THE LOADING STATE
  const [successfullAuth, setSuccessfullAuth] = useState(false);  // SETS THE STATE OF SUCCESS ONCE COMPLETED AND UPDATES THE RENDERED COMPONENT
  const [validationError, setValidationError] = useState(""); // SETS THE ERROR MESSAGE 
  const [infoMessage, setInfoMessage] = useState(""); // SETS THE INFO MESSAGE (FROM SERVER / CLIENT)

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({});

  useEffect(() => {
    updateValidationError(errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const updateValidationError = (errors) => {
    setValidationError("");
    if (Object.keys(errors).length !== 0) {
      const firstError = Object.values(errors)[0];
      setValidationError(firstError.message);
      return firstError.message;
    }
  };

  useEffect(() => {
    let animeCheckbox;
    if (animeChecboxContainer.current) {
      animeCheckbox = lottie.loadAnimation({
        container: animeChecboxContainer.current,
        render: "svg",
        loop: false,
        autoplay: true,
        path: "/animations/checkbox.json",
      });
    }

    if (successfullAuth) updateAndRedirect();

    return () => {
      if (animeCheckbox) animeCheckbox.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successfullAuth]);

  const updateAndRedirect = () => {
    const countdown = 1;
    const updateMessage = async () => {
      for (let i = countdown; i > 0; i--) {
        setInfoMessage(`Please wait, redirecting in 0:0${i} sec`);
        await sleep(100); // Sleep for 1 second
      }

      // Redirect user to dashboard
      router.push("/dashboard");
    };
    updateMessage();
  };

  const onSubmit = async (formData) => {
    if (!isValid) return await updateValidationError(errors);
    setIsAuthenticating(true);

    try {
      const uri = `/api/auth/login`;
      const res = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.status === 200) {
        const { user, message } = await res.json();

        state.user = user; // UPDATE LOCAL STATE

        setInfoMessage(message || "Successfully verified."); // SET THE MESSAGE
        setSuccessfullAuth(true); // UPDATE SUCCESS STATE - SWITCHES TO THE SUCCESS COMPONENT
        setIsAuthenticating(false); // STOP LOADER BY UPDATING isAuthenticating
      } else {
        const { error } = await res.json();
        throw Error(
          `${error.code}: ${error.message || "Internal server error."}`
        );
      }
      setIsAuthenticating(false);
    } catch (error) {
      console.error(error);
      setIsAuthenticating(false);
      setValidationError(error.message);
    }
  };
  return (
    <motion.form
      onSubmit={(e) => e.preventDefault()}
      {...slideAnimation("left")}
      className='flex flex-col h-full max-w-md mt-20 mx-auto text-center '
    >
      {!successfullAuth ? (
        <>
          {/* THIS IS THE INITIAL COMPONENT -  BEFORE SUCCESS  */}

          <CustomButton
            type='submit'
            format='primary'
            title={isAuthenticating ? "Please wait..." : "Continue"}
            disabled={isAuthenticating}
            handleClick={handleSubmit(onSubmit)}
            customStyles=''
          />

        
        </>
      ) : (
        <>
            {/* THIS IS THE SUCCESS COMPONENT  */}
          <p className='text-slate-500 text-sm mt-10'>{infoMessage}</p>
        </>
      )}
    </motion.form>
  );
};

export default AuthSignIn;
