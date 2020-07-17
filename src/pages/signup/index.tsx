import { useRef, useState } from 'react';

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(emailRef.current?.value, passRef.current?.value);

    const resp = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      }),
    });
    const json = await resp.json();
    setMessage(json);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup a new user</h1>

      <label htmlFor="name">
        Name:
        <input required type="text" name="name" ref={nameRef} />
      </label>
      <br />
      <label htmlFor="email">
        Email:
        <input required type="email" name="email" ref={emailRef} />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input required type="password" name="password" ref={passRef} />
      </label>
      <br />
      <input type="submit" value="Signup"></input>
      <br />
      <br />
      {JSON.stringify(message, null, 3)}
    </form>
  );
}
