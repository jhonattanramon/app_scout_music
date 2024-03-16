import { Button } from "../../components/ui/button";

export default function Login() {
  return (
    <main className="flex min-h-screen w-full justify-center items-center">
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <h1>Login</h1>
        <a href={`${process.env.BASE_URL}/api/spotify/login`}>
          <Button>LOGIN SPOTIFY</Button>
        </a>
      </div>
    </main>
  );
}
