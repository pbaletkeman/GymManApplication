import { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';



function ThemeController() {
  let localTheme = localStorage.getItem("theme");

  const [selectedTheme, setSelectedTheme] = useState(localTheme);
  const [saveTheme, setSaveTheme] = useState(false);
  const [saveMsg, setSaveMsg] = useState("Save?");

  const toast = useRef(null);

  const show = () => {
    toast.current.show({ severity: 'info', summary: 'Theme', detail: 'Saving Theme Preferances' });
  };


  useEffect(() => {
    if (selectedTheme) {
      let themeLink = document.getElementById('app-theme');
      if ((themeLink)) {
        themeLink.href = '/themes/' + selectedTheme + '/theme.css';
      }
    }
  }, [selectedTheme]);

  const themeNames = [
    "arya-blue",
    "arya-green",
    "arya-orange",
    "arya-purple",
    "bootstrap4-dark-blue",
    "bootstrap4-dark-purple",
    "bootstrap4-light-blue",
    "bootstrap4-light-purple",
    "fluent-light",
    "lara-dark-amber",
    "lara-dark-blue",
    "lara-dark-cyan",
    "lara-dark-green",
    "lara-dark-indigo",
    "lara-dark-pink",
    "lara-dark-purple",
    "lara-dark-teal",
    "lara-light-amber",
    "lara-light-blue",
    "lara-light-cyan",
    "lara-light-green",
    "lara-light-indigo",
    "lara-light-pink",
    "lara-light-purple",
    "lara-light-teal",
    "luna-amber",
    "luna-blue",
    "luna-green",
    "luna-pink",
    "md-dark-deeppurple",
    "md-dark-indigo",
    "md-light-deeppurple",
    "md-light-indigo",
    "mdc-dark-deeppurple",
    "mdc-dark-indigo",
    "mdc-light-deeppurple",
    "mdc-light-indigo",
    "mira",
    "nano",
    "nova",
    "nova-accent",
    "nova-alt",
    "rhea",
    "saga-blue",
    "saga-green",
    "saga-orange",
    "saga-purple",
    "soho-dark",
    "soho-light",
    "tailwind-light",
    "vela-blue",
    "vela-green",
    "vela-orange",
    "viva-dark",
    "viva-light"
  ];

  const changeTheme = (theme) => {
    setSelectedTheme(theme);
    let themeLink = document.getElementById('app-theme');
    if (themeLink) {
      themeLink.href = '/themes/' + theme + '/theme.css';
    }
  };

  const saveThemeFunction = () => {
    setSaveTheme(true);
    setSaveMsg("Saving...");
    localStorage.setItem("theme", selectedTheme);
    show();
    setTimeout(() => {
      setSaveTheme(false);
      setSaveMsg("Save?");
    }, 5000);

  };

  return (
    <>
      <div className="flex justify-content-end align-items-start flex-wrap text-xs">
        <Toast ref={toast} />
        <div className="col-3 align-items-center">
          <FloatLabel>
            <label htmlFor="theme">Theme</label>
            <Dropdown inputId="theme" value={selectedTheme} options={themeNames} onChange={(e) => changeTheme(e.value)} placeholder="Theme" filter tooltip="Site Theme" />
          </FloatLabel>
        </div>
        <div className="col-2 align-items-center">
          <div className="flex justify-content-start align-items-center flex-wrap">
            <div>
              <Checkbox inputId="saveThemeId" value={true} checked={saveTheme} onClick={() => saveThemeFunction()} tooltip="Save Theme Selection" />
            </div>
            <div className="p-1">
              <label htmlFor="saveThemeId" >{saveMsg}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThemeController;