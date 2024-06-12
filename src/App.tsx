import "./App.css";
import { CreateUser } from "./components/CreateUser";
import ListOfUsers from "./components/ListOfUsers";
import {Toaster} from 'sonner'

function App() {
  return (
    <>
      <ListOfUsers />
      <CreateUser />
      <Toaster richColors/>
    </>
  );
}

export default App;
