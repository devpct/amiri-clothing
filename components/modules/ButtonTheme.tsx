export default function Theme({ darkMode }: { darkMode: boolean }) {
  const toggleTheme = () => {
    const newTheme = darkMode ? "false" : "true";
    localStorage.setItem("darkMode", newTheme);
    window.location.reload();
  };

  return (
    <div
      onClick={toggleTheme}
      className={`grid w-[3rem] h-[3rem] dark:bg-white dark:text-black bg-black text-white fixed right-5 bottom-5 cursor-pointer rounded-full z-20`}
    >
      <p className="m-auto">{darkMode? <svg width="25" height="25" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10z"></path>
  <path d="M12 1v2"></path>
  <path d="M12 21v2"></path>
  <path d="m4.22 4.22 1.42 1.42"></path>
  <path d="m18.36 18.36 1.42 1.42"></path>
  <path d="M1 12h2"></path>
  <path d="M21 12h2"></path>
  <path d="m4.22 19.78 1.42-1.42"></path>
  <path d="m18.36 5.64 1.42-1.42"></path>
</svg> : <svg width="28" height="28" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path>
</svg>}</p>
    </div>
  );
}
