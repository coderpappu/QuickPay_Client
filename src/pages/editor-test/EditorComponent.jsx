import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../../features/user/userSlice";

const EditorComponent = () => {
  const user = useSelector((state) => state.user?.user) || null;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  const handleSetUser = () => {
    console.log("Set User button clicked");
    dispatch(setUser({ name: "John Doe" }));
    console.log("Dispatched setUser action");
  };

  const handleClearUser = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      <h1>EditorComponent</h1>
      <div>
        <button onClick={handleSetUser}>Set User</button>
        <button onClick={handleClearUser}>Clear User</button>
      </div>
      <div>
        <h2>User:</h2>
        {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : <p>No user set</p>}
      </div>
    </div>
  );
};

export default EditorComponent;
