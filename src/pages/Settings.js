const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <form>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />
        <br />
        <label htmlFor='phoneNumber'>Phone Number</label>
        <input type='tel' name='phoneNumber' id='phoneNumber' />
        <br />
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default Settings;
