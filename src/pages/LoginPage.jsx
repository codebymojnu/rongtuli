import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegistrationImage from "/assets/images/auth_illustration.png";
export default function LoginPage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="max-width-[1368px]">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={RegistrationImage}
              className="mb-12 max-w-full max-lg:hidden"
            />
            <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">Rongtuli</h1>
            <p className="max-w-[453px] lg:text-lg text-gray-600/95">
              আপনার ভাবনা শেয়ার করুন রঙতুলিতে!
            </p>
          </div>
          <div className="card">
            <LoginForm />
            <div className="py-4 lg:py-6">
              <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                Dont Have account?
                <Link
                  className="text-white transition-all hover:text-lwsGreen hover:underline"
                  to="/registration"
                >
                  Create New
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
