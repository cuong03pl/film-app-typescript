import React, { useEffect, useState } from 'react';
import AuthProvider from '../../context/AuthProvider';
import Button from '../../components/Button/Button';
import { FacebookIcon, GoogleIcon } from '../../components/Icon/Icon';
import { signInWithFacebook, signInWithGoogle } from '../../firebase/config';

interface LoginPageProps {
}

export default function LoginPage (props: LoginPageProps) {
  const [login, setLogin] = useState(true);
  useEffect(() => {
    document.title = "Đăng nhập";
  });
  return (
    <AuthProvider>
      <div className="bg-loginBgr bg-cover h-full w-full h-screen flex justify-center items-center">
        <div className="bg-white absolute w-[480px] h-[600px] m-auto rounded-3xl flex flex-col justify-center items-center">
          <h3 className="text-[40px] mb-[42px] text-[#161823] font-extrabold">
          
            {login ? "Đăng nhập" : "Đăng kí"}
          </h3>
          <Button
            onClick={signInWithFacebook}
            leftIcon={<FacebookIcon className={"h-5 w-5"} />}
            loginGoogleBtn
          >
            Tiếp tục với Facebook
          </Button>
          <Button
            onClick={signInWithGoogle}
            leftIcon={<GoogleIcon className={"h-5 w-5"} />}
            loginGoogleBtn
          >
            Tiếp tục với Google
          </Button>
        </div>
      </div>
    </AuthProvider>
  );
}
