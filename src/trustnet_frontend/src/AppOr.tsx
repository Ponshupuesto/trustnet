/* import { useState } from 'react';
import { useInternetIdentity } from "ic-use-internet-identity";
import { useActor } from './components/ic/Actors';
import { LoginButton } from './components/LoginButton';

function App() {
  const { identity } = useInternetIdentity();
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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-6">
        <img src="/logo2.svg" alt="DFINITY logo" className="h-20 mx-auto" />
        
        <LoginButton />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Enter your name:
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2"
              placeholder="Your name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Click Me!
          </button>
        </form>

        {identity && (
          <p className="text-sm text-gray-600">
            Logged in as: <span className="font-mono">{identity.getPrincipal.toString()}</span>
          </p>
        )}

        <section
          id="greeting"
          className="text-lg text-gray-800 font-semibold"
        >
          {greeting}
        </section>
      </div>
    </main>
  );
}

export default App;
 */