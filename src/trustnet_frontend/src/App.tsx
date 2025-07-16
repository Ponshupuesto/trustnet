import { useState } from 'react';
import { useInternetIdentity } from "ic-use-internet-identity";
import { useActor } from './components/ic/Actors';
import { LoginButton } from './components/LoginButton';

function App() {
  const { identity} = useInternetIdentity();
  const { actor: backend } = useActor();
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const name = nameInput.value;

    backend?.greet(name)
      .then((result) => setGreeting(result))
      .catch((error) => {
        console.error("Error calling greet:", error);
        setGreeting("Error: " + error.message);
      });
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br /><br />
      <LoginButton />
      <br /><br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      {identity && <p>Logged in as: {identity.getPrincipal.toString()}</p>}
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
