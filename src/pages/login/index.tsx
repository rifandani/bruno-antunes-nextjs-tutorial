import { useRef, useState } from 'react';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(emailRef.current?.value, passRef.current?.value);

    const resp = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passRef.current.value,
      }),
    });
    const json = await resp.json();
    setMessage(json);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email:
        <input required type="email" name="email" ref={emailRef} />
      </label>
      <br />
      <label htmlFor="email">
        Password:
        <input required type="password" name="password" ref={passRef} />
      </label>
      <br />
      <input type="submit" value="Login"></input>
      <br />
      <br />
      {JSON.stringify(message)}
    </form>
  );
}
